import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const countries: LayerSpecification = {
  type: "symbol",
  source: map.sources.tiles,
  "source-layer": "labels",
  id: "country-labels",
  paint: {
    "text-halo-color": map.colors.text.halo,
    "text-halo-width": 1,
    "text-color": map.colors.text.primary,
  },
  layout: {
    "text-field": ["get", "name"],
    "text-font": [map.fonts.bold],
    "symbol-sort-key": ["get", "scalerank"],
    "text-size": ["step", ["zoom"], 12, 3, 14, 4, 18, 5, 20],
  },
  filter: ["==", ["get", "adm"], 0],
};

export function CountriesLayer() {
  return <Layer {...countries} />;
}
