import { AppStore } from "@/lib/store";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { FeatureCollection } from "geojson";
import {
  FillLayerSpecification,
  Layer,
  Source,
  SymbolLayerSpecification,
} from "react-map-gl/maplibre";
import { map } from "../constants";
import { isFeatureHinted } from "../hint-handler";
import { useLayerGroups } from "../web-gl-map";
import { useMemo } from "react";
import { QuizSubject, QuizSubset } from "@/types/registry";
import { useAppStore } from "@/lib/store/provider";

const fillLayer: Omit<FillLayerSpecification, "id" | "source"> = {
  type: "fill",
  paint: { "fill-color": ["get", "fill"], "fill-outline-color": "#00000000" },
  filter: ["all", ["has", "fill"], isFeatureHinted("target")],
};

const symbolLayer: Omit<SymbolLayerSpecification, "id" | "source"> = {
  type: "symbol",
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
  filter: ["all", ["has", "label"], isFeatureHinted("label")],
};

export function SubjectLayer<TName extends QuizSliceName<AppStore>>({
  store,
  subjectFeatures,
  subsets,
  subjects,
}: {
  store: TName;
  subjectFeatures: FeatureCollection;
  subsets: QuizSubset[];
  subjects: Record<string, QuizSubject>;
}) {
  const { layerGroups } = useLayerGroups();
  const [subsetsEnabled] = useAppStore((s) => [s[store].subsetsEnabled]);

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
      <Source id={store} type="geojson" data={enabledSubjectFeatures} />
      <Layer id={store + "-fill"} source={store} {...fillLayer} />

      <Layer
        id={store + "-symbol"}
        source={store}
        beforeId={layerGroups.top}
        {...symbolLayer}
      />
    </>
  );
}
