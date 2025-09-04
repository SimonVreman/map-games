// @ts-expect-error
process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE = 1e10;
process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS;
import clipping from "polygon-clipping";
import type { QuizRegistry } from "./types";
import { stringifyGeoJSON } from "../geojson";
import { projectToMercator, unprojectFromMercator } from "./projection";
import { createTapAreaGeometries, hasTapArea } from "./tap-area";
import type { Svg } from "../svg-geojson/types";
import { parseSvg } from "../svg-geojson/parse";

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
  options,
}: {
  output: string;
  registry: QuizRegistry;
  options: { precision: number };
}) {
  if (!size) throw new Error("pattern size required to clip");

  const { features: rawCountries } = (await Bun.file(
    "output/countries.geojson"
  ).json()) as GeoJSON.FeatureCollection;
  const countries = createTapAreaGeometries({ countries: rawCountries });

  const collection: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  // Sort by countries to retain tap areas on top
  const sortedTargets = targets.toSorted((a, b) =>
    hasTapArea(a.id) === hasTapArea(b.id) ? 0 : hasTapArea(a.id) ? 1 : -1
  );

  for (const { id, subjects, ...target } of sortedTargets) {
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

    const subjectSvgs = new Map<string, Svg>();
    subjects.forEach((s) =>
      "svg" in s ? subjectSvgs.set(s.id, parseSvg(s.svg)) : null
    );

    let i = 0;

    for (let y = transform.oy * offsetY; y < maxY; y += offsetY) {
      const subject = subjects[i];
      const svg = subjectSvgs.get(subject.id);
      if (!svg) throw new Error(`Subject pattern for ${subject} not found`);

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
            id: `${id}-${subject.id}-${i}`,
            subject: subject.id,
            target: id,
            fill: subjectSvgs.get(subject.id)?.[i]?.fill ?? undefined,
          },
        });
      }
    }
  }

  await Bun.write(
    output,
    stringifyGeoJSON({ geojson: collection, precision: options.precision })
  );
}
