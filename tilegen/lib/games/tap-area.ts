import { findGeometryCenter } from "../geojson";
import { projectToMercator, unprojectFromMercator } from "./projection";

const tapAreas: { name: string; tiny?: boolean }[] = [
  { name: "Malta" },
  { name: "Monaco" },
  { name: "San Marino" },
  { name: "Andorra" },
  { name: "Liechtenstein" },
];

export function hasTapArea(name: string) {
  return tapAreas.some((c) => c.name === name);
}

export function createTapAreaGeometries({
  countries,
}: {
  countries: GeoJSON.Feature[];
}) {
  const result: GeoJSON.Feature[] = [];
  const resultTiny: GeoJSON.Feature[] = [];

  for (const country of countries) {
    if (!hasTapArea(country.properties?.name)) result.push(country);
    else
      resultTiny.push({
        ...country,
        geometry: {
          type: "Polygon",
          coordinates: [createCircle(findGeometryCenter(country.geometry), 2)],
        },
      });
  }

  return [...result, ...resultTiny];
}

function createCircle(center: number[], radius: number, points = 39) {
  const coords: number[][] = [];

  const [x, y] = projectToMercator(center[0], center[1]);

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    coords.push(
      unprojectFromMercator(
        x + (Math.cos(angle) * radius) / 1e3,
        y + (Math.sin(angle) * radius) / 1e3
      )
    );
  }

  coords.push(coords[0]);

  return coords;
}
