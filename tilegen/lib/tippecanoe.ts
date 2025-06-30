import { mapConfig } from "./constants";

export function tippecanoeMeta({
  min_zoom = 0,
  max_zoom = mapConfig.maxZoom,
}: {
  min_zoom: any;
  max_zoom: any;
}) {
  return {
    tippecanoe: {
      minzoom: Math.floor(min_zoom),
      maxzoom: Math.ceil(max_zoom),
    },
  };
}
