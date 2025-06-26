import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const countries: LayerSpecification = {
  id: "country-boundaries",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "country-boundaries",
  paint: { "line-color": "#222", "line-width": 0.8 },
};

const states: LayerSpecification = {
  id: "state-boundaries",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "state-boundaries",
  paint: { "line-color": "#999", "line-dasharray": [2, 2] },
};

export function BoundariesLayer() {
  return (
    <>
      <Layer {...countries} />
      <Layer {...states} />
    </>
  );
}
