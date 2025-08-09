import clipping from "polygon-clipping";
import type { QuizRegistry, VectorQuizSubject } from "./types";

// This code was migrated from a WebGL-based implementation, adding some utilities back here
// https://github.com/maplibre/maplibre-gl-js/blob/main/src/geo/mercator_coordinate.ts
const mercatorXfromLng = (lng: number) => (180 + lng) / 360;
const mercatorYfromLat = (lat: number) =>
  (180 -
    (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))) /
  360;
const lngFromMercatorX = (x: number) => x * 360 - 180;
const latFromMercatorY = (y: number) =>
  (360 / Math.PI) * Math.atan(Math.exp(((180 - y * 360) * Math.PI) / 180)) - 90;

const projectToMercator = (lng: number, lat: number) => [
  mercatorXfromLng(lng),
  mercatorYfromLat(lat),
];

const unprojectFromMercator = (x: number, y: number) => [
  lngFromMercatorX(x),
  latFromMercatorY(y),
];

function mapGeometry(g: GeoJSON.Geometry) {
  if (g.type !== "Polygon" && g.type !== "MultiPolygon")
    throw new Error("Unsupported geometry type");

  const polygons = g.type === "Polygon" ? [g.coordinates] : g.coordinates;

  const mapped = polygons.map((p) => [
    p[0].map(([lng, lat]) => projectToMercator(lng, lat)),
  ]) as clipping.MultiPolygon;

  const first = mapped[0][0][0];
  const bounds = {
    top: first[1],
    left: first[0],
    bottom: first[1],
    right: first[0],
  };

  for (const [exterior] of mapped)
    for (const [x, y] of exterior) {
      bounds.top = Math.min(bounds.top, y);
      bounds.left = Math.min(bounds.left, x);
      bounds.bottom = Math.max(bounds.bottom, y);
      bounds.right = Math.max(bounds.right, x);
    }

  return { polygon: mapped, bounds };
}

export async function clippedPatternLayer({
  output,
  registry: { targets, size },
}: {
  output: string;
  registry: QuizRegistry;
}) {
  const { features: countries } = (await Bun.file(
    "output/countries.geojson"
  ).json()) as GeoJSON.FeatureCollection;

  const collection: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  for (const { id, subjects, ...target } of targets) {
    const country = countries.find((c) => c.properties?.name === id);
    if (!country) continue;

    const transform = {
      scale: (target.transform?.scale ?? 1) / 3,
      ox: (target.transform?.ox ?? 1) - 1,
      oy: (target.transform?.oy ?? 1) - 1,
    };
    const mappedCountry = mapGeometry(country.geometry);
    const topLeft = [mappedCountry.bounds.left, mappedCountry.bounds.top];
    const bottomRight = [
      mappedCountry.bounds.right,
      mappedCountry.bounds.bottom,
    ];
    const scale =
      ((bottomRight[0] - topLeft[0]) / size.width) * (transform?.scale ?? 1);

    const multiPolygons = {} as Record<string, clipping.MultiPolygon[]>;
    const offsetX = size.width * scale;
    const offsetY = size.height * scale;
    const maxX = bottomRight[0] - topLeft[0];
    const maxY = bottomRight[1] - topLeft[1];

    let i = 0;

    for (let y = transform.oy * offsetY; y < maxY; y += offsetY) {
      const subject = subjects[i];
      if (!("svg" in subject))
        throw new Error(`Subject pattern for ${subject} not found`);

      const svg = subject.svg;
      multiPolygons[subject.id] ??= [];

      for (let x = transform.ox * offsetX; x < maxX; x += offsetX)
        for (let pathIndex = 0; pathIndex < svg.length; pathIndex++) {
          multiPolygons[subject.id][pathIndex] ??= [];
          multiPolygons[subject.id][pathIndex].push([
            svg[pathIndex].coords.map((c) => [
              c[0] * scale + topLeft[0] + x,
              c[1] * scale + topLeft[1] + y,
            ]),
          ] as clipping.Polygon);
        }

      i = (i + 1) % subjects.length;
    }

    for (const subject of subjects) {
      for (let i = 0; i < (multiPolygons[subject.id]?.length ?? 0); i++) {
        const polygons = multiPolygons[subject.id][i];
        const clipped = clipping.intersection(mappedCountry.polygon, polygons);
        if (clipped.length === 0) continue;

        const unprojected = clipped.map((p) =>
          p.map((r) => r.map(([x, y]) => unprojectFromMercator(x, y)))
        );

        collection.features.push({
          type: "Feature",
          geometry: { type: "MultiPolygon", coordinates: unprojected },
          properties: {
            id: `${id}-${subject}-${i}`,
            subject: subject.id,
            target: id,
            fill: "svg" in subject ? subject.svg.fill : undefined,
          },
        });
      }
    }
  }

  await Bun.write(output, JSON.stringify(collection));
}
