import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "roads",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "roads",
  paint: { "line-color": "#98ABC9" },
};

export function RoadRailLayer() {
  return <Layer {...config} />;
}
