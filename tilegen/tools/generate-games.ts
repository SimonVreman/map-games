import { games, gameTargets } from "../lib/games/games";

const geoFolder = "../web/public/assets/geo/game";
const metaFolder = "../web/lib/games/meta";

async function main() {
  const filtered = process.argv.slice(2);
  console.log("Generating assets for game(s)...");
  if (filtered.length) console.log("filtered", JSON.stringify(filtered));

  for (const {
    slug,
    targets: targetsLayer,
    subjects: subjectsLayer,
    meta,
  } of games) {
    if (filtered.length && !filtered.includes(slug)) continue;
    console.log(`Generating assets for game: ${slug}`);

    const subjects = `${geoFolder}/${slug}-subjects.geojson`;
    const targets = targetsLayer
      ? `${geoFolder}/${slug}-targets.geojson`
      : undefined;

    await subjectsLayer(subjects);
    await meta(`${metaFolder}/${slug}-meta.ts`);
    if (targetsLayer) await targetsLayer(targets!);
  }

  for (const { slug, targets } of gameTargets) {
    console.log(`Generating targets: ${slug}`);

    const output = `${geoFolder}/${slug}-targets.geojson`;
    await targets(output);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
