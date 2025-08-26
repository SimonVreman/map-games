import { Layer } from "react-map-gl/maplibre";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import clipping from "polygon-clipping";
import { Pattern, PatternEntry } from "@/types/registry";
import { useAppStore } from "@/lib/store/provider";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { AppStore } from "@/lib/store";
import { MercatorCoordinate } from "maplibre-gl";

type PatternCtx = {
  map: maplibregl.Map | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.Camera | null;
  scene: THREE.Scene | null;
  meshes: Record<string, THREE.Mesh[]>;
};

function mapGeometry(geometry: GeoJSON.Geometry) {
  if (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon")
    return [];

  const polygons =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

  return polygons.map((p) => [
    p[0].map((v) => {
      const mapped = MercatorCoordinate.fromLngLat(v as [number, number]);
      return [mapped.x, mapped.y] as [number, number];
    }),
  ]) as clipping.MultiPolygon;
}

function parsePatterns<TMap extends Record<string, Pattern>>({
  patterns,
  size,
}: {
  patterns: TMap;
  size: { width: number; height: number };
}) {
  const parsed = {} as Record<
    keyof TMap,
    { shapes: THREE.Shape[]; material: THREE.Material }[]
  >;
  const loader = new SVGLoader();

  for (const pattern in patterns) {
    const { background, svg } = patterns[pattern];
    if (!svg) continue;
    const { paths } = loader.parse(svg);

    parsed[pattern] = [];

    if (background)
      parsed[pattern].push({
        shapes: [
          new THREE.Shape([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(size.width, 0),
            new THREE.Vector2(size.width, size.height),
            new THREE.Vector2(0, size.height),
          ]),
        ],
        material: new THREE.MeshBasicMaterial({
          color: background.light,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      });

    for (const path of paths)
      parsed[pattern].push({
        shapes: SVGLoader.createShapes(path),
        material: new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      });
  }

  return parsed;
}

function disposeMaterial(material: THREE.Material) {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key as keyof THREE.Material];
    if (value && typeof value === "object" && "minFilter" in value)
      value.dispose();
  }
}

function dispose(ctx: PatternCtx) {
  ctx.renderer?.dispose();

  ctx.scene?.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.geometry.dispose();

    if (Array.isArray(mesh.material))
      for (const m of mesh.material) disposeMaterial(m);
    else disposeMaterial(mesh.material);
  });
}

export function PatternLayer<
  TName extends QuizSliceName<AppStore>,
  TMap extends Record<string, Pattern>,
  TEntry extends PatternEntry<TMap>
>({
  store,
  patterns,
  size,
  entries,
  targets,
}: {
  store: TName;
  patterns: TMap;
  size: { width: number; height: number };
  entries: TEntry[];
  targets: GeoJSON.FeatureCollection;
}) {
  const ctx = useRef<PatternCtx>({
    map: null,
    renderer: null,
    camera: null,
    scene: null,
    meshes: {},
  });

  const [highlight, hints] = useAppStore((s) => [
    s[store].highlight,
    s[store].hintsEnabled,
  ]);

  const onAdd = useCallback(
    (
      map: maplibregl.Map,
      gl: WebGLRenderingContext | WebGL2RenderingContext
    ) => {
      if (!map) return;

      const camera = new THREE.Camera();
      const scene = new THREE.Scene();
      const meshes: Record<string, THREE.Mesh[]> = {};
      const renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      renderer.autoClear = false;
      dispose(ctx.current);
      ctx.current = { map, camera, scene, renderer, meshes };

      const parsedPatterns = parsePatterns({ patterns, size });
      const countries = targets.features;

      for (const { name, subjects, transform } of entries) {
        const started = performance.now();
        const country = countries.find((c) => c.properties?.name === name);
        if (!country) continue;

        const group = new THREE.Group();
        const topLeft = MercatorCoordinate.fromLngLat([
          country.bbox![0],
          country.bbox![3],
        ]);
        const bottomRight = MercatorCoordinate.fromLngLat([
          country.bbox![2],
          country.bbox![1],
        ]);

        const mapGeometryStarted = performance.now();

        const mappedCountry = mapGeometry(country.geometry);

        console.log(
          `Mapped ${name} (${performance.now() - mapGeometryStarted}ms)`
        );

        const scale = ((bottomRight.x - topLeft.x) / size.width) * transform[0];

        const subjectPolygons = subjects.map((s) =>
          parsedPatterns[s].map((p) => ({
            polygons: p.shapes.map(
              (s) =>
                [
                  s
                    .getPoints()
                    .map((v) => [
                      v.x * scale + topLeft.x,
                      v.y * scale + topLeft.y,
                    ]),
                  ...s.holes.map((p) =>
                    p
                      .getPoints()
                      .map((v) => [
                        v.x * scale + topLeft.x,
                        v.y * scale + topLeft.y,
                      ])
                  ),
                ] as clipping.Polygon
            ),
            material: p.material,
          }))
        );

        const patternizeStarted = performance.now();

        const multiPolygons = {} as Record<keyof TMap, clipping.MultiPolygon[]>;
        const offsetX = size.width * scale;
        const offsetY = size.height * scale;
        const maxX = bottomRight.x - topLeft.x;
        const maxY = bottomRight.y - topLeft.y;

        let i = 0;

        for (let y = transform[5] * offsetY; y < maxY; y += offsetY) {
          const subject = subjects[i];
          const polygons = subjectPolygons[i];
          multiPolygons[subject] ??= [];

          for (let x = transform[4] * offsetX; x < maxX; x += offsetX)
            for (let polyIndex = 0; polyIndex < polygons.length; polyIndex++) {
              multiPolygons[subject][polyIndex] ??= [];
              multiPolygons[subject][polyIndex].push(
                ...polygons[polyIndex].polygons.map(
                  (p) =>
                    p.map((r) =>
                      r.map((c) => [c[0] + x, c[1] + y])
                    ) as clipping.Polygon
                )
              );
            }

          i = (i + 1) % subjects.length;
        }

        console.log(
          `Patternized ${name} (${performance.now() - patternizeStarted}ms)`
        );

        const clippedStarted = performance.now();
        for (const subject in multiPolygons) {
          for (let i = 0; i < multiPolygons[subject].length; i++) {
            const polygons = multiPolygons[subject][i];
            const clipped = clipping.intersection(mappedCountry, polygons);
            if (clipped.length === 0) continue;

            const mesh = new THREE.Mesh(
              new THREE.ShapeGeometry(
                clipped.map((s) => {
                  const [exterior, ...holes] = s;

                  const shape = new THREE.Shape(
                    exterior.map((v) => new THREE.Vector2(...v))
                  );

                  for (const hole of holes) {
                    shape.holes.push(
                      new THREE.Path(hole.map((v) => new THREE.Vector2(...v)))
                    );
                  }

                  return shape;
                })
              ),
              parsedPatterns[subject][i].material
            );

            group.add(mesh);
            mesh.visible = false;
            meshes[name] ??= [];
            meshes[name].push(mesh);
          }
        }
        console.log(
          `Clipped ${name} (${performance.now() - clippedStarted}ms)`
        );

        console.log(
          `Added pattern for ${name} (${performance.now() - started}ms)`
        );

        scene.add(group);
      }
    },
    [entries, patterns, size, targets.features]
  );

  const render = useCallback<maplibregl.CustomRenderMethod>((_, args) => {
    const { camera, scene, renderer, map } = ctx.current;
    if (!camera || !scene || !renderer || !map) return;

    const m = new THREE.Matrix4().fromArray(
      args.defaultProjectionData.mainMatrix
    );

    camera.projectionMatrix = m;
    renderer.resetState();
    renderer.render(scene, camera);
    map.triggerRepaint();
  }, []);

  const updateVisibility = useCallback(() => {
    for (const key in ctx.current.meshes) {
      const isHighlighted =
        hints ||
        highlight.negative.includes(key) ||
        highlight.positive.includes(key);
      for (const mesh of ctx.current.meshes[key]) mesh.visible = isHighlighted;
    }
  }, [hints, highlight]);

  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  useEffect(() => {
    const load = ctx.current.map?.on("load", () => updateVisibility());
    return () => load?.unsubscribe();
  }, [ctx.current.map, updateVisibility]);

  useEffect(() => () => dispose(ctx.current), []);

  return (
    <Layer
      id="pattern"
      type="custom"
      renderingMode="2d"
      onAdd={onAdd}
      render={render}
    />
  );
}
