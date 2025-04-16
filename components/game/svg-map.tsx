import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";
import { cn } from "@/lib/utils";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { useEffect, useRef } from "react";
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

  const x = Math.round(northWest.x * 100) / 100;
  const y = Math.round(northWest.y * 100) / 100;
  const width = Math.round(Math.abs(southEast.x - northWest.x) * 100) / 100;
  const height = Math.round(Math.abs(northWest.y - southEast.y) * 100) / 100;

  return `${x} ${y} ${width} ${height}`;
}

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
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();
        const bounding = ref.current?.getBoundingClientRect();
        api.start(clampMap({ bounding, x, y, scale: style.scale.get() }));
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

        // Hack to rerender svg, fixes issues with pixelation
        if (last) {
          const opacity = ref.current?.style.getPropertyValue("opacity");
          ref.current?.style.setProperty("opacity", "0.9999");
          setTimeout(() => {
            ref.current?.style.setProperty("opacity", opacity ?? "1");
          }, 50);
        }

        const { x, y } = clampMap({
          bounding: ref.current?.getBoundingClientRect(),
          x: memo[0] - (ms - 1) * memo[2],
          y: memo[1] - (ms - 1) * memo[3],
          scale: s,
        });

        api.start({ x, y, scale: s });

        return memo;
      },
    },
    {
      target: ref,
      drag: {
        filterTaps: true,
        from: () => [style.x.get(), style.y.get()],
      },
      pinch: { scaleBounds: { min: 0.25, max: 1 } },
    }
  );

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
            className="bg-secondary touch-none size-full translate-z-0 will-change-transform"
            viewBox={calculateViewBox(bounds)}
            fill="none"
            stroke="#000"
            strokeWidth="0.1"
            strokeLinejoin="round"
            style={style}
            {...props}
          >
            {children}
          </a.svg>
        </div>
        {attribution && (
          <div className="bg-muted absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none">
            {attribution}
          </div>
        )}
      </div>
    </div>
  );
}
