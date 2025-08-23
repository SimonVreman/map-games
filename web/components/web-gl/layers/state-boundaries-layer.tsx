import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "state-boundaries",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "state-boundaries",
  paint: { "line-color": map.colors.boundary.state, "line-dasharray": [2, 2] },
};

export function StateBoundariesLayer() {
  return <Layer {...config} />;
}
