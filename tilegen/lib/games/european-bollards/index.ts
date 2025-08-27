import { europeanBollards } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";

export async function europeanBollardsLayer(output: string) {
  await clippedPatternLayer({
    output,
    registry: europeanBollards,
    options: { precision: 3 },
  });
}

export async function europeanBollardsMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: europeanBollards }));
}
