import { generateQuizMeta } from "../generate-meta";
import { usDialingCodes } from "./registry";
import { mapColors } from "../colors";
import { usDialingCodesPreprocessed } from "./preprocess";
import {
  dialingCodesSubjectsLayer,
  dialingCodesTargetsLayer,
} from "../dialing-codes";

const colors = mapColors.sweet;

export async function usDialingCodesTargetsLayer(output: string) {
  await dialingCodesTargetsLayer({
    output,
    registry: usDialingCodes,
    collection: await usDialingCodesPreprocessed(),
    options: { colors, precision: 3 },
  });
}

export async function usDialingCodesSubjectsLayer(output: string) {
  await dialingCodesSubjectsLayer({
    output,
    registry: usDialingCodes,
    collection: await usDialingCodesPreprocessed(),
    options: { precision: 3 },
  });
}

export async function usDialingCodesMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: usDialingCodes }));
}
