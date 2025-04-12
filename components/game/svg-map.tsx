import { mercatorConstants, projectMercator } from "@/lib/mapping/mercator";

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
  console.log(northWest, southEast);
  return `${northWest.x} ${northWest.y} ${Math.abs(
    southEast.x - northWest.x
  )} ${Math.abs(northWest.y - southEast.y)}`;
}

export function SvgMap({
  bounds = defaultBounds,
  children,
  ...props
}: {
  bounds?: Bounds;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={calculateViewBox(bounds)}
      width="100%"
      height="100%"
      fill="none"
      stroke="#000"
      strokeWidth="0.1"
      strokeLinejoin="round"
      {...props}
    >
      {/* <path strokeWidth="0.1" d="M -500 0 L 500 0 z" />
      <path strokeWidth="0.1" d="M 0 -472.5L 0 472.5 z" /> */}
      {children}
    </svg>
  );
}
