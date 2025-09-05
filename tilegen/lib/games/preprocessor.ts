import { $ } from "bun";
import { memoize } from "./memoize";

export function createPreprocessor({
  file,
  dir,
}: {
  file: string;
  dir: string;
}) {
  return memoize(async () => {
    await $`python ${{ raw: dir }}/preprocess.py ${file}`;
    return (await Bun.file(file).json()) as GeoJSON.FeatureCollection;
  });
}
