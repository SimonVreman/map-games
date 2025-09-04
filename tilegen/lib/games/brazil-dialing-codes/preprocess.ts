import { createPreprocessor } from "../preprocessor";

export const brazilDialingCodesPreprocessed = createPreprocessor({
  file: "output/brazil-dialing-codes-preprocessed.geojson",
  dir: import.meta.dir,
});
