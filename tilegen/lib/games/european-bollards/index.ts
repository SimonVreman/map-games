import { europeanBollards } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";
import type { QuizDefinition } from "../types";

export const europeanBollardsDefinition: QuizDefinition = {
  slug: "european-bollards",
  meta: async (output: string) =>
    await Bun.write(output, generateQuizMeta({ registry: europeanBollards })),
  subjects: clippedPatternLayer({
    registry: europeanBollards,
    options: { precision: 3 },
  }),
};
