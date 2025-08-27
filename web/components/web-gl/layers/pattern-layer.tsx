import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { useCallback, useEffect } from "react";
import { FillLayerSpecification, Layer, useMap } from "react-map-gl/maplibre";

const config: Omit<FillLayerSpecification, "id" | "source"> = {
  type: "fill",
  paint: { "fill-color": ["get", "fill"], "fill-outline-color": "#00000000" },
  filter: [
    "any",
    ["==", ["global-state", "pattern-layer-hints"], true],
    ["in", ["get", "target"], ["global-state", "pattern-layer-keys"]],
  ],
};

export function PatternLayer<TName extends QuizSliceName<AppStore>>({
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

    map.setGlobalStateProperty("pattern-layer-keys", [
      ...highlight.positive,
      ...highlight.negative,
    ]);

    map.setGlobalStateProperty("pattern-layer-hints", hints);
  }, [map, hints, highlight]);

  useEffect(() => {
    updateVisibility();
  }, [updateVisibility]);

  return <Layer id={store} source={store} {...config} />;
}
