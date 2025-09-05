import { generateQuizMeta } from "../generate-meta";
import { spainDialingCodesRegistry } from "./registry";
import { mapColors } from "../colors";
import { spainDialingCodesPreprocessed } from "./preprocess";
import { labelQuizSubjectsLayer, labelQuizTargetsLayer } from "../label-quiz";
import type { QuizDefinition } from "../types";

export const spainDialingCodesDefinition: QuizDefinition = {
  slug: "spain-dialing-codes",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: await spainDialingCodesRegistry() })
    ),
  subjects: labelQuizSubjectsLayer(async () => ({
    registry: await spainDialingCodesRegistry(),
    collection: await spainDialingCodesPreprocessed(),
    options: { precision: 3 },
  })),
  targets: labelQuizTargetsLayer(async () => ({
    registry: await spainDialingCodesRegistry(),
    collection: await spainDialingCodesPreprocessed(),
    options: { colors: mapColors.sweet, precision: 3 },
  })),
};
