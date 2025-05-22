import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { clientToMap, mapToClient, twColor } from "./utils";
import { CanvasProvider, useCanvas } from "./canvas-provider";
import { Bounds, Style, ViewBox } from "./types";
import { cn } from "@/lib/utils";

type MapProps = {
  bounds: Bounds;
  children?: React.ReactNode;
};

const defaultBounds = {
  north: mercatorConstants.reach,
  south: -mercatorConstants.reach,
  west: -180,
  east: 180,
};

const maximumScale = 100;

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

function transformLayer({
  base,
  ctx,
  viewBox,
  style: styleRef,
}: {
  base: RefObject<HTMLDivElement | null>;
  ctx: CanvasRenderingContext2D;
  viewBox: ViewBox;
  style: RefObject<Style>;
}) {
  // console.log("transform called, has base:", !!base.current);

  if (!base.current) return;

  // Prepare the canvas
  const unscaledStyle = styleRef.current;
  const bounding = base.current.getBoundingClientRect();
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

  if (ctx.getContextAttributes().alpha === false) {
    // Set a background
    ctx.fillStyle = twColor("neutral-100", "neutral-700");
    ctx.fillRect(0, 0, width * dpr, height * dpr);
  }

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
  ...props
}: {
  attribution?: React.ReactNode;
} & Partial<MapProps>) {
  return (
    <div className="relative size-full overflow-hidden bg-neutral-100 dark:bg-neutral-700">
      <Canvas bounds={bounds} {...props} />

      {attribution && (
        <div className="bg-neutral-50 dark:bg-neutral-700 absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
          {attribution}
        </div>
      )}
    </div>
  );
}

function Canvas({ bounds, children }: MapProps) {
  const base = useRef<HTMLDivElement>(null);
  const layer0 = useRef<HTMLCanvasElement>(null);
  const layer1 = useRef<HTMLCanvasElement>(null);
  const style = useRef({ x: 0, y: 0, scale: 1 });

  const viewBox = useMemo(() => calculateViewBox(bounds), [bounds]);
  const [initialized, setInitialized] = useState(false);
  const layers = useMemo(() => [layer0, layer1], []);

  const transform = useCallback(
    (ctx: CanvasRenderingContext2D) =>
      transformLayer({ base, ctx, viewBox, style }),
    [viewBox]
  );

  useEffect(() => {
    setTimeout(() => setInitialized(true), 150);
  }, [setInitialized]);

  return (
    <CanvasProvider
      base={base}
      layers={layers}
      style={style}
      viewBox={viewBox}
      transform={transform}
    >
      <div
        ref={base}
        className={cn(
          "relative size-full overflow-hidden touch-none select-none transition-opacity duration-500",
          !initialized && "opacity-0"
        )}
      >
        <canvas ref={layer0} className="absolute top-0 left-0" />
        <canvas ref={layer1} className="absolute top-0 left-0" />
      </div>
      <CanvasGestures />
      {children}
    </CanvasProvider>
  );
}

function CanvasGestures() {
  const init = useRef(false);

  const {
    refs: { base, style },
    updateAll,
    viewBox,
  } = useCanvas();

  const updateStyle = useCallback(
    (newStyle: Partial<Style>) => {
      const client = base.current?.parentElement?.getBoundingClientRect();
      if (!client) return;

      const oldStyle = JSON.stringify(style.current);

      style.current = clampStyle({
        viewBox,
        aspectRatio: client.width / client.height,
        style: clientToMap({
          bounding: client,
          viewBox,
          style: { ...style.current, ...newStyle },
        }),
      });

      if (oldStyle !== JSON.stringify(style.current)) updateAll();
    },
    [viewBox, base, style, updateAll]
  );

  // Clamp style to client window
  useEffect(() => {
    if (init.current) return;
    init.current = true;
    updateStyle(style.current);
  }, [updateStyle, style]);

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
  }, [updateStyle, style]);

  useGesture(
    {
      onDrag: ({ pinching, first, last, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();
        if (first) base.current!.style.cursor = "move";
        if (last) base.current!.style.cursor = "auto";

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
          const bounding = base.current!.getBoundingClientRect();
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
      target: base,
      drag: {
        filterTaps: true,
        // TODO bounds at some point
        from: () => {
          const { x, y } = mapToClient({
            bounding: base.current!.getBoundingClientRect(),
            style: style.current,
            viewBox,
          });

          return [x, y];
        },
      },
      pinch: {
        scaleBounds: () => {
          const bounding = base.current!.getBoundingClientRect();
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

  return null;
}
