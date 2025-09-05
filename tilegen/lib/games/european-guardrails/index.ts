import { europeanGuardrails } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";
import type { QuizDefinition } from "../types";

export const europeanGuardrailsDefinition: QuizDefinition = {
  slug: "european-guardrails",
  meta: async (output: string) =>
    await Bun.write(output, generateQuizMeta({ registry: europeanGuardrails })),
  subjects: clippedPatternLayer({
    registry: europeanGuardrails,
    options: { precision: 3 },
  }),
};
