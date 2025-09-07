import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const states: LayerSpecification = {
  id: "state-labels",
  type: "symbol",
  source: map.sources.tiles,
  "source-layer": "labels",
  paint: {
    "text-halo-color": map.colors.text.halo,
    "text-halo-width": 1,
    "text-color": map.colors.text.secondary,
  },
  layout: {
    "text-field": [
      "step",
      ["zoom"],
      [
        "case",
        ["to-boolean", ["get", "postal"]],
        ["get", "postal"],
        ["get", "name"],
      ],
      4,
      ["get", "name"],
    ],
    "text-font": [map.fonts.bold],
    "symbol-sort-key": ["+", ["get", "scalerank"], 200],
    "text-size": ["step", ["zoom"], 10, 4, 12, 5, 14],
  },
  filter: ["==", ["get", "adm"], 1],
};

export function StatesLayer() {
  return <Layer {...states} />;
}
