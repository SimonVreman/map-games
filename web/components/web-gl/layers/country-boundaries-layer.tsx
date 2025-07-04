import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "country-boundaries",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "country-boundaries",
  paint: { "line-color": "#222", "line-width": 0.8 },
};

export function CountryBoundariesLayer() {
  return <Layer {...config} />;
}
