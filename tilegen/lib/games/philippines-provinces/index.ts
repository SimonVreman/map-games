import { generateQuizMeta } from "../generate-meta";
import { philippinesProvincesRegistry } from "./registry";
import { mapColors } from "../colors";
import { philippinesProvincesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";

export const philippinesProvincesDefinition: QuizDefinition = {
  slug: "philippines-provinces",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: await philippinesProvincesRegistry() })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await philippinesProvincesRegistry(),
    collection: await philippinesProvincesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await philippinesProvincesRegistry(),
    collection: await philippinesProvincesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3 },
  })),
};
