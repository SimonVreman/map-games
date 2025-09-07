import { generateQuizMeta } from "../generate-meta";
import { indiaStatesRegistry } from "./registry";
import { mapColors } from "../colors";
import { indiaStatesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";

export const indiaStatesDefinition: QuizDefinition = {
  slug: "india-states",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: await indiaStatesRegistry() })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await indiaStatesRegistry(),
    collection: await indiaStatesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await indiaStatesRegistry(),
    collection: await indiaStatesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3, tapAreaSize: 1.3 },
  })),
};
