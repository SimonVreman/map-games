import { europeanPedestrians } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";

export async function europeanPedestriansLayer(output: string) {
  return clippedPatternLayer({
    output,
    registry: europeanPedestrians,
    options: { precision: 3 },
  });
}
