import { cn } from "@/lib/utils";
import { Fragment } from "react";

const colors = [
  { fill: "fill-chart-1/50", stroke: "stroke-chart-1/50" },
  { fill: "fill-chart-2/50", stroke: "stroke-chart-2/50" },
  { fill: "fill-chart-3/50", stroke: "stroke-chart-3/50" },
  { fill: "fill-chart-4/50", stroke: "stroke-chart-4/50" },
  { fill: "fill-chart-5/50", stroke: "stroke-chart-5/50" },
  { fill: "fill-chart-1/30", stroke: "stroke-chart-1/50" },
  { fill: "fill-chart-2/30", stroke: "stroke-chart-2/50" },
  { fill: "fill-chart-3/30", stroke: "stroke-chart-3/50" },
  { fill: "fill-chart-4/30", stroke: "stroke-chart-4/50" },
  { fill: "fill-chart-5/30", stroke: "stroke-chart-5/50" },
  { fill: "fill-chart-1/10", stroke: "stroke-chart-1/10" },
  { fill: "fill-chart-2/10", stroke: "stroke-chart-2/10" },
  { fill: "fill-chart-3/10", stroke: "stroke-chart-3/10" },
  { fill: "fill-chart-4/10", stroke: "stroke-chart-4/10" },
  { fill: "fill-chart-5/10", stroke: "stroke-chart-5/10" },
];

export function SelectableRegions({
  regions,
  firstAdministrativePaths,
  countryPaths,
  hints,
  highlighted: { positive, negative },
  scaling,
  onClick,
  getCodeGroup,
}: {
  regions: { code: number; center: number[]; paths: React.ReactNode }[];
  firstAdministrativePaths?: React.ReactNode;
  countryPaths?: React.ReactNode;
  hints: boolean;
  highlighted: { positive: number | null; negative: number | null };
  scaling: number;
  getCodeGroup: (code: number) => string;
  onClick: (code: number) => void;
}) {
  const groups = regions.map(({ code }) => getCodeGroup(code));
  const uniqueGroups = [...new Set(groups)].sort();

  const labelsVisible = hints
    ? regions
    : positive || negative
    ? regions.filter(({ code }) => code === positive || code === negative)
    : [];

  return (
    <>
      {regions.map(({ code, paths }) => {
        const color = colors[uniqueGroups.indexOf(getCodeGroup(code))];
        return (
          <g
            key={code}
            onClick={() => onClick(code)}
            className={cn(
              "fill-background stroke-neutral-200 dark:stroke-neutral-800",
              {
                [`${color.stroke} ${color.fill}`]: hints,
                "hover:fill-primary/70":
                  positive !== code && negative !== code && !hints,
                "fill-green-500/20": positive === code && !hints,
                "fill-red-500/20": negative === code && !hints,
              }
            )}
          >
            {paths}
          </g>
        );
      })}

      <g
        className={cn(
          "pointer-events-none",
          hints ? "stroke-secondary-foreground" : "stroke-neutral-500"
        )}
      >
        {firstAdministrativePaths && (
          <g strokeDasharray={hints ? 0 : scaling * 3}>
            {firstAdministrativePaths}
          </g>
        )}

        {countryPaths}
      </g>

      <filter id="outline">
        <feMorphology
          in="SourceAlpha"
          result="DILATED"
          operator="dilate"
          radius={scaling * 0.4}
        />
        <feFlood
          floodColor="var(--background)"
          floodOpacity="1"
          result="TEXT"
        />
        <feComposite in="TEXT" in2="DILATED" operator="in" result="OUTLINE" />

        <feMerge>
          <feMergeNode in="OUTLINE" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <g className="pointer-events-none fill-secondary-foreground">
        {labelsVisible.map(({ code, center }) => (
          <text
            key={code}
            x={center[0]}
            y={center[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth={0}
            fontSize={scaling * 12}
            filter="url(#outline)"
          >
            {code}
          </text>
        ))}
      </g>
    </>
  );
}
