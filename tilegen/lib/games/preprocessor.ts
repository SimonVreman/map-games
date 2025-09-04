import { $ } from "bun";

export function createPreprocessor({
  file,
  dir,
}: {
  file: string;
  dir: string;
}) {
  let preprocessPromise: Promise<void> | null = null;

  async function preprocessor() {
    await $`python ${{ raw: dir }}/preprocess.py ${file}`;
  }

  async function preprocessed() {
    await (preprocessPromise ?? (preprocessPromise = preprocessor()));
    return (await Bun.file(file).json()) as GeoJSON.FeatureCollection;
  }

  return preprocessed;
}
