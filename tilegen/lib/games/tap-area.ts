import { findGeometryCenter } from "../geojson";
import { projectToMercator, unprojectFromMercator } from "./projection";
import polygon, { type Geom } from "polygon-clipping";

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

export function mergeWithTapArea({
  geometry,
  center,
  tapAreaSize = 2,
}: {
  geometry: GeoJSON.Geometry;
  center: number[];
  tapAreaSize?: number;
}): GeoJSON.Geometry {
  const type = geometry.type;

  const circle = createCircle(center, tapAreaSize);

  if (type !== "Polygon" && type !== "MultiPolygon")
    return { type: "Polygon", coordinates: [circle] };

  return {
    type: "MultiPolygon",
    coordinates: polygon.union(
      [circle] as Geom,
      type === "Polygon"
        ? ([geometry.coordinates] as Geom)
        : type === "MultiPolygon"
        ? (geometry.coordinates as Geom)
        : ([] as Geom)
    ),
  };
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
