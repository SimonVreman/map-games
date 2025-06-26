import { Layer, LayerSpecification } from "react-map-gl/maplibre";
import { map } from "../constants";

const lakes: LayerSpecification = {
  id: "lakes",
  type: "fill",
  source: map.sources.tiles,
  "source-layer": "lakes",
  paint: { "fill-color": map.colors.water },
};

const rivers: LayerSpecification = {
  id: "rivers",
  type: "line",
  source: map.sources.tiles,
  "source-layer": "rivers",
  paint: { "line-color": map.colors.water },
};

export function RiverLakeLayer() {
  return (
    <>
      <Layer {...lakes} />
      <Layer {...rivers} />
    </>
  );
}
