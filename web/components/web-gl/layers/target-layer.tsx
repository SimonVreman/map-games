import {
  GeoJSONSourceSpecification,
  Layer,
  LayerSpecification,
  MapMouseEvent,
  Source,
  useMap,
} from "react-map-gl/maplibre";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { AppStore } from "@/lib/store";
import { useHandleQuizGuess } from "@/components/game/quiz/guess";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { useAppStore } from "@/lib/store/provider";
import { map } from "../constants";
import { QuizSubset, QuizTarget } from "@/types/registry";
import { MapGeoJSONFeature } from "maplibre-gl";
import { isFeatureHinted } from "../hint-handler";

const source: Omit<GeoJSONSourceSpecification, "data"> & { id: string } = {
  id: "targets",
  type: "geojson",
};

const fillLayer: LayerSpecification = {
  id: "target-fill",
  type: "fill",
  source: source.id,
  paint: {
    "fill-color": [
      "case",
      ["all", ["has", "color"], isFeatureHinted("id")],
      ["get", "color"],
      "#fff",
    ],
    "fill-opacity": [
      "case",
      ["all", ["has", "color"], isFeatureHinted("id")],
      0.7,
      isFeatureHinted("id"),
      0,
      ["boolean", ["feature-state", "hover"], false],
      0.6,
      0.4,
    ],
  },
};
const strokeLayer: LayerSpecification = {
  id: "target-stroke",
  type: "line",
  source: source.id,
  paint: {
    "line-width": 1.6,
    "line-color": [
      "case",
      [
        "all",
        ["==", ["feature-state", "hover"], false],
        ["==", ["get", "tiny"], true],
      ],
      map.colors.boundary.country,
      [
        "case",
        ["all", ["has", "color"], isFeatureHinted("id")],
        ["get", "color"],
        "#fff",
      ],
    ],
    "line-opacity": [
      "case",
      ["all", ["has", "color"], isFeatureHinted("id")],
      1,
      ["==", ["get", "tiny"], true],
      1,
      isFeatureHinted("id"),
      0,
      ["boolean", ["feature-state", "hover"], false],
      0.8,
      0.6,
    ],
  },
};

export function TargetLayer<TName extends QuizSliceName<AppStore>>({
  store,
  targetFeatures,
  targets,
  subsets,
}: {
  store: TName;
  targetFeatures: GeoJSON.FeatureCollection;
  targets: QuizTarget[];
  subsets: QuizSubset[];
}) {
  const hovered = useRef<string | number | null>(null);
  const map = useMap().current?.getMap();
  const { handleGuess } = useHandleQuizGuess({ store });

  const [hintsEnabled, subsetsEnabled] = useAppStore((s) => [
    s[store].hintsEnabled,
    s[store].subsetsEnabled,
  ]);

  const enabledTargetFeatures = useMemo(() => {
    const { features, ...t } = targetFeatures;

    const enabledSubjects = subsets.flatMap((s) =>
      subsetsEnabled.includes(s.id) ? s.subjects : []
    );
    const enabledTargets = targets.filter((t) =>
      t.subjects.some((s) => enabledSubjects.includes(s))
    );

    return {
      ...t,
      features: features.filter((f) =>
        enabledTargets.find((e) => e.id === f.properties?.id)
      ),
    };
  }, [targetFeatures, targets, subsets, subsetsEnabled]);

  const handleMove = useCallback(
    (
      e?: MapMouseEvent & {
        features?: MapGeoJSONFeature[];
      }
    ) => {
      if (!map) return;

      if (hovered.current != null)
        map.setFeatureState(
          { source: source.id, id: hovered.current },
          { hover: false }
        );

      if (!e?.features || e.features.length === 0 || hintsEnabled) {
        map.getCanvas().style.cursor = "default";
        return;
      }

      hovered.current = e.features[0].id ?? null;

      if (hovered.current != null)
        map.setFeatureState(
          { source: source.id, id: hovered.current },
          { hover: true }
        );

      map.getCanvas().style.cursor =
        hovered.current != null ? "pointer" : "default";
    },
    [map, hintsEnabled]
  );

  useEffect(() => {
    if (!map) return;

    const click = map.on("click", fillLayer.id, (e) => {
      const id = e.features?.[0].properties?.id;
      if (id != null) handleGuess(id);
    });

    const move = map.on("mousemove", fillLayer.id, handleMove);

    const leave = map.on("mouseleave", fillLayer.id, () => {
      if (hovered.current != null)
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
  }, [map, handleGuess, handleMove]);

  useEffect(() => {
    handleMove();
  }, [handleMove]);

  return (
    <>
      <Source {...source} data={enabledTargetFeatures} />
      <Layer {...fillLayer} />
      <Layer {...strokeLayer} />
    </>
  );
}
