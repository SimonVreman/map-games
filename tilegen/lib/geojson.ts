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

export function findGeometryCenter(geometery: GeoJSON.Geometry) {
  let minLng = 0;
  let maxLng = 0;
  let minLat = 0;
  let maxLat = 0;

  const polygons =
    geometery.type === "Polygon"
      ? [geometery.coordinates]
      : geometery.type === "MultiPolygon"
      ? geometery.coordinates
      : [];

  for (const polygon of polygons) {
    for (const ring of polygon) {
      for (const [lng, lat] of ring) {
        if (minLng === 0 || lng < minLng) minLng = lng;
        if (maxLng === 0 || lng > maxLng) maxLng = lng;
        if (minLat === 0 || lat < minLat) minLat = lat;
        if (maxLat === 0 || lat > maxLat) maxLat = lat;
      }
    }
  }

  return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
}
