import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "size-full relative overflow-hidden bg-secondary",
        className
      )}
    >
      <svg
        className="bg-secondary"
        viewBox={calculateViewBox(bounds)}
        width="100%"
        height="100%"
        fill="none"
        stroke="#000"
        strokeWidth="0.1"
        strokeLinejoin="round"
        {...props}
      >
        {children}
      </svg>
      {attribution && (
        <div className="bg-muted absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none">
          {attribution}
        </div>
      )}
    </div>
  );
}
