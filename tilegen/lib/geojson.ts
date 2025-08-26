function roundCoord(v: number, precision: number) {
  return v.toFixed ? Number(v.toFixed(precision)) : v;
}

function roundCoordsDeeply(coords: any[], precision: number): any[] {
  return coords.map((coord) =>
    Array.isArray(coord)
      ? roundCoordsDeeply(coord, precision)
      : roundCoord(coord, precision)
  );
}

export function stringifyGeoJSON({
  geojson,
  precision,
}: {
  geojson: GeoJSON.FeatureCollection | GeoJSON.Geometry;
  precision: number;
}) {
  return JSON.stringify(geojson, (key, value) => {
    if (key !== "coordinates" || !Array.isArray(value)) return value;
    return roundCoordsDeeply(value, precision);
  });
}
