import { generateQuizMeta } from "../generate-meta";
import { thailandProvincesRegistry } from "./registry";
import { mapColors } from "../colors";
import { thailandProvincesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";

export const thailandProvincesDefinition: QuizDefinition = {
  slug: "thailand-provinces",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: await thailandProvincesRegistry() })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await thailandProvincesRegistry(),
    collection: await thailandProvincesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await thailandProvincesRegistry(),
    collection: await thailandProvincesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3, tapAreaSize: 1.3 },
  })),
};
