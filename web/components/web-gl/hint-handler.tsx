import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { ExpressionFilterSpecification } from "maplibre-gl";
import { useCallback, useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

const hintedTargetsKey = "hinted-targets";
const hintedAllKey = "hinted-all";

export function isFeatureHinted(
  targetProperty: string
): ExpressionFilterSpecification {
  return [
    "any",
    ["==", ["global-state", hintedAllKey], true],
    ["in", ["get", targetProperty], ["global-state", hintedTargetsKey]],
  ];
}

export function HintHandler<TName extends QuizSliceName<AppStore>>({
  store,
}: {
  store: TName;
}) {
  const map = useMap().current?.getMap();

  const [highlight, hints] = useAppStore((s) => [
    s[store].highlight,
    s[store].hintsEnabled,
  ]);

  const updateVisibility = useCallback(() => {
    if (!map) return;

    map.setGlobalStateProperty(hintedTargetsKey, [
      ...highlight.positive,
      ...highlight.negative,
    ]);

    map.setGlobalStateProperty(hintedAllKey, hints);
  }, [map, hints, highlight]);

  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  return null;
}
