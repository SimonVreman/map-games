import { createPreprocessor } from "../preprocessor";

export const thailandProvincesPreprocessed = createPreprocessor({
  file: "output/thailand-provinces-preprocessed.geojson",
  dir: import.meta.dir,
});
