import { cache } from "react";

export const fetchGeoAsset = cache(
  async (name: string) =>
    await fetch(`/assets/geo/game/${name}.geojson`).then(
      async (r) => (await r.json()) as GeoJSON.FeatureCollection
    )
);
