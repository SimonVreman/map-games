import { stringifyGeoJSON } from "../geojson";
import type { MapColorSet } from "./colors";
import type { LabelQuizSubject, QuizRegistry, QuizTarget } from "./types";

export function dialingCodeRegistryBase({
  collection,
}: {
  collection: GeoJSON.FeatureCollection;
}) {
  const subjects: LabelQuizSubject[] = collection.features
    .flatMap((f) => {
      const ids = f.properties!.id.split("/") as string[];
      const labels = (f.properties!.label ?? f.properties!.id).split(
        "/"
      ) as string[];

      return ids.map((s, i) => ({
        id: s,
        label: labels[i],
      }));
    })
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

  const targets: QuizTarget[] = collection.features.map((f) => ({
    id: f.properties!.id as string,
    label: (f.properties!.label ?? f.properties!.id) as string,
    subjects: f
      .properties!.id.split("/")
      .map(
        (s: string) => subjects.find((sub) => sub.id === s)! as LabelQuizSubject
      ),
  }));

  return { subjects, targets };
}

export async function dialingCodesTargetsLayer({
  output,
  registry,
  collection,
  options,
}: {
  output: string;
  registry: QuizRegistry;
  collection: GeoJSON.FeatureCollection;
  options: { colors: MapColorSet; precision: number };
}) {
  const targetFeatures = collection.features;

  const features: GeoJSON.Feature[] = registry.targets.map((t, i) => {
    const targetFeature = targetFeatures.find(
      (c) => c.properties!.id === t.id
    )!;

    const subsetIdx = registry.subsets!.findIndex((s) =>
      s.subjects.includes(t.subjects[0].id)
    );

    if (subsetIdx === -1)
      throw new Error("Target not in any subset:" + JSON.stringify(t));

    return {
      id: i,
      type: "Feature",
      properties: {
        id: t.id,
        color: options.colors[subsetIdx % options.colors.length].light,
      },
      geometry: targetFeature.geometry,
    };
  });

  await Bun.write(
    output,
    stringifyGeoJSON({
      geojson: { type: "FeatureCollection", features },
      precision: 3,
    })
  );
}

export async function dialingCodesSubjectsLayer({
  output,
  registry,
  collection,
  options,
}: {
  output: string;
  registry: QuizRegistry;
  collection: GeoJSON.FeatureCollection;
  options: { precision: number };
}) {
  const targetFeatures = collection.features;

  const features: GeoJSON.Feature[] = registry.targets.flatMap((t, i) => {
    const targetFeature = targetFeatures.find(
      (c) => c.properties!.id === t.id
    )!;

    return {
      id: i,
      type: "Feature",
      properties: {
        id: `${t.id}-${t.subjects.map((s) => s.id).join("-")}`,
        label: t.label,
        subjects: t.subjects.map((s) => s.id),
        target: t.id,
      },
      geometry: {
        type: "Point",
        coordinates: [
          targetFeature.properties!.center_lng,
          targetFeature.properties!.center_lat,
        ],
      },
    };
  });

  await Bun.write(
    output,
    stringifyGeoJSON({
      geojson: { type: "FeatureCollection", features },
      precision: options.precision,
    })
  );
}
