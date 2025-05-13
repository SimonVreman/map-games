import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";
import { cn } from "@/lib/utils";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import { a, to } from "@react-spring/web";
import { MapProvider, useMap } from "@/lib/context/map";

type Bounds = {
  north: number;
  south: number;
  west: number;
  east: number;
  padding?: number;
};

type MapProps = {
  bounds?: Bounds;
} & React.SVGProps<SVGSVGElement>;

const defaultBounds = {
  north: mercatorConstants.reach,
  south: -mercatorConstants.reach,
  west: -180,
  east: 180,
};

const minimumScale = 1;
const maximumScale = 8;
const defaultStyle = { x: 0, y: 0, scale: minimumScale };

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

function calculateStrokeWidth({
  bounds,
  scale,
}: {
  bounds: Bounds;
  scale: number;
}) {
  const viewBox = calculateViewBox(bounds);
  return (
    (Math.max(viewBox.width, viewBox.height) * minimumScale) / (750 * scale)
  );
}

function calculateMapBounds({
  bounding,
  scale,
}: {
  bounding?: DOMRect;
  scale: number;
}) {
  if (!bounding) return { left: 0, right: 0, top: 0, bottom: 0 };

  const xBound = bounding.width * scale * 0.5;
  const yBound = bounding.height * scale * 0.5;

  return { left: -xBound, right: xBound, top: -yBound, bottom: yBound };
}

const useGesture = createUseGesture([dragAction, pinchAction]);

export function SvgMap({
  bounds = defaultBounds,
  attribution,
  className,
  ...props
}: {
  attribution?: React.ReactNode;
} & MapProps) {
  return (
    <div
      className={cn(
        "size-full relative overflow-hidden bg-secondary",
        className
      )}
    >
      <div className="size-full relative">
        <MapProvider
          style={{
            ...defaultStyle,
            strokeWidth: calculateStrokeWidth({
              bounds,
              scale: defaultStyle.scale,
            }),
          }}
        >
          <Map bounds={bounds} {...props} />
        </MapProvider>

        {attribution && (
          <div className="bg-muted absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
            {attribution}
          </div>
        )}
      </div>
    </div>
  );
}

function Map({ bounds = defaultBounds, children, ...props }: MapProps) {
  const ref = useRef<SVGSVGElement>(null);
  const { style, styleApi: api } = useMap();

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

        api.set({ x, y });
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
          const bounding = ref.current!.getBoundingClientRect();
          const { width, height, x, y } = bounding;
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);

          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        // Hack to rerender svg, fixes issues with pixelation. But not when interacting with the map
        if ((first || last) && opacityTimeout) clearTimeout(opacityTimeout);
        if (last) setOpacityTimeout(triggerOpacityHack());

        const unboundedX = ms * memo[0] - (ms - 1) * memo[2];
        const unboundedY = ms * memo[1] - (ms - 1) * memo[3];

        const { left, right, top, bottom } = calculateMapBounds({
          bounding: ref.current!.getBoundingClientRect(),
          scale: s,
        });

        const x = Math.min(Math.max(unboundedX, left), right);
        const y = Math.min(Math.max(unboundedY, top), bottom);
        const strokeWidth = calculateStrokeWidth({ bounds, scale: s });

        api.set({ x, y, scale: s, strokeWidth });

        return memo;
      },
    },
    {
      target: ref,
      drag: {
        filterTaps: true,
        from: () => [style.x.get(), style.y.get()],
        bounds: () => {
          const scale = style.scale.get();
          const bounding = ref.current?.getBoundingClientRect();
          return calculateMapBounds({ bounding, scale });
        },
      },
      pinch: {
        scaleBounds: { min: minimumScale, max: maximumScale },
        from: () => [style.scale.get(), 0],
      },
    }
  );

  const viewBox = calculateViewBox(bounds);

  const viewBoxAnimated = to(
    [style.x, style.y, style.scale],
    (rawX, rawY, scale) => {
      const bounding = ref.current?.getBoundingClientRect();

      if (!bounding)
        return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;

      console.log(rawX, rawY);

      const x = rawX / scale;
      const y = rawY / scale;

      const aspectBounding = bounding.width / bounding.height;
      const aspectViewBox = viewBox.width / viewBox.height;

      const widthFactor = Math.max(aspectBounding / aspectViewBox, 1);
      const heightFactor = Math.max(aspectViewBox / aspectBounding, 1);

      const width = Math.min(
        (viewBox.width / scale) * widthFactor,
        viewBox.width
      );
      const height = Math.min(
        (viewBox.height / scale) * heightFactor,
        viewBox.height
      );

      const offsetX = (x / bounding.width) * viewBox.width;
      const offsetY = (y / bounding.height) * viewBox.height;

      const newXCenter = viewBox.x + viewBox.width / 2 - offsetX * widthFactor;
      const newYCenter =
        viewBox.y + viewBox.height / 2 - offsetY * heightFactor;

      const left = newXCenter - width / 2;
      const top = newYCenter - height / 2;

      return `${left} ${top} ${width} ${height}`;
    }
  );

  return (
    <>
      <a.svg
        ref={ref}
        className="bg-secondary touch-none select-none size-full"
        fill="none"
        strokeLinejoin="round"
        viewBox={viewBoxAnimated}
        style={{ strokeWidth: style.strokeWidth }}
        {...props}
      >
        {children}
      </a.svg>
    </>
  );
}
