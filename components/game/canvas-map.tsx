import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { usPaths } from "@/lib/mapping/us/paths/country";

type Style = {
  x: number;
  y: number;
  scale: number;
};

type Bounds = {
  north: number;
  south: number;
  west: number;
  east: number;
  padding?: number;
};

type MapProps = {
  bounds: Bounds;
};

const defaultBounds = {
  north: mercatorConstants.reach,
  south: -mercatorConstants.reach,
  west: -180,
  east: 180,
};

const defaultStyle = {
  x: 0,
  y: 0,
  scale: 0,
};

const maximumScale = 20;

function calculateViewBox({ north, south, west, east, padding = 0 }: Bounds) {
  const northWest = projectMercator({
    lat: north + padding,
    lng: west - padding,
  });

  const southEast = projectMercator({
    lat: south - padding,
    lng: east + padding,
  });

  return {
    x: Math.round(northWest.x * 100) / 100,
    y: Math.round(northWest.y * 100) / 100,
    width: Math.round(Math.abs(southEast.x - northWest.x) * 100) / 100,
    height: Math.round(Math.abs(northWest.y - southEast.y) * 100) / 100,
  };
}

function styleForBounds({
  bounds,
  client,
}: {
  bounds: Bounds;
  client: DOMRect;
}): Style {
  const viewBox = calculateViewBox(bounds);

  const scale = Math.min(
    mercatorConstants.domain / viewBox.width,
    mercatorConstants.domain / viewBox.height
  );

  const projectedSize = Math.min(client.width, client.height) * scale;

  const x = -(viewBox.x / mercatorConstants.domain) * projectedSize;
  const y = -(viewBox.y / mercatorConstants.domain) * projectedSize;

  return { x, y, scale };
}

// TODO: scale doesnt need clamping, done by the gesture handler. Just need x,y, clamping
function clampStyle({
  bounds,
  client,
  style,
}: {
  bounds: Bounds;
  client: DOMRect;
  style: Style;
}): Style {
  const defaultStyle = styleForBounds({ bounds, client });
  const scale = Math.max(defaultStyle.scale, style.scale);
  const viewBox = calculateViewBox(bounds);

  // The size of the domain in px at scale
  const projectedSize = Math.min(client.width, client.height) * scale;
  const projectedWidth =
    (viewBox.width / mercatorConstants.domain) * projectedSize;
  const projectedHeight =
    (viewBox.height / mercatorConstants.domain) * projectedSize;

  const minX =
    client.width -
    ((viewBox.x + viewBox.width) / mercatorConstants.domain) * projectedSize;
  const maxX = -(viewBox.x / mercatorConstants.domain) * projectedSize;
  const minY =
    client.height -
    ((viewBox.y + viewBox.width) / mercatorConstants.domain) * projectedSize;
  const maxY = -(viewBox.y / mercatorConstants.domain) * projectedSize;

  // console.log(minX, style.x, maxX);

  const x = Math.min(maxX, Math.max(style.x, minX));
  const y = Math.min(maxY, Math.max(style.y, minY));
  // const x = style.x;
  // const y = style.y;

  return { x, y, scale };
}

const useGesture = createUseGesture([dragAction, pinchAction]);

export function CanvasMap({
  bounds = defaultBounds,
  attribution,
}: {
  attribution?: React.ReactNode;
} & Partial<MapProps>) {
  return (
    <div className="size-full relative overflow-hidden bg-neutral-50 dark:bg-neutral-700">
      <Canvas bounds={bounds} />

      {attribution && (
        <div className="bg-neutral-50 dark:bg-neutral-700 absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
          {attribution}
        </div>
      )}
    </div>
  );
}

const twColor = (name: string) =>
  getComputedStyle(document.body).getPropertyValue("--color-" + name);

function renderMap({
  canvas: canvasRef,
  style: styleRef,
}: {
  canvas: RefObject<HTMLCanvasElement | null>;
  style: RefObject<Style>;
}) {
  const parent = canvasRef.current?.parentElement;
  const ctx = canvasRef.current?.getContext("2d", { alpha: false });
  const style = styleRef.current;

  if (!parent || !ctx) return;

  // Prepare the canvas
  const bounding = parent.getBoundingClientRect();
  prepareMap({ bounding, ctx, style });

  // Some test drawing
  ctx.strokeStyle = "black";
  ctx.miterLimit = 2;

  for (const path of usPaths) ctx.stroke(new Path2D(path));
}

function prepareMap({
  bounding,
  ctx,
  style,
}: {
  bounding: DOMRect;
  ctx: CanvasRenderingContext2D;
  style: Style;
}) {
  const width = Math.ceil(bounding.width);
  const height = Math.ceil(bounding.height);
  const dpr = window.devicePixelRatio;

  // Fit to projection
  const xProjectionRatio = bounding.width / mercatorConstants.domain;
  const yProjectionRatio = bounding.height / mercatorConstants.domain;
  const projectionRatio = Math.min(xProjectionRatio, yProjectionRatio);

  const xCentering =
    ((width - mercatorConstants.domain * projectionRatio) * dpr) / 2;
  const yCentering =
    ((height - mercatorConstants.domain * projectionRatio) * dpr) / 2;

  const xOffset = style.x * dpr;
  const yOffset = style.y * dpr;

  const scale = style.scale * dpr * projectionRatio;

  ctx.canvas.width = width * dpr;
  ctx.canvas.height = height * dpr;

  // Set a background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width * dpr, height * dpr);

  // Reset then apply transformations
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.translate(xOffset + xCentering, yOffset + yCentering);
  ctx.scale(scale, scale);

  ctx.fillStyle = twColor("neutral-50");
  ctx.fillRect(0, 0, 1000, 1000);

  ctx.canvas.style.width = `${width}px`;
  ctx.canvas.style.height = `${height}px`;
}

function Canvas({ bounds }: MapProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const style = useRef({ x: 0, y: 0, scale: 1 });

  const updateStyle = useCallback(
    (newStyle: Partial<Style>) => {
      const client = canvas.current?.parentElement?.getBoundingClientRect();
      if (!client) return;

      style.current = clampStyle({
        bounds,
        client,
        style: { ...style.current, ...newStyle },
      });

      renderMap({ canvas, style });
    },
    [bounds]
  );

  const minimumScale = useMemo(() => {
    const viewBox = calculateViewBox(bounds);

    return Math.min(
      mercatorConstants.domain / viewBox.width,
      mercatorConstants.domain / viewBox.height
    );
  }, [bounds]);

  useEffect(() => {
    const gesture = (e: Event) => e.preventDefault();

    // Add event listeners
    document.addEventListener("gesturestart", gesture);
    document.addEventListener("gesturechange", gesture);
    document.addEventListener("gestureend", gesture);

    // Clean up event listeners
    return () => {
      document.removeEventListener("gesturestart", gesture);
      document.removeEventListener("gesturechange", gesture);
      document.removeEventListener("gestureend", gesture);
    };
  }, []);

  useEffect(() => {
    const parent = canvas.current?.parentElement;
    if (parent) updateStyle(defaultStyle);

    const resize = () => updateStyle(style.current);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [updateStyle]);

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();
        updateStyle({ x, y });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s],
        memo,
      }) => {
        const bounding = canvas.current!.getBoundingClientRect();
        if (first) {
          const tx = ox - Math.max(bounding.width - bounding.height, 0) / 2;
          const ty = oy - Math.max(bounding.height - bounding.width, 0) / 2;
          memo = [style.current.x, style.current.y, tx, ty];
        }

        const x = ms * memo[0] - (ms - 1) * memo[2];
        const y = ms * memo[1] - (ms - 1) * memo[3];

        updateStyle({ x, y, scale: s });

        return memo;
      },
    },
    {
      target: canvas,
      drag: {
        filterTaps: true,
        from: () => [style.current.x, style.current.y],
      },
      pinch: {
        scaleBounds: { min: minimumScale, max: maximumScale },
        from: () => [style.current.scale, 0],
      },
    }
  );

  return (
    <canvas ref={canvas} className="absolute top-0 left-0 touch-none">
      This is an interactive map that uses a canvas. Please use a browser that
      supports canvas.
    </canvas>
  );
}
