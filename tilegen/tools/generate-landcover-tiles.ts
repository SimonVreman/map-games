import { $ } from "bun";
import { mapConfig } from "../lib/constants";

// Sizes must be odd numbers
const rasterSimplifications = [
  { suffix: "highres", size: 25, minZoom: 5, maxZoom: mapConfig.maxZoom },
  { suffix: "midres", size: 51, minZoom: 3, maxZoom: 4 },
  { suffix: "lowres", size: 101, minZoom: 0, maxZoom: 2 },
];

async function warpRaster() {
  const inputFile =
    "input/landcover/PROBAV_LC100_global_v3.0.1_2019-nrt_Discrete-Classification-map_EPSG-4326.tif";
  const outputFile = `output/landcover-base.tif`;

  await $`rm -f ${outputFile} && gdalwarp -tr 0.01 0.01 -r mode ${inputFile} ${outputFile}`;
}

async function simplifyRaster() {
  const inputFile = "output/landcover-base.tif";
  const outputPrefix = `output/landcover`;
  const project = `/tmp/grassdata/${new Date().getTime()}_polygonize`;

  await $`grass -c ${inputFile} ${project} -e`;

  const rasterIn = "base";

  await $`grass ${project}/PERMANENT --exec \
      r.in.gdal input=${inputFile} output=${rasterIn} --overwrite`;

  await $`grass ${project}/PERMANENT --exec \
    r.null map=${rasterIn} setnull=200`;

  for (const { suffix, size } of rasterSimplifications) {
    const rasterOut = `${rasterIn}_${suffix}`;
    const outputFile = `${outputPrefix}-${suffix}.tif`;

    await $`grass ${project}/PERMANENT --exec \
      r.neighbors input=${rasterIn} selection=${rasterIn} output=${rasterOut} size=${size} method=mode --overwrite`;

    await $`grass ${project}/PERMANENT --exec \
        r.out.gdal input=${rasterOut} output=${outputFile} --overwrite`;
  }
}

async function generateGeoJSON() {
  for (const { suffix } of rasterSimplifications) {
    const inputFile = `output/landcover-${suffix}.tif`;
    const outputFile = `output/landcover-${suffix}.geojson`;

    await $`gdal_polygonize ${inputFile} -overwrite -f "GeoJSON" ${outputFile} landcover type`;
  }
}

async function generateTiles() {
  let files = "";

  for (const { suffix, minZoom, maxZoom } of rasterSimplifications) {
    const outputFile = `${mapConfig.tileDir}/landcover-${suffix}.mbtiles`;
    await $`tippecanoe \
      -o ${outputFile} \
      -Z${minZoom} -z${maxZoom} --force \
      --coalesce-smallest-as-needed \
      --simplification=15 \
      -L landcover:output/landcover-${suffix}.geojson`;

    files += `${outputFile} `;
  }

  await $`tile-join -f -e ${mapConfig.tileDir}/landcover ${{
    raw: files.trim(),
  }}`;
}

async function main() {
  // console.log("Warping land cover raster");
  // await warpRaster();
  // console.log("Simplifying land cover raster");
  // await simplifyRaster();
  // console.log("Generating GeoJSON from land cover raster");
  // await generateGeoJSON();
  console.log("Generating tiles from land cover GeoJSON");
  await generateTiles();
}

main()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
