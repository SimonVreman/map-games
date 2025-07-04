import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "geo-lines",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "geo-lines",
  maxzoom: 5,
  paint: { "line-color": "#777", "line-dasharray": [6, 3] },
  filter: [
    "in",
    ["get", "name"],
    ["literal", ["Equator", "International Date Line"]],
  ],
};

export function GeoLinesLayer() {
  return <Layer {...config} />;
}
