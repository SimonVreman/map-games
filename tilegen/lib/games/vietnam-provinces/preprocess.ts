import { createPreprocessor } from "../preprocessor";

export const vietnamProvincesPreprocessed = createPreprocessor({
  file: "output/vietnam-provinces-preprocessed.geojson",
  dir: import.meta.dir,
});
