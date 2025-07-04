import { $ } from "bun";
import { layers } from "../lib/layers";
import { tippecanoeMeta } from "../lib/tippecanoe";
import { mapConfig } from "../lib/constants";

const stateLabelsEnabled = [
  "Brazil",
  "United States of America",
  "Canada",
  "Mexico",
  "Argentina",
  "India",
  "Australia",
  "China",
  "Thailand",
  "Indonesia",
  "Japan",
];

async function createCustomLayers() {
  // Country and state labels
  const geo: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  const countries = (await Bun.file(
    "output/countries.raw.geojson"
  ).json()) as GeoJSON.FeatureCollection;

  for (const { properties: props } of countries.features) {
    if (!props?.LABEL_X || !props.LABEL_Y || !props.NAME) continue;

    const min_zoom = (props.MIN_LABEL ?? 1) - 1;
    const max_zoom = props.MAX_LABEL ?? mapConfig.maxZoom;

    geo.features.push({
      type: "Feature",
      ...tippecanoeMeta({ min_zoom, max_zoom }),
      geometry: {
        type: "Point",
        coordinates: [props.LABEL_X, props.LABEL_Y],
      },
      properties: {
        name: props.NAME,
        min_zoom,
        max_zoom,
        scalerank: props.LABELRANK ?? 0,
        adm: 0,
      },
    });
  }

  const states = (await Bun.file(
    "output/states.raw.geojson"
  ).json()) as GeoJSON.FeatureCollection;

  for (const { properties: props } of states.features) {
    if (
      !props?.longitude ||
      !props.latitude ||
      !props.name ||
      !stateLabelsEnabled.includes(props.admin)
    )
      continue;

    const min_zoom = Math.max(0, (props.min_label ?? 0) - 2);
    const max_zoom = props.max_label ?? mapConfig.maxZoom;

    geo.features.push({
      type: "Feature",
      ...tippecanoeMeta({ min_zoom, max_zoom }),
      geometry: {
        type: "Point",
        coordinates: [props.longitude, props.latitude],
      },
      properties: {
        name: props.name.toUpperCase(),
        min_zoom,
        max_zoom,
        scalerank: props.scalerank ?? 0,
        postal: props.postal ?? null,
        adm: 1,
      },
    });
  }

  await Bun.write("output/labels.geojson", JSON.stringify(geo));
}

async function generateTiles() {
  const layerArgs = layers
    .filter((l) => l.includeTiles !== false)
    .map(({ name: layer }) => `-L ${layer}:output/${layer}.geojson`)
    .join(" ");

  const maxZoom = 6;

  await $`tippecanoe \
    -o output/world.mbtiles \
    -Z0 -z${maxZoom} --force \
    --drop-densest-as-needed \
    --coalesce-smallest-as-needed \
    --simplify-only-low-zooms \
    ${{ raw: layerArgs }}`;
}

async function extractTiles() {
  await $`tile-join -f -e output/tiles output/world.mbtiles`;
}

async function main() {
  console.log("Creating custom layers");
  await createCustomLayers();
  console.log("Generating tiles from GeoJSON");
  await generateTiles();
  console.log("Extracting tiles from MBTiles");
  await extractTiles();
}

main()
  .then(() => console.log("Tile generation completed successfully."))
  .catch((error) => console.error("Error during tile generation:", error));
