import { Layer } from "react-map-gl/maplibre";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import * as maplibregl from "maplibre-gl";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import clipping from "polygon-clipping";
import { Pattern, PatternEntry } from "@/types/registry";

type PatternCtx = {
  map: maplibregl.Map | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.Camera | null;
  scene: THREE.Scene | null;
};

function mapGeometry(geometry: GeoJSON.Geometry) {
  if (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon")
    return [];

  const polygons =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

  return polygons.map((p) => [
    p[0].map((v) => {
      const mapped = maplibregl.MercatorCoordinate.fromLngLat(
        v as [number, number]
      );
      return [mapped.x, mapped.y] as [number, number];
    }),
  ]) as clipping.MultiPolygon;
}

function parsePatterns<TMap extends Record<string, Pattern>>(patterns: TMap) {
  const parsed = {} as Record<
    keyof TMap,
    { shapes: THREE.Shape[]; material: THREE.Material }[]
  >;
  const loader = new SVGLoader();

  for (const pattern in patterns) {
    if (!patterns[pattern].svg) continue;
    const { paths } = loader.parse(patterns[pattern].svg);

    parsed[pattern] = [];

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

function dispose(ctx: PatternCtx) {
  // TODO dispose resources properly!!
  if (ctx.renderer) ctx.renderer.dispose();
  if (ctx.scene) ctx.scene.clear();
  if (ctx.camera) ctx.camera.clear();
}

export function PatternLayer<
  TMap extends Record<string, Pattern>,
  TEntry extends PatternEntry<TMap>
>({
  patterns,
  size,
  entries,
  targets,
}: {
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
  });

  const onAdd = useCallback(
    (
      map: maplibregl.Map,
      gl: WebGLRenderingContext | WebGL2RenderingContext
    ) => {
      if (!map) return;

      const camera = new THREE.Camera();
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      renderer.autoClear = false;
      dispose(ctx.current);
      ctx.current = { map, camera, scene, renderer };

      const parsedPatterns = parsePatterns(patterns);
      const countries = targets.features;

      for (const { name, subjects, transform } of entries) {
        const country = countries.find((c) => c.properties?.name === name);
        if (!country) continue;

        const group = new THREE.Group();
        const topLeft = maplibregl.MercatorCoordinate.fromLngLat([
          country.bbox![0],
          country.bbox![3],
        ]);
        const bottomRight = maplibregl.MercatorCoordinate.fromLngLat([
          country.bbox![2],
          country.bbox![1],
        ]);
        const mappedCountry = mapGeometry(country.geometry);
        const patternScale =
          ((bottomRight.x - topLeft.x) / size.width) * transform[0];

        const subjectPolygons = subjects.map((s) =>
          parsedPatterns[s].map((p) => ({
            polygons: p.shapes.map(
              (s) =>
                [
                  s
                    .getPoints()
                    .map((v) => [
                      v.x * patternScale + topLeft.x,
                      v.y * patternScale + topLeft.y,
                    ]),
                ] as clipping.Polygon
            ),
            material: p.material,
          }))
        );

        const multiPolygons = {} as Record<keyof TMap, clipping.MultiPolygon[]>;
        const offsetX = size.width * patternScale;
        const offsetY = size.height * patternScale;
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

        for (const subject in multiPolygons) {
          for (let i = 0; i < multiPolygons[subject].length; i++) {
            const polygons = multiPolygons[subject][i];
            const intersected = clipping.intersection(mappedCountry, polygons);
            if (intersected.length === 0) continue;

            const mesh = new THREE.Mesh(
              new THREE.ShapeGeometry(
                intersected.map(
                  (s) =>
                    new THREE.Shape(s[0].map((v) => new THREE.Vector2(...v)))
                )
              ),
              parsedPatterns[subject][i].material
            );
            group.add(mesh);
          }
        }

        scene.add(group);
      }
    },
    []
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
