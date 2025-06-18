import { CanvasMap } from "@/components/canvas/canvas-map";
import { BrazilDialingCodesControls } from "./controls";
import { BrazilDialingCodesRendering } from "./rendering";

const bounds = {
  north: 9,
  south: -34,
  east: -35,
  west: -74,
  padding: 2,
};

export default function BrazilDialingCodesGame() {
  return (
    <div className="size-full relative">
      <BrazilDialingCodesControls />

      <CanvasMap
        bounds={bounds}
        attribution={
          <a href="https://data.humdata.org/dataset/cod-ab-bra" target="_blank">
            © OCHA
          </a>
        }
      >
        <BrazilDialingCodesRendering />
      </CanvasMap>
    </div>
  );
}
