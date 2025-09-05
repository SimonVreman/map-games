import { createPreprocessor } from "../preprocessor";

export const philippinesProvincesPreprocessed = createPreprocessor({
  file: "output/philippines-provinces-preprocessed.geojson",
  dir: import.meta.dir,
});
