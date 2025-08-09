import { $ } from "bun";
import { mapConfig } from "../lib/constants";
import { games } from "../lib/games/games";

async function generateVectorTiles({
  targets,
  labels,
  output,
}: {
  targets: string;
  labels?: string;
  output: string;
}) {
  const tmpMbtiles = "output/_tmp-game-tiles.mbtiles";

  await $`tippecanoe \
    -o ${tmpMbtiles} \
    -Z0 -z${mapConfig.maxZoom} --force \
    --preserve-input-order \
    --drop-densest-as-needed \
    --coalesce-smallest-as-needed \
    --simplify-only-low-zooms \
    -L targets:${targets} ${{ raw: labels ? `-L labels:${labels}` : "" }}`;

  await $`tile-join -f -e ${output} ${tmpMbtiles}`;

  await $`rm ${tmpMbtiles}`;
}

async function main() {
  console.log("Generating vector tiles for game(s)...");

  for (const { id, layers } of games) {
    console.log(`Generating tiles for game: ${id}`);
    const output = `${mapConfig.tileDir}/${id}`;
    const targets = `output/games/${id}-targets.geojson`;
    const labels = layers.labels
      ? `output/games/${id}-labels.geojson`
      : undefined;

    await layers.targets(targets);
    if (layers.labels) await layers.labels(labels!);

    await generateVectorTiles({ targets, labels, output });
  }
}

main()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
