import { generateQuizMeta } from "../generate-meta";
import { spainDialingCodes } from "./registry";
import { mapColors } from "../colors";
import { spainDialingCodesPreprocessed } from "./preprocess";
import {
  dialingCodesSubjectsLayer,
  dialingCodesTargetsLayer,
} from "../dialing-codes";

const colors = mapColors.sweet;

export async function spainDialingCodesTargetsLayer(output: string) {
  await dialingCodesTargetsLayer({
    output,
    registry: spainDialingCodes,
    collection: await spainDialingCodesPreprocessed(),
    options: { colors, precision: 3 },
  });
}

export async function spainDialingCodesSubjectsLayer(output: string) {
  await dialingCodesSubjectsLayer({
    output,
    registry: spainDialingCodes,
    collection: await spainDialingCodesPreprocessed(),
    options: { precision: 3 },
  });
}

export async function spainDialingCodesMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: spainDialingCodes }));
}
