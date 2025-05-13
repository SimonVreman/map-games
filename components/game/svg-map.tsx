import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";
import { cn } from "@/lib/utils";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import { useSpring, a } from "@react-spring/web";

type Bounds = {
  north: number;
  south: number;
  west: number;
  east: number;
  padding?: number;
};

const defaultBounds = {
  north: mercatorConstants.reach,
  south: -mercatorConstants.reach,
  west: -180,
  east: 180,
};

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

export const scalingForBounds = (bounds: Bounds) => {
  const viewBox = calculateViewBox(bounds);
  return Math.max(viewBox.width, viewBox.height) / 750;
};

function clampMap({
  bounding,
  x,
  y,
  scale,
}: {
  bounding?: DOMRect;
  x: number;
  y: number;
  scale: number;
}) {
  const top = (1 / (-8 * scale) + 0.5) * (bounding?.height ?? 0);
  const bottom = (1 / (-8 * scale) + 0.5) * -(bounding?.height ?? 0);
  const left = (1 / (-8 * scale) + 0.5) * (bounding?.width ?? 0);
  const right = (1 / (-8 * scale) + 0.5) * -(bounding?.width ?? 0);

  // For 4x zoom
  // 0.25 -> 0 x bounding
  // 0.5  -> 6/24 x bounding
  // 0.75 -> 8/24 x bounding
  // 1    -> 9/24 x bounding
  // = 1/-8x + 1/2
  // Where 8 is 2*4 for 4x zoom

  return {
    x: Math.min(Math.max(x, right), left),
    y: Math.min(Math.max(y, bottom), top),
  };
}

const useGesture = createUseGesture([dragAction, pinchAction]);

export function SvgMap({
  bounds = defaultBounds,
  attribution,
  children,
  className,
  ...props
}: {
  bounds?: Bounds;
  attribution?: React.ReactNode;
} & React.SVGProps<SVGSVGElement>) {
  const ref = useRef<SVGSVGElement>(null);
  const [style, api] = useSpring(() => ({ x: 0, y: 0, scale: 0.25 }));

  const [opacityTimeout, setOpacityTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const triggerOpacityHack = () =>
    setTimeout(() => {
      const opacity = ref.current?.style.getPropertyValue("opacity");
      ref.current?.style.setProperty("opacity", "0.9999");
      setTimeout(() => {
        ref.current?.style.setProperty("opacity", opacity ?? "1");
      }, 100);
    }, 500);

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);

  useGesture(
    {
      onDrag: ({ pinching, cancel, first, last, offset: [x, y] }) => {
        if (pinching) return cancel();

        // Hack to rerender svg, fixes issues with pixelation. But not when interacting with the map
        if ((first || last) && opacityTimeout) clearTimeout(opacityTimeout);
        if (last) setOpacityTimeout(triggerOpacityHack());

        const bounding = ref.current?.getBoundingClientRect();
        api.set(clampMap({ bounding, x, y, scale: style.scale.get() }));
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        last,
        movement: [ms],
        offset: [s],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        // Hack to rerender svg, fixes issues with pixelation. But not when interacting with the map
        if ((first || last) && opacityTimeout) clearTimeout(opacityTimeout);
        if (last) setOpacityTimeout(triggerOpacityHack());

        const { x, y } = clampMap({
          bounding: ref.current?.getBoundingClientRect(),
          x: memo[0] - (ms - 1) * memo[2],
          y: memo[1] - (ms - 1) * memo[3],
          scale: s,
        });

        api.set({ x, y, scale: s });

        return memo;
      },
    },
    {
      target: ref,
      drag: {
        filterTaps: true,
        from: () => [style.x.get(), style.y.get()],
      },
      pinch: {
        scaleBounds: { min: 0.25, max: 1 },
        from: () => [style.scale.get(), 0],
      },
    }
  );

  const viewBox = calculateViewBox(bounds);
  const scaling = scalingForBounds(bounds);

  return (
    <div
      className={cn(
        "size-full relative overflow-hidden bg-secondary",
        className
      )}
    >
      <div className="size-full relative">
        <div className="absolute size-[400%] -inset-[150%]">
          {/* @ts-expect-error - doesnt expect children for some reason */}
          <a.svg
            ref={ref}
            className="bg-secondary touch-none select-none size-full translate-z-0 will-change-transform"
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            fill="none"
            stroke="#000"
            strokeWidth={scaling * 1}
            strokeLinejoin="round"
            style={style}
            {...props}
          >
            {children}
          </a.svg>
        </div>
        {attribution && (
          <div className="bg-muted absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
            {attribution}
          </div>
        )}
      </div>
    </div>
  );
}
