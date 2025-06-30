const included = [
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
  "Republic of Serbia",
  "Bosnia and Herzegovina",
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

async function filterGeoJSON() {
  const inputFile = "output/countries.geojson";
  const outputFile = "../web/public/assets/geo/european-countries.geojson";

  const { features, ...base } = (await Bun.file(
    inputFile
  ).json()) as GeoJSON.FeatureCollection;

  await Bun.write(
    outputFile,
    JSON.stringify({
      ...base,
      features: features.filter((f) =>
        included.includes(f.properties?.name ?? "never")
      ),
    } satisfies GeoJSON.FeatureCollection)
  );
}

async function main() {
  console.log("Generating GeoJSON (europe) for game...");
  await filterGeoJSON();
}

main()
  .then(() => console.log("Game GeoJSON generation complete"))
  .catch((error) => console.error("Error generating game GeoJSON:", error));
