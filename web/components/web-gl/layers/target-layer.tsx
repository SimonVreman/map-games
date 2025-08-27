import {
  GeoJSONSourceSpecification,
  Layer,
  LayerSpecification,
  Source,
  useMap,
} from "react-map-gl/maplibre";
import { useEffect, useMemo, useRef } from "react";
import { AppStore } from "@/lib/store";
import { useHandleQuizGuess } from "@/components/game/quiz/guess";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { useAppStore } from "@/lib/store/provider";
import { map } from "../constants";
import { QuizTarget } from "@/types/registry";

const source: Omit<GeoJSONSourceSpecification, "data"> & { id: string } = {
  id: "targets",
  type: "geojson",
};

const fillLayer: LayerSpecification = {
  id: "target-fill",
  type: "fill",
  source: source.id,
  paint: {
    "fill-color": "#fff",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.4,
      0,
    ],
  },
};
const strokeLayer: LayerSpecification = {
  id: "target-stroke",
  type: "line",
  source: source.id,
  paint: {
    "line-width": 0.8,
    "line-color": [
      "case",
      [
        "any",
        ["==", ["feature-state", "hover"], true],
        ["==", ["get", "tiny"], false],
      ],
      "#ffffff",
      map.colors.boundary.country,
    ],
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.8,
      ["case", ["==", ["get", "tiny"], true], 1, 0],
    ],
  },
};

export function TargetLayer<TName extends QuizSliceName<AppStore>>({
  store,
  targets,
  enabled,
}: {
  store: TName;
  targets: GeoJSON.FeatureCollection;
  enabled: QuizTarget[];
}) {
  const hovered = useRef<string | number | null>(null);
  const map = useMap().current?.getMap();
  const { handleGuess } = useHandleQuizGuess({ store });
  const [hintsEnabled] = useAppStore((s) => [s[store].hintsEnabled]);

  const enabledTargets = useMemo(() => {
    const { features, ...t } = targets;
    return {
      ...t,
      features: features.filter((f) =>
        enabled.find((e) => e.id === f.properties?.name)
      ),
    };
  }, [targets, enabled]);

  useEffect(() => {
    if (!map) return;

    const click = map.on("click", fillLayer.id, (e) => {
      const name = e.features?.[0].properties.name;
      if (!name) return;
      handleGuess(name);
    });

    const move = map.on("mousemove", fillLayer.id, (e) => {
      if (!e.features || e.features.length === 0 || hintsEnabled) return;

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

    const leave = map.on("mouseleave", fillLayer.id, () => {
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
  }, [map, hintsEnabled, handleGuess]);

  return (
    <>
      <Source {...source} data={enabledTargets} />
      <Layer {...fillLayer} />
      <Layer {...strokeLayer} />
    </>
  );
}
