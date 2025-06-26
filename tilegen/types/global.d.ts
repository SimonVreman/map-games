declare module "geojson" {
  export namespace GeoJSON {
    export type Feature = GeoJSON.Feature & {
      tippecanoe?: {
        minzoom?: number;
        maxzoom?: number;
      };
    };
  }
}
