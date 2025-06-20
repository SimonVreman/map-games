import { useCallback, useMemo } from "react";
import { ExtendedRenderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useLabels } from "@/lib/hooks/use-labels";
import { cachedPath } from "@/lib/mapping/cache";
import { TwColor, useTwTheme } from "@/lib/hooks/use-tw-theme";
import { Outlines } from "./outlines";
import { AppStore } from "@/lib/store";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { useHandleQuizGuess } from "@/components/game/quiz/guess";
import { useAppStore } from "@/lib/store/provider";

type Target = {
  name: string;
  subjects: string[];
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

const baseKey = "selectable-targets";
const renderKeys = {
  targets: { key: baseKey + ":targets", order: 0, layer: 0 },
  country: { key: baseKey + ":country", order: 1, layer: 0 },
  labels: { key: baseKey + ":labels", order: 0, layer: 1 },
} as const;

function getTargetColor({
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

export function LabeledTargets<TName extends QuizSliceName<AppStore>>({
  store,
  targets,
  subsets,
  country,
  firstSubdivision,
  divider = [],
}: {
  store: TName;
  targets: Target[];
  subsets: { name: string; subjects: string[] }[];
  country: string[];
  firstSubdivision: string[];
  divider?: string[];
}) {
  const [highlighted, hints, enabledSubsets] = useAppStore((s) => [
    s[store].highlight,
    s[store].hintsEnabled,
    s[store].subsetsEnabled,
  ]);

  const { twColor } = useTwTheme();
  const { handleGuess } = useHandleQuizGuess({ store });

  const enabledSubjects = useMemo(
    () =>
      subsets.flatMap((s) =>
        enabledSubsets.includes(s.name) ? s.subjects : []
      ),
    [subsets, enabledSubsets]
  );

  const currentTargetColor = useCallback(
    (target: Target, hovered: boolean) => {
      const subjects = target.subjects;
      const subsetIndex = subsets.findIndex((s) =>
        s.subjects.some((c) => subjects.includes(c))
      );

      return getTargetColor({
        positive: highlighted.positive.includes(target.name),
        negative: highlighted.negative.includes(target.name),
        group: subsetIndex,
        enabled: enabledSubsets.includes(subsets[subsetIndex]?.name),
        hovered,
        hints,
        twColor,
      });
    },
    [highlighted, subsets, hints, twColor, enabledSubsets]
  );

  const isLabelVisible = useCallback(
    ({ name, subjects }: Target) =>
      subjects.some((s) => enabledSubjects.includes(s)) &&
      (hints ||
        highlighted.positive.includes(name) ||
        highlighted.negative.includes(name)),
    [highlighted, hints, enabledSubjects]
  );

  const renderItem = useCallback<ExtendedRenderer<{ item: Target }>>(
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
    key: renderKeys.targets,
    items: targets,
    renderItem,
    getColor: currentTargetColor,
  });

  usePathsClicked({
    items: targets,
    onClick: (r) =>
      r.subjects.some((s) => enabledSubjects.includes(s)) &&
      handleGuess(r.name),
  });

  useLabels({
    key: renderKeys.labels,
    items: targets,
    getLabel: ({ subjects }) => subjects.join("/"),
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
