import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "land",
  type: "fill",
  source: map.sources.tiles,
  "source-layer": "land",
  paint: { "fill-color": map.colors.land },
};

export function LandLayer() {
  return <Layer {...config} />;
}
