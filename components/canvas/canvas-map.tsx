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
import { twColor } from "./utils";
import { CanvasProvider, useCanvas } from "./canvas-provider";
import { Bounds, LatLngBounds, Style } from "./types";
import { cn } from "@/lib/utils";

type MapProps = {
  bounds: LatLngBounds;
  children?: React.ReactNode;
};

const defaultBounds = {
  north: mercatorConstants.reach,
  south: -mercatorConstants.reach,
  west: -180,
  east: 180,
};

const maximumScale = 100;

function calculateMapBounds({
  north,
  south,
  west,
  east,
  padding = 0,
}: LatLngBounds): Bounds {
  const northWest = projectMercator({
    lat: north + padding,
    lng: west - padding,
  });

  const southEast = projectMercator({
    lat: south - padding,
    lng: east + padding,
  });

  return {
    left: Math.round(northWest.x * 100) / 100,
    right: Math.round(southEast.x * 100) / 100,
    top: Math.round(northWest.y * 100) / 100,
    bottom: Math.round(southEast.y * 100) / 100,
  };
}

function calculateStyle({ top, bottom, left, right }: Bounds): Style {
  return {
    x: mercatorConstants.domain / 2 - (left + (right - left) / 2),
    y: mercatorConstants.domain / 2 - (top + (bottom - top) / 2),
    scale: minimumScale({ top, bottom, left, right }),
  };
}

function minimumScale({ top, bottom, left, right }: Bounds): number {
  return mercatorConstants.domain / Math.max(right - left, bottom - top);
}

function transformLayer({
  base,
  ctx,
  style: styleRef,
}: {
  base: RefObject<HTMLDivElement | null>;
  ctx: CanvasRenderingContext2D;
  style: RefObject<Style>;
}) {
  if (!base.current) return;

  // Prepare the canvas
  const style = styleRef.current;
  const bounding = base.current.getBoundingClientRect();
  const width = Math.ceil(bounding.width);
  const height = Math.ceil(bounding.height);
  const dpr = window.devicePixelRatio;

  // Fit to projection
  const clientAspect = bounding.width / bounding.height;
  const projectionRatio =
    (clientAspect > 1 ? bounding.height : bounding.width) /
    mercatorConstants.domain;

  ctx.canvas.width = width * dpr;
  ctx.canvas.height = height * dpr;

  if (ctx.getContextAttributes().alpha === false) {
    // Set a background
    ctx.fillStyle = twColor("neutral-100", "neutral-800");
    ctx.fillRect(0, 0, width * dpr, height * dpr);
  }

  const scale = style.scale * projectionRatio;
  const offsetX = style.x * scale * dpr;
  const offsetY = style.y * scale * dpr;
  const centerX = ((width - mercatorConstants.domain * scale) * dpr) / 2;
  const centerY = ((height - mercatorConstants.domain * scale) * dpr) / 2;

  // Apply transformation
  ctx.setTransform(
    scale * dpr,
    0,
    0,
    scale * dpr,
    offsetX + centerX,
    offsetY + centerY
  );

  ctx.canvas.style.width = `${width}px`;
  ctx.canvas.style.height = `${height}px`;
}

function transformVector(
  [x, y]: [number, number],
  scale: number
): [number, number] {
  if (typeof document === "undefined") return [x, y];

  const bounding = document.body.getBoundingClientRect();

  const unitsPerPx =
    mercatorConstants.domain /
    (Math.min(bounding.width, bounding.height) * scale);

  return [x * unitsPerPx, y * unitsPerPx];
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

function Canvas({ bounds: latLngBounds, children }: MapProps) {
  const base = useRef<HTMLDivElement>(null);
  const layer0 = useRef<HTMLCanvasElement>(null);
  const layer1 = useRef<HTMLCanvasElement>(null);

  const bounds = useMemo(
    () => calculateMapBounds(latLngBounds),
    [latLngBounds]
  );

  const style = useRef(calculateStyle(bounds));
  const [initialized, setInitialized] = useState(false);
  const layers = useMemo(() => [layer0, layer1], []);

  useEffect(() => {
    setTimeout(() => setInitialized(true), 150);
  }, [setInitialized]);

  return (
    <CanvasProvider
      base={base}
      layers={layers}
      style={style}
      bounds={bounds}
      transform={(ctx) => transformLayer({ base, ctx, style })}
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

        <div className="absolute size-full touch-none flex items-center justify-center">
          <div className="size-1 bg-red-500 rounded-full" />
        </div>
      </div>
      <CanvasGestures />
      {children}
    </CanvasProvider>
  );
}

function CanvasGestures() {
  const {
    refs: { base, style },
    updateAll,
    bounds,
  } = useCanvas();

  const updateStyle = useCallback(
    (newStyle: Partial<Style>) => {
      const client = base.current?.parentElement?.getBoundingClientRect();
      if (!client) return;

      const oldStyle = JSON.stringify(style.current);
      style.current = { ...style.current, ...newStyle };
      if (oldStyle !== JSON.stringify(style.current)) updateAll();
    },
    [base, style, updateAll]
  );

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
          const bounding = document.body.getBoundingClientRect();

          const [tx, ty] = transformVector(
            [ox - bounding.width / 2, oy - bounding.height / 2],
            style.current.scale
          );

          memo = [style.current.x, style.current.y, tx, ty];
        }

        const x = memo[0] - ((ms - 1) * memo[2]) / ms;
        const y = memo[1] - ((ms - 1) * memo[3]) / ms;

        updateStyle({ x, y, scale: s });

        return memo;
      },
    },
    {
      target: base,
      drag: {
        filterTaps: true,
        from: () => [style.current.x, style.current.y],
        bounds: {
          left: mercatorConstants.domain / 2 - bounds.right,
          right: mercatorConstants.domain / 2 - bounds.left,
          top: mercatorConstants.domain / 2 - bounds.bottom,
          bottom: mercatorConstants.domain / 2 - bounds.top,
        },
        transform: (v) => transformVector(v, style.current.scale),
      },
      pinch: {
        modifierKey: null,
        scaleBounds: { min: minimumScale(bounds), max: maximumScale },
        from: () => [style.current.scale, 0],
      },
    }
  );

  return null;
}
