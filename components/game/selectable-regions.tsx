import { useMap } from "@/lib/context/map";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { cn } from "@/lib/utils";
import { a } from "@react-spring/web";

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
  divider,
  hints,
  highlighted,
  onClick,
  getCodeGroup,
}: {
  regions: {
    codes: number[];
    area: number;
    center: number[];
    paths: React.ReactNode;
  }[];
  firstAdministrativePaths?: React.ReactNode;
  countryPaths?: React.ReactNode;
  divider?: React.ReactNode;
  getCodeGroup: (codes: number[]) => string;
  onClick: (codes: number[]) => void;
} & Pick<SinglePinSlice, "hints" | "highlighted">) {
  const groups = regions.map(({ codes }) => getCodeGroup(codes));
  const uniqueGroups = [...new Set(groups)].sort();
  const { style } = useMap();

  const smallStrokeWidthStyle = {
    strokeWidth: style.strokeWidth.to((w) => 0.75 * w),
  };

  const labelsVisible = hints
    ? regions
    : highlighted.correctCode != null || highlighted.incorrectKey != null
    ? regions.filter(
        ({ codes }) =>
          codes.some((c) => c === highlighted.correctCode) ||
          codes.join(",") === highlighted.incorrectKey
      )
    : [];

  return (
    <>
      <a.g style={smallStrokeWidthStyle}>
        {regions.map(({ codes, paths }) => {
          const color = colors[uniqueGroups.indexOf(getCodeGroup(codes))];

          const isPositive =
            highlighted.correctCode != null &&
            codes.includes(highlighted.correctCode);
          const isNegative =
            highlighted.incorrectKey != null &&
            codes.join(",") === highlighted.incorrectKey;

          return (
            <g
              key={codes.join(",")}
              onClick={() => onClick(codes)}
              className={cn(
                "fill-background stroke-neutral-200 dark:stroke-neutral-800 transition-colors",
                {
                  [`${color.stroke} ${color.fill}`]: hints,
                  "hover:fill-primary/70": !isPositive && !isNegative && !hints,
                  "fill-green-500/20": isPositive && !hints,
                  "fill-red-500/20": isNegative && !hints,
                }
              )}
            >
              {paths}
            </g>
          );
        })}
      </a.g>

      <g
        className={cn(
          "pointer-events-none",
          hints ? "stroke-secondary-foreground" : "stroke-neutral-500"
        )}
      >
        {firstAdministrativePaths && (
          <a.g style={smallStrokeWidthStyle} className="stroke-neutral-400">
            {firstAdministrativePaths}
          </a.g>
        )}

        {divider && (
          <a.g
            style={{ strokeDasharray: style.strokeWidth.to((w) => w * 10) }}
            className="stroke-neutral-300 dark:stroke-neutral-700"
          >
            {divider}
          </a.g>
        )}

        {countryPaths}
      </g>

      <g className="pointer-events-none fill-secondary-foreground">
        {labelsVisible.map(({ codes, center, area }) => (
          <a.text
            key={codes.join(",")}
            x={center[0]}
            y={center[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth={0}
            fontSize={style.strokeWidth.to((w) => w * 12)}
            style={{
              display: style.scale.to((s) => {
                return area < 4e4 / s ? "none" : "inline";
              }),
            }}
          >
            {codes.join("/")}
          </a.text>
        ))}
      </g>
    </>
  );
}
