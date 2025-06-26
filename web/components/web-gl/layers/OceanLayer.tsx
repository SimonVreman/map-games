import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const config: LayerSpecification = {
  id: "ocean",
  type: "background",
  paint: {
    "background-color": map.colors.water,
  },
};

export function OceanLayer() {
  return <Layer {...config} />;
}
