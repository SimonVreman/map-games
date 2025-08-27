import { europeanPedestrians } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";
import { generateQuizMeta } from "../generate-meta";

export async function europeanPedestriansLayer(output: string) {
  await clippedPatternLayer({
    output,
    registry: europeanPedestrians,
    options: { precision: 3 },
  });
}

export async function europeanPedestriansMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: europeanPedestrians }));
}
