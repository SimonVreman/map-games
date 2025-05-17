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

type ViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
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

const maximumScale = 20;

function calculateViewBox({
  north,
  south,
  west,
  east,
  padding = 0,
}: Bounds): ViewBox {
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

function clampStyle({
  viewBox: rawViewBox,
  aspectRatio,
  style: { x, y, scale },
}: {
  viewBox: ViewBox;
  aspectRatio: number;
  style: Style;
}): Style {
  const rawAspectRatio = rawViewBox.width / rawViewBox.height;

  const scaleX =
    rawAspectRatio < aspectRatio ? aspectRatio / rawAspectRatio : 1;
  const scaleY =
    rawAspectRatio > aspectRatio ? rawAspectRatio / aspectRatio : 1;

  const viewBoxWidth = rawViewBox.width * scaleX;
  const viewBoxHeight = rawViewBox.height * scaleY;

  const viewBox: ViewBox = {
    x: rawViewBox.x - (viewBoxWidth - rawViewBox.width) / 2,
    y: rawViewBox.y - (viewBoxHeight - rawViewBox.height) / 2,
    width: viewBoxWidth,
    height: viewBoxHeight,
  };

  const minimumScale = calculateMinimumScale({
    aspectRatio,
    viewBox: rawViewBox,
  });

  const viewFactor = minimumScale / scale;

  const clampedX = Math.max(
    viewBox.x,
    Math.min(viewBox.x + (1 - viewFactor) * viewBox.width, x)
  );

  const clampedY = Math.max(
    viewBox.y,
    Math.min(viewBox.y + (1 - viewFactor) * viewBox.height, y)
  );

  const clampedScale = Math.max(minimumScale, Math.min(maximumScale, scale));

  return { scale: clampedScale, x: clampedX, y: clampedY };
}

function mapToClient({
  bounding,
  style: { x, y, scale },
  viewBox,
}: {
  bounding: DOMRect;
  style: Style;
  viewBox: ViewBox;
}): Style {
  const pxPerUnit =
    ((bounding.width / bounding.height > viewBox.width / viewBox.height
      ? bounding.height
      : bounding.width) *
      scale) /
    mercatorConstants.domain;

  return { x: -x * pxPerUnit, y: -y * pxPerUnit, scale };
}

function clientToMap({
  bounding,
  style: { x, y, scale },
  viewBox,
}: {
  bounding: DOMRect;
  style: Style;
  viewBox: ViewBox;
}): Style {
  const unitsPerPx =
    mercatorConstants.domain /
    ((bounding.width / bounding.height > viewBox.width / viewBox.height
      ? bounding.height
      : bounding.width) *
      scale);

  return { x: -x * unitsPerPx, y: -y * unitsPerPx, scale };
}

const calculateMinimumScale = ({
  aspectRatio,
  viewBox,
}: {
  aspectRatio: number;
  viewBox: ViewBox;
}) =>
  mercatorConstants.domain /
  (aspectRatio > viewBox.width / viewBox.height
    ? viewBox.height
    : viewBox.width);

const twColor = (name: string) =>
  getComputedStyle(document.body).getPropertyValue("--color-" + name);

function renderMap({
  canvas: canvasRef,
  viewBox,
  style: styleRef,
}: {
  canvas: RefObject<HTMLCanvasElement | null>;
  viewBox: ViewBox;
  style: RefObject<Style>;
}) {
  const parent = canvasRef.current?.parentElement;
  const ctx = canvasRef.current?.getContext("2d", { alpha: false });
  const style = styleRef.current;

  if (!parent || !ctx) return;

  // Prepare the canvas
  const bounding = parent.getBoundingClientRect();
  prepareMap({ bounding, ctx, viewBox, style });

  // Some test drawing
  ctx.strokeStyle = "black";
  ctx.miterLimit = 2;

  for (const path of usPaths) ctx.stroke(new Path2D(path));
}

function prepareMap({
  bounding,
  ctx,
  viewBox,
  style: unscaledStyle,
}: {
  bounding: DOMRect;
  ctx: CanvasRenderingContext2D;
  viewBox: ViewBox;
  style: Style;
}) {
  const width = Math.ceil(bounding.width);
  const height = Math.ceil(bounding.height);
  const dpr = window.devicePixelRatio;
  const style = mapToClient({ bounding, style: unscaledStyle, viewBox });

  // Fit to projection
  const clientAspect = bounding.width / bounding.height;
  const viewAspect = viewBox.width / viewBox.height;
  const projectionRatio =
    (clientAspect > viewAspect ? bounding.height : bounding.width) /
    mercatorConstants.domain;

  const scale = style.scale * dpr * projectionRatio;

  ctx.canvas.width = width * dpr;
  ctx.canvas.height = height * dpr;

  // Set a background
  ctx.fillStyle = twColor("neutral-50");
  ctx.fillRect(0, 0, width * dpr, height * dpr);

  // Reset then apply transformations
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(style.x * dpr, style.y * dpr);
  ctx.scale(scale, scale);

  ctx.canvas.style.width = `${width}px`;
  ctx.canvas.style.height = `${height}px`;
}

const useGesture = createUseGesture([dragAction, pinchAction]);

export function CanvasMap({
  bounds = defaultBounds,
  attribution,
}: {
  attribution?: React.ReactNode;
} & Partial<MapProps>) {
  return (
    <div className="relative size-full overflow-hidden bg-neutral-50 dark:bg-neutral-700">
      <Canvas bounds={bounds} />

      {attribution && (
        <div className="bg-neutral-50 dark:bg-neutral-700 absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
          {attribution}
        </div>
      )}
    </div>
  );
}

function Canvas({ bounds }: MapProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const style = useRef({ x: 0, y: 0, scale: 1 });
  const viewBox = useMemo(() => calculateViewBox(bounds), [bounds]);

  const updateStyle = useCallback(
    (newStyle: Partial<Style>) => {
      const client = canvas.current?.parentElement?.getBoundingClientRect();
      if (!client) return;

      style.current = clampStyle({
        viewBox,
        aspectRatio: client.width / client.height,
        style: clientToMap({
          bounding: client,
          viewBox,
          style: { ...style.current, ...newStyle },
        }),
      });

      renderMap({ canvas, viewBox, style });
    },
    [viewBox]
  );

  useEffect(() => {
    const gesture = (e: Event) => e.preventDefault();
    const resize = () => updateStyle(style.current);

    // Add event listeners
    window.addEventListener("resize", resize);
    document.addEventListener("gesturestart", gesture);
    document.addEventListener("gesturechange", gesture);
    document.addEventListener("gestureend", gesture);

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("gesturestart", gesture);
      document.removeEventListener("gesturechange", gesture);
      document.removeEventListener("gestureend", gesture);
    };
  }, [updateStyle]);

  useEffect(() => {
    updateStyle(style.current);
  }, [updateStyle]);

  useGesture(
    {
      onDrag: ({ pinching, first, last, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();
        if (first) canvas.current!.style.cursor = "move";
        if (last) canvas.current!.style.cursor = "auto";

        updateStyle({ x, y });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s],
        memo,
      }) => {
        if (first) {
          const bounding = canvas.current!.getBoundingClientRect();
          const current = mapToClient({
            bounding,
            style: style.current,
            viewBox,
          });
          memo = [current.x, current.y, ox, oy];
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
        // TODO bounds some time
        from: () => {
          const { x, y } = mapToClient({
            bounding: canvas.current!.getBoundingClientRect(),
            style: style.current,
            viewBox,
          });

          return [x, y];
        },
      },
      pinch: {
        scaleBounds: () => {
          const bounding = canvas.current!.getBoundingClientRect();
          const aspectRatio = bounding.width / bounding.height;

          return {
            min: calculateMinimumScale({ aspectRatio, viewBox }),
            max: maximumScale,
          };
        },
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
