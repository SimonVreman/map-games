import { $ } from "bun";
import { Glob } from "bun";

type Layer = {
  name: string;
  properties: string[];
  zoomOffset?: { min?: number; max?: number };
};

const layers: Layer[] = [
  { name: "land", properties: ["min_zoom"] },
  { name: "country-boundaries", properties: ["min_zoom"] },
  { name: "lakes", properties: ["min_zoom"] },
  {
    name: "places",
    properties: ["min_zoom", "name", "scalerank", "adm0cap"],
    zoomOffset: { min: -1 },
  },
  { name: "railroads", properties: ["min_zoom", "scalerank"] },
  { name: "rivers", properties: ["min_zoom"] },
  { name: "roads", properties: ["min_zoom", "scalerank", "name"] },
  {
    name: "state-boundaries",
    properties: ["min_zoom"],
    zoomOffset: { min: -2 },
  },
  { name: "geo-lines", properties: ["name"] },
];

const computedLayers: Layer[] = [{ name: "labels", properties: [] }];

const maxMapZoom = 6;
const shapeGlob = new Glob("*.shp");
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

function tippecanoeMeta({
  min_zoom = 0,
  max_zoom = maxMapZoom,
}: {
  min_zoom: any;
  max_zoom: any;
}) {
  return {
    tippecanoe: {
      minzoom: Math.floor(min_zoom),
      maxzoom: Math.ceil(max_zoom),
    },
  };
}

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
        (filtered.max_zoom ?? maxMapZoom) + (layer.zoomOffset?.max ?? 0);

      if (filtered.min_zoom > maxMapZoom) continue;

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
    const max_zoom = props.MAX_LABEL ?? maxMapZoom;

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
    const max_zoom = props.max_label ?? maxMapZoom;

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
  const layerArgs = [...layers, ...computedLayers]
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
  console.log("Starting tile generation");
  console.log("Generating GeoJSON from shapefiles");
  await generateGeoJSON();
  console.log("Filtering GeoJSON files");
  await filterGeoJSON();
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
