import { europeanChevrons } from "./registry";
import { clippedPatternLayer } from "../clipped-pattern";

export async function europeanChevronsLayer(output: string) {
  return clippedPatternLayer({ output, registry: europeanChevrons });
}
