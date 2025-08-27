import { stringifyGeoJSON } from "../../geojson";
import { createTapAreaGeometries, hasTapArea } from "../tap-area";

const countryList = [
  "France",
  "Belgium",
  "Germany",
  "Italy",
  "Spain",
  "Portugal",
  "Netherlands",
  "Luxembourg",
  "Ireland",
  "United Kingdom",
  "Switzerland",
  "Austria",
  "Denmark",
  "Finland",
  "Norway",
  "Sweden",
  "Iceland",
  "Czechia",
  "Slovakia",
  "Hungary",
  "Poland",
  "Romania",
  "Bulgaria",
  "Croatia",
  "Serbia",
  "Bosnia and Herz.",
  "Montenegro",
  "North Macedonia",
  "Albania",
  "Greece",
  "Turkey",
  "Cyprus",
  "Malta",
  "Monaco",
  "San Marino",
  "Andorra",
  "Liechtenstein",
  "Slovenia",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Belarus",
  "Ukraine",
  "Russia",
  "Kosovo",
  "Moldova",
];

export async function europeanCountriesLayer(output: string) {
  const { features } = (await Bun.file(
    "output/countries.geojson"
  ).json()) as GeoJSON.FeatureCollection;

  const countries = createTapAreaGeometries({ countries: features });

  const collection: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  countries.forEach(({ geometry, properties, type }, i) => {
    if (!countryList.includes(properties?.name)) return;

    const newProperties: Record<string, any> = { name: properties?.name };
    if (hasTapArea(properties?.name)) newProperties.tiny = true;

    collection.features.push({
      id: i,
      type,
      properties: newProperties,
      geometry,
    });
  });

  await Bun.write(
    output,
    stringifyGeoJSON({ geojson: collection, precision: 3 })
  );
}
