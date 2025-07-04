import {
  GeoJSONSourceSpecification,
  Layer,
  LayerSpecification,
  Source,
  useMap,
} from "react-map-gl/maplibre";
import { useEffect, useRef } from "react";
import { AppStore } from "@/lib/store";
import { useHandleQuizGuess } from "@/components/game/quiz/guess";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";

const source: Omit<GeoJSONSourceSpecification, "data"> & { id: string } = {
  id: "targets",
  type: "geojson",
};

const layer: LayerSpecification = {
  id: "target",
  type: "fill",
  source: source.id,
  paint: {
    "fill-color": "#fff",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.3,
      0,
    ],
  },
};

export function TargetLayer<TName extends QuizSliceName<AppStore>>({
  store,
  targets,
}: {
  store: TName;
  targets: GeoJSON.FeatureCollection;
}) {
  const hovered = useRef<string | number | null>(null);
  const map = useMap().current?.getMap();
  const { handleGuess } = useHandleQuizGuess({ store });

  useEffect(() => {
    if (!map) return;
    const click = map.on("click", layer.id, (e) => {
      const name = e.features?.[0].properties.name;
      if (!name) return;
      handleGuess(name);
    });

    const move = map.on("mousemove", layer.id, (e) => {
      if (!e.features || e.features.length === 0) return;

      if (hovered.current)
        map.setFeatureState(
          { source: source.id, id: hovered.current },
          { hover: false }
        );

      hovered.current = e.features[0].id ?? null;

      if (hovered.current)
        map.setFeatureState(
          { source: source.id, id: hovered.current },
          { hover: true }
        );

      map.getCanvas().style.cursor = hovered.current ? "pointer" : "default";
    });

    const leave = map.on("mouseleave", layer.id, () => {
      if (hovered.current)
        map.setFeatureState(
          { source: source.id, id: hovered.current },
          { hover: false }
        );

      hovered.current = null;
      map.getCanvas().style.cursor = "default";
    });

    return () => {
      click.unsubscribe();
      move.unsubscribe();
      leave.unsubscribe();
    };
  }, [map, handleGuess]);

  return (
    <>
      <Source {...source} data={targets} />
      <Layer {...layer} />
    </>
  );
}
