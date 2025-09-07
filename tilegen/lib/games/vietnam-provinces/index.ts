import { generateQuizMeta } from "../generate-meta";
import { vietnamProvincesRegistry } from "./registry";
import { mapColors } from "../colors";
import { vietnamProvincesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";

export const vietnamProvincesDefinition: QuizDefinition = {
  slug: "vietnam-provinces",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: await vietnamProvincesRegistry() })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await vietnamProvincesRegistry(),
    collection: await vietnamProvincesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await vietnamProvincesRegistry(),
    collection: await vietnamProvincesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3, tapAreaSize: 1.3 },
  })),
};
