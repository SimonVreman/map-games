import { unstable_cacheLife } from "next/cache";
import { normalize } from "../utils";

const apiUrl = "http://api.geonames.org";

export type City = {
  name: string;
  normalizedName: string;
  lat: number;
  lng: number;
  population: number;
};

export async function getCities({
  minimumPopulation,
}: {
  minimumPopulation: number;
}) {
  "use cache";
  unstable_cacheLife("geonames");

  const cities: City[] = [];
  const maxRows = 1000;
  let startRow = 0;

  while (true) {
    const data = await fetchCities({ startRow, maxRows });

    if (data.length === 0) break;

    for (const city of data)
      if (city.population < minimumPopulation) return cities;
      else cities.push(city);

    startRow += maxRows;
  }

  return cities;
}

async function fetchCities({
  startRow,
  maxRows,
}: {
  startRow: number;
  maxRows: number;
}): Promise<City[]> {
  const url = new URL(`${apiUrl}/searchJSON`);

  url.search = new URLSearchParams({
    username: process.env.GEONAMES_USERNAME!,
    cities: "cities15000",
    orderby: "population",
    maxRows: maxRows.toString(),
    startRow: startRow.toString(),
  }).toString();

  const response = await fetch(url.toString());

  if (!response.ok)
    throw new Error(
      "Failed to fetch cities (" +
        response.statusText +
        "): " +
        (await response.text())
    );

  const data = await response.json();

  if (!data.geonames)
    throw new Error("Invalid fetch cities response: " + JSON.stringify(data));

  return data.geonames.map((city: City & unknown) => ({
    name: city.name,
    normalizedName: normalize(city.name),
    lat: +city.lat,
    lng: +city.lng,
    population: +city.population,
  }));
}
