import { createPreprocessor } from "../preprocessor";

export const indiaStatesPreprocessed = createPreprocessor({
  file: "output/india-states-preprocessed.geojson",
  dir: import.meta.dir,
});
