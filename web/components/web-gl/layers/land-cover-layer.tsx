import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "landcover",
  type: "fill",
  source: map.sources.landcover,
  "source-layer": "landcover",
  paint: {
    "fill-color": [
      "case",
      // Shrubland
      ["==", ["get", "type"], 20],
      map.colors.land.shrubland,
      // Herbaceous vegetation
      ["==", ["get", "type"], 30],
      map.colors.land.herbaceous,
      // Cultivated and managed vegetation/agriculture
      ["==", ["get", "type"], 40],
      map.colors.land.agriculture,
      // Urban and built-up
      ["==", ["get", "type"], 50],
      map.colors.land.urban,
      // Bare areas
      ["==", ["get", "type"], 60],
      map.colors.land.bare,
      // Snow and ice
      ["==", ["get", "type"], 70],
      map.colors.land.snow,
      // Permanent water bodies
      ["==", ["get", "type"], 80],
      map.colors.water,
      // Wetlands
      ["==", ["get", "type"], 90],
      map.colors.land.wetlands,
      // Moss and lichen
      ["==", ["get", "type"], 100],
      map.colors.land.moss,
      // Closed forest
      ["in", ["get", "type"], ["literal", [111, 113]]],
      map.colors.land.forest.closed.needle,
      ["in", ["get", "type"], ["literal", [112, 114]]],
      map.colors.land.forest.closed.broadleaf,
      ["in", ["get", "type"], ["literal", [115, 116]]],
      map.colors.land.forest.closed.mixed,
      // Open forest
      ["in", ["get", "type"], ["literal", [121, 123]]],
      map.colors.land.forest.open.needle,
      ["in", ["get", "type"], ["literal", [122, 124]]],
      map.colors.land.forest.open.broadleaf,
      ["in", ["get", "type"], ["literal", [125, 126]]],
      map.colors.land.forest.open.mixed,
      // Fallback
      "#00000000",
    ],
  },
};

export function LandCoverLayer() {
  return <Layer {...config} />;
}
