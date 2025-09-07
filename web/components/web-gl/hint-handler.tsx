import { useQuizStore } from "@/lib/store/quiz-provider";
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

export function HintHandler() {
  const map = useMap().current?.getMap();
  const [highlight, hints] = useQuizStore((s) => [s.highlight, s.hintsEnabled]);

  const updateVisibility = useCallback(() => {
    if (!map) return;

    const update = () => {
      map.setGlobalStateProperty(hintedTargetsKey, [
        ...highlight.positive,
        ...highlight.negative,
      ]);

      map.setGlobalStateProperty(hintedAllKey, hints);
    };

    if (!map.isStyleLoaded()) {
      const subscription = map.on("styledata", () => {
        update();
        subscription.unsubscribe();
      });
      return;
    }

    update();
  }, [map, hints, highlight]);

  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  return null;
}
