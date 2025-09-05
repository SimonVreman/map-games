import { europeanPedestrians } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";
import type { QuizDefinition } from "../types";

export const europeanPedestriansDefinition: QuizDefinition = {
  slug: "european-pedestrians",
  meta: async (output: string) =>
    await Bun.write(
      output,
      generateQuizMeta({ registry: europeanPedestrians })
    ),
  subjects: clippedPatternLayer({
    registry: europeanPedestrians,
    options: { precision: 3 },
  }),
};
