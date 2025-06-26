import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "countries",
  type: "fill",
  source: map.sources.tiles,
  "source-layer": "countries",
  paint: { "fill-color": "#C5EBD9" },
  // filter: [
  //   "in",
  //   ["get", "name"],
  //   ["literal", europeanBollards.entries.map((e) => e.name)],
  // ],
};

export function CountriesLayer() {
  return <Layer {...config} />;
}
