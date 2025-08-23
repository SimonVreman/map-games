import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const mediumScale = 4;

const config: LayerSpecification = {
  id: "place-labels",
  type: "symbol",
  source: map.sources.tiles,
  "source-layer": "places",
  minzoom: 3,
  paint: {
    "text-color": map.colors.text.primary,
    "text-halo-color": map.colors.text.halo,
    "text-halo-width": 0.5,
  },
  layout: {
    "symbol-sort-key": ["+", ["get", "scalerank"], 100],
    "text-field": ["get", "name"],
    "text-font": [
      "case",
      [
        "any",
        ["<=", ["get", "scalerank"], mediumScale],
        ["==", ["get", "adm0cap"], 1],
      ],
      ["literal", [map.fonts.bold]],
      ["literal", [map.fonts.regular]],
    ],
    "text-size": [
      "step",
      ["zoom"],
      12,
      4,
      [
        "case",
        ["==", ["get", "adm0cap"], 1],
        16,
        ["<=", ["get", "scalerank"], mediumScale],
        14,
        12,
      ],
    ],
    "text-anchor": "left",
    "text-offset": [3 / 4, 0],
    "icon-image": [
      "case",
      ["==", ["get", "adm0cap"], 1],
      map.icons.placeMajor,
      map.icons.placeMinor,
    ],
  },
};

export function PlacesLayer() {
  return <Layer {...config} />;
}
