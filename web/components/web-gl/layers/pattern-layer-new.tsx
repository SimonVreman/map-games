import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { Layer, LayerSpecification, useMap } from "react-map-gl/maplibre";

const config: LayerSpecification = {
  id: "chevdev",
  type: "fill",
  source: "chevdev",
  "source-layer": "shapes",
  paint: { "fill-color": ["get", "fill"] },
  // filter: [
  //   "in",
  //   ["get", "name"],
  //   ["literal", europeanBollards.entries.map((e) => e.name)],
  // ],
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

  return <Layer {...config} />;
}
