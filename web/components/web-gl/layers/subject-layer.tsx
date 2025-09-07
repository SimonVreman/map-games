import { FeatureCollection } from "geojson";
import {
  FillLayerSpecification,
  GeoJSONSourceSpecification,
  Layer,
  Source,
  SymbolLayerSpecification,
} from "react-map-gl/maplibre";
import { map } from "../constants";
import { isFeatureHinted } from "../hint-handler";
import { useLayerGroups } from "../web-gl-map";
import { useMemo } from "react";
import { QuizSubject, QuizSubset } from "@/types/registry";
import { useQuizStore } from "@/lib/store/quiz-provider";

const source: Omit<GeoJSONSourceSpecification, "data"> & { id: string } = {
  id: "subjects",
  type: "geojson",
};

const fillLayer: FillLayerSpecification = {
  id: "subjects-fill",
  type: "fill",
  source: source.id,
  paint: { "fill-color": ["get", "fill"], "fill-outline-color": "#00000000" },
  filter: ["all", ["has", "fill"], isFeatureHinted("target")],
};

const symbolLayer: SymbolLayerSpecification = {
  id: "subjects-symbol",
  type: "symbol",
  source: source.id,
  paint: {
    "text-color": map.colors.text.primary,
    "text-halo-color": map.colors.text.halo,
    "text-halo-width": 1,
  },
  layout: {
    "text-field": ["get", "label"],
    "text-font": ["literal", [map.fonts.regular]],
    "text-size": ["literal", 14],
  },
  filter: ["all", ["has", "label"], isFeatureHinted("target")],
};

export function SubjectLayer({
  subjectFeatures,
  subsets,
  subjects,
}: {
  subjectFeatures: FeatureCollection;
  subsets: QuizSubset[];
  subjects: Record<string, QuizSubject>;
}) {
  const { layerGroups } = useLayerGroups();
  const [subsetsEnabled] = useQuizStore((s) => [s.subsetsEnabled]);

  const enabledSubjectFeatures = useMemo(() => {
    const { features, ...t } = subjectFeatures;

    const enabledSubjects = subsets.flatMap((s) =>
      subsetsEnabled.includes(s.id) ? s.subjects : []
    );

    // Lonely subjects (not in any subset) are always enabled
    enabledSubjects.push(
      ...Object.keys(subjects).filter(
        (s) => !subsets.some((ss) => ss.subjects.includes(s))
      )
    );

    return {
      ...t,
      features: features.filter((f) =>
        enabledSubjects.some((e) => f.properties?.subjects?.includes(e))
      ),
    };
  }, [subjectFeatures, subsets, subsetsEnabled, subjects]);

  return (
    <>
      <Source {...source} data={enabledSubjectFeatures} />
      <Layer {...fillLayer} />

      <Layer beforeId={layerGroups.top} {...symbolLayer} />
    </>
  );
}
