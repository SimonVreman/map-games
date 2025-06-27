import { Layer } from "react-map-gl/maplibre";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import * as maplibregl from "maplibre-gl";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

const modelOrigin = maplibregl.MercatorCoordinate.fromLngLat([10, 40]);

const modelTransform = {
  translateX: modelOrigin.x,
  translateY: modelOrigin.y,
  translateZ: modelOrigin.z,
  scale: modelOrigin.meterInMercatorCoordinateUnits(),
};

const testSvg = `<svg width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="white"/>
<path d="M221 79H99L179 200L99 321H221L301 200L221 79Z" fill="black"/>
</svg>
`;

type PatternCtx = {
  map: maplibregl.Map | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.Camera | null;
  scene: THREE.Scene | null;
};

function dispose(ctx: PatternCtx) {
  // TODO dispose resources properly!!
  if (ctx.renderer) ctx.renderer.dispose();
  if (ctx.scene) ctx.scene.clear();
  if (ctx.camera) ctx.camera.clear();
}

export function PatternLayer() {
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

      const loader = new SVGLoader();
      const { paths } = loader.parse(testSvg);
      const group = new THREE.Group();

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        const material = new THREE.MeshBasicMaterial({
          color: path.color,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const shapes = SVGLoader.createShapes(path);

        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j];
          const geometry = new THREE.ShapeGeometry(shape);
          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
        }
      }

      // const geometry = new THREE.PlaneGeometry(1e6, 1e6);
      // const material = new THREE.MeshBasicMaterial({ color: 0xaa5555 });
      // const cube = new THREE.Mesh(geometry, material);

      scene.add(group);
    },
    []
  );

  const render = useCallback<maplibregl.CustomRenderMethod>((_, args) => {
    const { camera, scene, renderer, map } = ctx.current;
    if (!camera || !scene || !renderer || !map) return;

    const m = new THREE.Matrix4().fromArray(
      args.defaultProjectionData.mainMatrix
    );

    const l = new THREE.Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
      )
      .scale(
        new THREE.Vector3(
          modelTransform.scale * 1e3,
          modelTransform.scale * 1e3,
          modelTransform.scale * 1e3
        )
      );

    camera.projectionMatrix = m.multiply(l);
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
