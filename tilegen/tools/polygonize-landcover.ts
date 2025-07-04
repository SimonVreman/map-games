import { $ } from "bun";

async function generateGeoJSON() {
  const inputFile = "input/landcover/LCFM_LCM-10_V100_2020_N48E018_MAP.tif";
  const outputFile = `output/landcover.raw.geojson`;

  await $`gdal_polygonize ${inputFile} -overwrite -f "GeoJSON" ${outputFile} landcover type`;
}

async function simplifyGeoJSON() {
  const inputFile = `output/landcover.raw.geojson`;
  const outputFile = `output/landcover.geojson`;

  await $`mapshaper-xl ${inputFile} -simplify 20% -o precision=0.000001 ${outputFile}`;
}

async function main() {
  console.log("Generating GeoJSON from land cover raster");
  await generateGeoJSON();
  console.log("Simplifying GeoJSON");
  await simplifyGeoJSON();
}

main()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
