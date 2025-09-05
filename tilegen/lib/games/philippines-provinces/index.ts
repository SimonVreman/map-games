import { generateQuizMeta } from "../generate-meta";
import { philippinesProvinces } from "./registry";
import { mapColors } from "../colors";
import { philippinesProvincesPreprocessed } from "./preprocess";
import {
  dialingCodesSubjectsLayer,
  dialingCodesTargetsLayer,
} from "../dialing-codes";

const colors = mapColors.sweet;

export async function philippinesProvincesTargetsLayer(output: string) {
  await dialingCodesTargetsLayer({
    output,
    registry: philippinesProvinces,
    collection: await philippinesProvincesPreprocessed(),
    options: { colors, precision: 3 },
  });
}

export async function philippinesProvincesSubjectsLayer(output: string) {
  await dialingCodesSubjectsLayer({
    output,
    registry: philippinesProvinces,
    collection: await philippinesProvincesPreprocessed(),
    options: { precision: 3 },
  });
}

export async function philippinesProvincesMeta(output: string) {
  await Bun.write(output, generateQuizMeta({ registry: philippinesProvinces }));
}
