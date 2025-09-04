import { createPreprocessor } from "../preprocessor";

export const usDialingCodesPreprocessed = createPreprocessor({
  file: "output/us-dialing-codes-preprocessed.geojson",
  dir: import.meta.dir,
});
