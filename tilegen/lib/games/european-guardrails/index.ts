import { europeanGuardrails } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";

export async function europeanGuardrailsLayer(output: string) {
  await clippedPatternLayer({
    output,
    registry: europeanGuardrails,
    options: { precision: 3 },
  });
}

export async function europeanGuardrailsMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: europeanGuardrails }));
}
