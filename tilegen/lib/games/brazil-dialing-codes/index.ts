import { generateQuizMeta } from "../generate-meta";
import { brazilDialingCodes } from "./registry";
import { mapColors } from "../colors";
import { brazilDialingCodesPreprocessed } from "./preprocess";
import {
  dialingCodesSubjectsLayer,
  dialingCodesTargetsLayer,
} from "../dialing-codes";

const colors = mapColors.sweet;

export async function brazilDialingCodesTargetsLayer(output: string) {
  await dialingCodesTargetsLayer({
    output,
    registry: brazilDialingCodes,
    collection: await brazilDialingCodesPreprocessed(),
    options: { colors, precision: 3 },
  });
}

export async function brazilDialingCodesSubjectsLayer(output: string) {
  await dialingCodesSubjectsLayer({
    output,
    registry: brazilDialingCodes,
    collection: await brazilDialingCodesPreprocessed(),
    options: { precision: 3 },
  });
}

export async function brazilDialingCodesMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: brazilDialingCodes }));
}
