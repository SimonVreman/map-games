import { generateQuizMeta } from "../generate-meta";
import { usDialingCodesRegistry } from "./registry";
import { mapColors } from "../colors";
import { usDialingCodesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";

export const usDialingCodesDefinition: QuizDefinition = {
  slug: "us-dialing-codes",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: await usDialingCodesRegistry() })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await usDialingCodesRegistry(),
    collection: await usDialingCodesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await usDialingCodesRegistry(),
    collection: await usDialingCodesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3 },
  })),
};
