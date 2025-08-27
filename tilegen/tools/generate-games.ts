import { $ } from "bun";
import { mapConfig } from "../lib/constants";
import { games, gameTargets } from "../lib/games/games";

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

const geoFolder = "../web/public/assets/geo/game";
const metaFolder = "../web/lib/games/meta";

async function main() {
  const filtered = process.argv.slice(2);
  console.log("Generating assets for game(s)...");
  if (filtered.length) console.log("filtered", JSON.stringify(filtered));

  for (const { id, layers, meta } of games) {
    if (filtered.length && !filtered.includes(id)) continue;
    console.log(`Generating assets for game: ${id}`);

    const subjects = `${geoFolder}/${id}-subjects.geojson`;
    const labels = layers.labels
      ? `${geoFolder}/${id}-labels.geojson`
      : undefined;

    await layers.subjects(subjects);
    if (layers.labels) await layers.labels(labels!);
    if (meta) await meta(`${metaFolder}/${id}-meta.ts`);
  }

  for (const { id, targets } of gameTargets) {
    console.log(`Generating targets: ${id}`);

    const output = `${geoFolder}/${id}-targets.geojson`;
    await targets(output);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
