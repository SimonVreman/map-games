import { games, gameTargets } from "../lib/games/games";

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
    const targets = layers.targets
      ? `${geoFolder}/${id}-targets.geojson`
      : undefined;

    await layers.subjects(subjects);
    await meta(`${metaFolder}/${id}-meta.ts`);
    if (layers.targets) await layers.targets(targets!);
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
