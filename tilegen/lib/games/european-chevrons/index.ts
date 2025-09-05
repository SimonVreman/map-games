import { europeanChevrons } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";
import type { QuizDefinition } from "../types";

export const europeanChevronsDefinition: QuizDefinition = {
  slug: "european-chevrons",
  meta: async (output: string) =>
    await Bun.write(output, generateQuizMeta({ registry: europeanChevrons })),
  subjects: clippedPatternLayer({
    registry: europeanChevrons,
    options: { precision: 3 },
  }),
};
