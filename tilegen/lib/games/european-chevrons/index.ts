import { europeanChevrons } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";

export async function europeanChevronsLayer(output: string) {
  await clippedPatternLayer({
    output,
    registry: europeanChevrons,
    options: { precision: 3 },
  });
}

export async function europeanChevronsMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: europeanChevrons }));
}
