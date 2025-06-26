import {
  Layer,
  LayerSpecification,
  SymbolLayerSpecification,
} from "react-map-gl/maplibre";
import { map } from "../constants";

const baseConfig: Omit<SymbolLayerSpecification, "id"> = {
  type: "symbol",
  source: map.sources.tiles,
  "source-layer": "labels",
};

const states: LayerSpecification = {
  ...baseConfig,
  id: "state-labels",
  "source-layer": "labels",
  paint: {
    "text-halo-color": "#fff",
    "text-halo-width": 1,
    "text-color": "#666",
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

const countries: LayerSpecification = {
  ...baseConfig,
  id: "country-labels",
  paint: {
    "text-halo-color": "#fff",
    "text-halo-width": 1,
    "text-color": "#222",
  },
  layout: {
    "text-field": ["get", "name"],
    "text-font": [map.fonts.bold],
    "symbol-sort-key": ["get", "scalerank"],
    "text-size": ["step", ["zoom"], 12, 3, 14, 4, 18, 5, 20],
  },
  filter: ["==", ["get", "adm"], 0],
};

export function LabelsLayer() {
  return (
    <>
      <Layer {...states} />
      <Layer {...countries} />
    </>
  );
}
