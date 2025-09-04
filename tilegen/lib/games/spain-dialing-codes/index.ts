import { $ } from "bun";
import { generateQuizMeta } from "../generate-meta";
import { spainDialingCodes } from "./registry";
import { stringifyGeoJSON } from "../../geojson";
import type { LabelQuizSubject } from "../types";
import { mapColors } from "../colors";

const colors = mapColors.sweet;
const preprocessedFile = "output/spain-dialing-codes-preprocessed.geojson";
let preprocessPromise: Promise<void> | null = null;

async function preprocessor() {
  const dir = import.meta.dir;

  await $`python ${{
    raw: dir,
  }}/preprocess.py ${preprocessedFile}`;
}

async function preprocessed() {
  await (preprocessPromise ?? (preprocessPromise = preprocessor()));
  return (await Bun.file(preprocessedFile).json()) as GeoJSON.FeatureCollection;
}

export async function spainDialingCodesTargetsLayer(output: string) {
  const codes = (await preprocessed()).features;

  const features: GeoJSON.Feature[] = spainDialingCodes.targets.map((t, i) => {
    const code = codes.find((c) => c.properties!.id === t.id)!;

    return {
      id: i,
      type: "Feature",
      properties: {
        id: t.id,
        color:
          colors[
            spainDialingCodes.subsets.findIndex((s) =>
              s.subjects.includes(t.subjects[0].id)
            ) % colors.length
          ].light,
      },
      geometry: code.geometry,
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

export async function spainDialingCodesSubjectsLayer(output: string) {
  const codes = (await preprocessed()).features;

  let i = 0;
  const features: GeoJSON.Feature[] = spainDialingCodes.targets.flatMap((t) =>
    t.subjects.map((s) => {
      const code = codes.find((c) => c.properties!.id === s.id)!;

      return {
        id: i++,
        type: "Feature",
        properties: {
          id: s.id,
          label: (s as LabelQuizSubject).label,
          subject: s.id,
          target: t.id,
        },
        geometry: {
          type: "Point",
          coordinates: [
            code.properties!.center_lng,
            code.properties!.center_lat,
          ],
        },
      };
    })
  );

  await Bun.write(
    output,
    stringifyGeoJSON({
      geojson: { type: "FeatureCollection", features },
      precision: 3,
    })
  );
}

export async function spainDialingCodesMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: spainDialingCodes }));
}
