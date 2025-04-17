import { cn } from "@/lib/utils";

const colors = [
  "fill-chart-1/50",
  "fill-chart-2/50",
  "fill-chart-3/50",
  "fill-chart-4/50",
  "fill-chart-5/50",
  "fill-chart-1/30",
  "fill-chart-2/30",
  "fill-chart-3/30",
  "fill-chart-4/30",
  "fill-chart-5/30",
  "fill-chart-1/10",
  "fill-chart-2/10",
  "fill-chart-3/10",
  "fill-chart-4/10",
  "fill-chart-5/10",
];

export function SelectableRegions({
  regions,
  firstAdministrativePaths,
  countryPaths,
  hints,
  highlighted: { positive, negative },
  onClick,
  getCodeGroup,
}: {
  regions: { code: number; center: number[]; paths: React.ReactNode }[];
  firstAdministrativePaths?: React.ReactNode;
  countryPaths?: React.ReactNode;
  hints: boolean;
  highlighted: { positive: number | null; negative: number | null };
  getCodeGroup: (code: number) => string;
  onClick: (code: number) => void;
}) {
  const groups = regions.map(({ code }) => getCodeGroup(code));
  const uniqueGroups = [...new Set(groups)].sort();

  return (
    <>
      {regions.map(({ code, paths }) => (
        <g
          key={code}
          onClick={() => onClick(code)}
          className={cn("fill-background stroke-foreground/10", {
            [colors[uniqueGroups.indexOf(getCodeGroup(code))]]: hints,
            "hover:fill-primary/70":
              positive !== code && negative !== code && !hints,
            "fill-green-500/20 stroke-green-500/30":
              positive === code && !hints,
            "fill-red-500/20 stroke-red-500/30": negative === code && !hints,
          })}
        >
          {paths}
        </g>
      ))}
      {regions.map(({ code, center }) => (
        <text
          key={code}
          x={center[0]}
          y={center[1]}
          z={100}
          strokeWidth={0}
          textAnchor="middle"
          dominantBaseline="middle"
          className="pointer-events-none fill-foreground"
          opacity={positive === code || negative === code || hints ? 1 : 0}
        >
          {code}
        </text>
      ))}
      {firstAdministrativePaths && (
        <>
          <g className="stroke-neutral-400 pointer-events-none">
            {firstAdministrativePaths}
          </g>
        </>
      )}
      {countryPaths && (
        <g className="stroke-secondary-foreground pointer-events-none">
          {countryPaths}
        </g>
      )}
    </>
  );
}
