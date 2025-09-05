import { generateQuizMeta } from "../generate-meta";
import { mapColors } from "../colors";
import { brazilDialingCodesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";
import { brazilDialingCodesRegistry } from "./registry";

export const brazilDialingCodesDefinition: QuizDefinition = {
  slug: "brazil-dialing-codes",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({
        registry: await brazilDialingCodesRegistry(),
      })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await brazilDialingCodesRegistry(),
    collection: await brazilDialingCodesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await brazilDialingCodesRegistry(),
    collection: await brazilDialingCodesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3 },
  })),
};
