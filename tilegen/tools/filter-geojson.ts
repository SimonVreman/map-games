import { $ } from "bun";
import { Glob } from "bun";
import { layers } from "../lib/layers";
import { mapConfig } from "../lib/constants";
import { tippecanoeMeta } from "../lib/tippecanoe";

const shapeGlob = new Glob("*.shp");

async function generateGeoJSON() {
  for (const { name: layer } of layers) {
    const dir = `input/ne/${layer}`;
    const shapefile = shapeGlob.scanSync(dir).next().value;
    const outputFile = `output/${layer}.raw.geojson`;

    if (!shapefile) throw new Error(`No shapefile found for layer: ${layer}`);

    await $`ogr2ogr -f GeoJSON ${outputFile} ${dir}/${shapefile}`;
  }
}

async function filterGeoJSON() {
  for (const layer of layers) {
    const inputFile = `output/${layer.name}.raw.geojson`;
    const outputFile = `output/${layer.name}.geojson`;

    const { features, ...base } = (await Bun.file(
      inputFile
    ).json()) as GeoJSON.FeatureCollection;

    const newFeatures = [] as GeoJSON.Feature[];

    for (const { properties, ...f } of features) {
      const filtered: GeoJSON.GeoJsonProperties = {};

      for (const key in properties) {
        const lowerKey = key.toLowerCase();
        if (!layer.properties.includes(lowerKey)) continue;
        filtered[lowerKey] = properties[key];
      }

      filtered.min_zoom = Math.max(
        0,
        (filtered.min_zoom ?? 0) + (layer.zoomOffset?.min ?? 0)
      );
      filtered.max_zoom =
        (filtered.max_zoom ?? mapConfig.maxZoom) + (layer.zoomOffset?.max ?? 0);

      if (filtered.min_zoom > mapConfig.maxZoom) continue;

      newFeatures.push({
        ...f,
        properties: filtered,
        ...tippecanoeMeta({
          min_zoom: filtered.min_zoom,
          max_zoom: filtered.max_zoom,
        }),
      });
    }

    await Bun.write(
      outputFile,
      JSON.stringify({
        ...base,
        features: newFeatures,
      } satisfies GeoJSON.FeatureCollection)
    );
  }
}

async function main() {
  console.log("Generating GeoJSON from shapefiles");
  await generateGeoJSON();
  console.log("Filtering GeoJSON files");
  await filterGeoJSON();
}

main()
  .then(() => console.log("GeoJSON generation completed successfully."))
  .catch((error) => console.error("Error during GeoJSON generation:", error));
