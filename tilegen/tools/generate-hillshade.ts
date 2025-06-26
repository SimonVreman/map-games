import { $ } from "bun";

async function generateHillshade() {
  const inputFile = "input/hillshade/SR_HR.tif";
  const outputDir = "output/hillshade";

  await $`gdal2tiles -z 0-6 -w none ${inputFile} ${outputDir}`;
}

async function main() {
  console.log("Generating hillshade tiles...");
  await generateHillshade();
}

main()
  .then(() => console.log("Hillshade tiles generated successfully."))
  .catch((error) => console.error("Error generating hillshade tiles:", error));
