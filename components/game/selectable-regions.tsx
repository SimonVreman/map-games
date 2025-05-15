import { useMap } from "@/lib/context/map";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { cn } from "@/lib/utils";
import { a } from "@react-spring/web";

const colors = [
  { fill: "fill-chart-1/25", stroke: "stroke-chart-1/25" },
  { fill: "fill-chart-2/25", stroke: "stroke-chart-2/25" },
  { fill: "fill-chart-3/25", stroke: "stroke-chart-3/25" },
  { fill: "fill-chart-4/25", stroke: "stroke-chart-4/25" },
  { fill: "fill-chart-5/25", stroke: "stroke-chart-5/25" },
  { fill: "fill-chart-1/40", stroke: "stroke-chart-1/40" },
  { fill: "fill-chart-2/40", stroke: "stroke-chart-2/40" },
  { fill: "fill-chart-3/40", stroke: "stroke-chart-3/40" },
  { fill: "fill-chart-4/40", stroke: "stroke-chart-4/40" },
  { fill: "fill-chart-5/40", stroke: "stroke-chart-5/40" },
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
    <g className="pointer-events-none stroke-neutral-200 dark:stroke-neutral-800">
      <a.g style={smallStrokeWidthStyle} className="pointer-events-auto">
        {regions.map(({ codes, paths }) => {
          const color =
            colors[uniqueGroups.indexOf(getCodeGroup(codes)) % colors.length];

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
                "fill-white dark:fill-neutral-900 hover:fill-neutral-600 dark:hover:fill-neutral-400 transition-colors",
                {
                  [`${color.fill} dark:${color.fill} hover:${color.fill} dark:hover:${color.fill}`]:
                    hints,
                  "fill-green-200 dark:fill-green-900 hover:fill-green-400 dark:hover:fill-green-800":
                    isPositive && !hints,
                  "fill-red-300 dark:fill-red-900 hover:fill-red-400 dark:hover:fill-red-800":
                    isNegative && !hints,
                }
              )}
            >
              {paths}
            </g>
          );
        })}
      </a.g>

      {firstAdministrativePaths && (
        <a.g style={smallStrokeWidthStyle}>{firstAdministrativePaths}</a.g>
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

      <g className="fill-neutral-950 dark:fill-neutral-50" strokeWidth={0}>
        {labelsVisible.map(({ codes, center, area }) => (
          <a.text
            key={codes.join(",")}
            x={center[0]}
            y={center[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={style.strokeWidth.to((w) =>
              Math.max(w * 6, Math.min(w * 14, Math.sqrt(area) / 1e2))
            )}
          >
            {codes.map((c, i) => (
              <tspan
                key={c}
                x={center[0]}
                y={center[1]}
                dy={`${(i - (codes.length - 1) / 2) * 1.2}em`}
              >
                {c}
              </tspan>
            ))}
          </a.text>
        ))}
      </g>
    </g>
  );
}
