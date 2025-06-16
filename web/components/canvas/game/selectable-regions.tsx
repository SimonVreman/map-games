import { useCallback, useEffect } from "react";
import { useCanvas } from "../canvas-provider";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { ExtendedRenderer, Renderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useLabels } from "@/lib/hooks/use-labels";
import { cachedPath } from "@/lib/mapping/cache";
import { TwColor, useTwTheme } from "@/lib/hooks/use-tw-theme";

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
  twColor,
}: {
  positive: boolean;
  negative: boolean;
  hovered: boolean;
  hints: boolean;
  group: number;
  twColor: TwColor;
}) {
  if (hints) {
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
  country,
  firstSubdivision,
  divider = [],
  onClick,
  highlighted,
  hints,
  getCodeGroup,
}: {
  regions: Region[];
  country: string[];
  firstSubdivision: string[];
  divider?: string[];
  getCodeGroup: (codes: number[]) => number;
  onClick: (codes: number[]) => void;
} & Pick<SinglePinSlice, "hints" | "highlighted">) {
  const { twColor } = useTwTheme();
  const { addRenderer, removeRenderer } = useCanvas();

  const currentRegionColor = useCallback(
    (region: Region, hovered: boolean) => {
      const codes = region.codes;
      const { correctCode, incorrectKey } = highlighted;

      return getRegionColor({
        positive: correctCode != null && codes.includes(correctCode),
        negative: incorrectKey === codes.join(","),
        group: getCodeGroup(codes),
        hovered,
        hints,
        twColor,
      });
    },
    [highlighted, hints, getCodeGroup, twColor]
  );

  const isLabelVisible = useCallback(
    ({ codes }: Region) =>
      hints ||
      (highlighted.correctCode != null &&
        codes.some((c) => c === highlighted.correctCode)) ||
      (highlighted.incorrectKey != null &&
        codes.join(",") === highlighted.incorrectKey),
    [highlighted, hints]
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
    onClick: (r) => onClick(r.codes),
  });

  useLabels({
    key: renderKeys.labels,
    items: regions,
    getLabel: ({ codes }) => codes.join("/"),
    isVisible: isLabelVisible,
  });

  /*
    Country outlines renderer
  */
  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      ctx.lineWidth = scale * 2;
      ctx.lineJoin = "round";

      ctx.strokeStyle = twColor("neutral-400", "neutral-600");
      for (const path of country) ctx.stroke(cachedPath(path));

      ctx.setLineDash([scale * 3, scale * 3]);
      for (const path of firstSubdivision) ctx.stroke(cachedPath(path));

      ctx.strokeStyle = twColor("neutral-300", "neutral-700");
      ctx.setLineDash([scale * 5, scale * 5]);
      for (const path of divider) ctx.stroke(cachedPath(path));
      ctx.setLineDash([]);
    };

    addRenderer({ render, ...renderKeys.country });
    return () => removeRenderer(renderKeys.country);
  }, [
    divider,
    country,
    firstSubdivision,
    addRenderer,
    removeRenderer,
    twColor,
  ]);

  return null;
}
