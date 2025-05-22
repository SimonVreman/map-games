import { useCallback, useEffect, useMemo } from "react";
import { useCanvas } from "../canvas-provider";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { twColor } from "../utils";
import { Renderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useLabels } from "@/lib/hooks/use-labels";

// trigger tailwind to generate the colors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _colors = ["fill-neutral-600"];

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
}: {
  positive: boolean;
  negative: boolean;
  hovered: boolean;
  hints: boolean;
  group: number;
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

const regionRenderer =
  (paths: Path2D[]): Renderer =>
  ({ ctx, scale }) => {
    ctx.strokeStyle = twColor("neutral-300", "neutral-700");
    ctx.lineWidth = scale;
    ctx.lineJoin = "round";
    for (const path of paths) {
      ctx.fill(path);
      ctx.stroke(path);
    }
  };

export function SelectableRegions({
  regions,
  firstAdministrative = [],
  country = [],
  divider = [],
  onClick,
  highlighted,
  hints,
  getCodeGroup,
}: {
  regions: {
    codes: number[];
    area: number;
    center: number[];
    paths: Path2D[];
  }[];
  firstAdministrative?: Path2D[];
  country?: Path2D[];
  divider?: Path2D[];
  getCodeGroup: (codes: number[]) => number;
  onClick: (codes: number[]) => void;
} & Pick<SinglePinSlice, "hints" | "highlighted">) {
  const { addRenderer, removeRenderer } = useCanvas();

  const regionPaths = useMemo(() => regions.map((r) => r.paths), [regions]);

  const currentRegionColor = useCallback(
    (i: number, hovered: boolean) => {
      const codes = regions[i].codes;
      const { correctCode, incorrectKey } = highlighted;

      return getRegionColor({
        positive: correctCode != null && codes.includes(correctCode),
        negative: incorrectKey === codes.join(","),
        group: getCodeGroup(codes),
        hovered,
        hints,
      });
    },
    [highlighted, hints, getCodeGroup, regions]
  );

  useDynamicFill({
    key: renderKeys.regions,
    paths: regionPaths,
    renderer: regionRenderer,
    getColor: currentRegionColor,
  });

  usePathsClicked({
    paths: regionPaths,
    onClick: (i) => onClick(regions[i].codes),
  });

  useLabels({
    key: renderKeys.labels,
    items: regions,
    getLabel: ({ codes }) => codes.join("/"),
    isVisible: ({ codes }) =>
      hints ||
      (highlighted.correctCode != null &&
        codes.some((c) => c === highlighted.correctCode)) ||
      (highlighted.incorrectKey != null &&
        codes.join(",") === highlighted.incorrectKey),
  });

  /*
    Country outlines renderer
  */
  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      ctx.strokeStyle = twColor("neutral-300", "neutral-600");
      ctx.lineWidth = scale * 2;
      ctx.lineJoin = "round";
      for (const path of country) ctx.stroke(path);
      for (const path of firstAdministrative) ctx.stroke(path);

      ctx.setLineDash([scale * 5, scale * 5]);
      for (const path of divider) ctx.stroke(path);
      ctx.setLineDash([]);
    };

    addRenderer({ render, ...renderKeys.country });
    return () => removeRenderer(renderKeys.country);
  }, [country, divider, firstAdministrative, addRenderer, removeRenderer]);

  return null;
}
