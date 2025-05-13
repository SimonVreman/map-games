import { useMap } from "@/lib/context/map";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

const minTapSize = 1.5;

export function SelectableCountries({
  items,
  isHighlighted,
  onClick,
}: {
  items: readonly {
    name: string;
    paths: React.ReactNode;
    subjects: readonly string[];
    meta: {
      north: number;
      south: number;
      west: number;
      east: number;
      x: number;
      y: number;
    };
  }[];
  isHighlighted: (name: string) => boolean;
  onClick: (name: string) => void;
}) {
  const { scale } = useMap();
  const needTarget = items.filter(
    ({ meta }) =>
      meta.east - meta.west < minTapSize || meta.south - meta.north < minTapSize
  );

  return (
    <g className="stroke-neutral-500">
      {items.map(({ name, paths, subjects }) => (
        <g
          key={name}
          className={cn({
            "fill-background hover:fill-primary/70": !isHighlighted(name),
          })}
          fill={isHighlighted(name) ? `url(#${subjects.join(",")})` : undefined}
          onClick={() => onClick(name)}
        >
          {paths}
        </g>
      ))}
      {needTarget.map(({ name, subjects, meta }) => (
        <Fragment key={name}>
          {isHighlighted(name) && (
            <circle
              cx={meta.x}
              cy={meta.y}
              r={minTapSize}
              strokeWidth={0}
              className="fill-secondary"
            />
          )}
          <circle
            cx={meta.x}
            cy={meta.y}
            r={minTapSize}
            strokeDasharray={!isHighlighted(name) ? scale * 3 : undefined}
            strokeWidth={scale * 2}
            onClick={() => onClick(name)}
            className={cn({
              "fill-background/30 hover:fill-primary/70": !isHighlighted(name),
            })}
            fill={isHighlighted(name) ? `url(#${subjects.join(",")})` : "none"}
          />
        </Fragment>
      ))}
    </g>
  );
}
