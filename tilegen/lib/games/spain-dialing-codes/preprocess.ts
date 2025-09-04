import { createPreprocessor } from "../preprocessor";

export const spainDialingCodesPreprocessed = createPreprocessor({
  file: "output/spain-dialing-codes-preprocessed.geojson",
  dir: import.meta.dir,
});
