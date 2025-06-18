import { useCallback } from "react";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { ExtendedRenderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useLabels } from "@/lib/hooks/use-labels";
import { cachedPath } from "@/lib/mapping/cache";
import { TwColor, useTwTheme } from "@/lib/hooks/use-tw-theme";
import { Outlines } from "./outlines";

type Region = {
  codes: number[];
  area: number;
  center: number[];
  paths: string[];
};

const colors = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
  "chart-7",
  "chart-8",
  "chart-9",
  "chart-10",
];

const baseKey = "selectable-regions";
const renderKeys = {
  regions: { key: baseKey + ":regions", order: 0, layer: 0 },
  country: { key: baseKey + ":country", order: 1, layer: 0 },
  labels: { key: baseKey + ":labels", order: 0, layer: 1 },
} as const;

function getRegionColor({
  positive,
  negative,
  hovered,
  group,
  hints,
  enabled,
  twColor,
}: {
  positive: boolean;
  negative: boolean;
  hovered: boolean;
  hints: boolean;
  group: number;
  enabled: boolean;
  twColor: TwColor;
}) {
  if (!enabled) {
    return twColor("neutral-100", "neutral-800");
  } else if (hints) {
    return twColor(colors[group % colors.length]);
  } else if (positive) {
    return hovered
      ? twColor("green-400", "green-800")
      : twColor("green-200", "green-900");
  } else if (negative) {
    return hovered
      ? twColor("red-400", "red-800")
      : twColor("red-300", "red-900");
  }

  return hovered
    ? twColor("neutral-600", "neutral-400")
    : twColor("white", "neutral-900");
}

export function SelectableRegions({
  regions,
  enabled,
  country,
  firstSubdivision,
  divider = [],
  onClick,
  highlighted,
  hints,
  getCodeGroup,
}: {
  regions: Region[];
  enabled: number[];
  country: string[];
  firstSubdivision: string[];
  divider?: string[];
  getCodeGroup: (codes: number[]) => number;
  onClick: (codes: number[]) => void;
} & Pick<SinglePinSlice, "hints" | "highlighted">) {
  const { twColor } = useTwTheme();

  const currentRegionColor = useCallback(
    (region: Region, hovered: boolean) => {
      const codes = region.codes;
      const { correctCode, incorrectKey } = highlighted;

      return getRegionColor({
        positive: correctCode != null && codes.includes(correctCode),
        negative: incorrectKey === codes.join(","),
        group: getCodeGroup(codes),
        hovered,
        enabled: codes.some((c) => enabled.includes(c)),
        hints,
        twColor,
      });
    },
    [highlighted, enabled, hints, getCodeGroup, twColor]
  );

  const isLabelVisible = useCallback(
    ({ codes }: Region) =>
      codes.some((c) => enabled.includes(c)) &&
      (hints ||
        (highlighted.correctCode != null &&
          codes.some((c) => c === highlighted.correctCode)) ||
        (highlighted.incorrectKey != null &&
          codes.join(",") === highlighted.incorrectKey)),
    [highlighted, enabled, hints]
  );

  const renderItem = useCallback<ExtendedRenderer<{ item: Region }>>(
    ({ ctx, scale, item }) => {
      ctx.strokeStyle = twColor("neutral-300", "neutral-700");
      ctx.lineWidth = scale;
      ctx.lineJoin = "round";

      for (const path of item.paths) {
        const path2d = cachedPath(path);
        ctx.fill(path2d);
        ctx.stroke(path2d);
      }
    },
    [twColor]
  );

  useDynamicFill({
    key: renderKeys.regions,
    items: regions,
    renderItem,
    getColor: currentRegionColor,
  });

  usePathsClicked({
    items: regions,
    onClick: (r) =>
      r.codes.some((c) => enabled.includes(c)) && onClick(r.codes),
  });

  useLabels({
    key: renderKeys.labels,
    items: regions,
    getLabel: ({ codes }) => codes.join("/"),
    isVisible: isLabelVisible,
  });

  return (
    <Outlines
      renderKey={renderKeys.country}
      external={country}
      internal={firstSubdivision}
      divider={divider}
    />
  );
}
