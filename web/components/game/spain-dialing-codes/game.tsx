import { CanvasMap } from "@/components/canvas/canvas-map";
import { SpainDialingCodesControls } from "./controls";
import { SpainDialingCodesRendering } from "./rendering";

const bounds = {
  north: 44,
  west: -11,
  south: 35,
  east: 4,
  padding: 2,
};

export default function SpainDialingCodesGame() {
  return (
    <div className="size-full relative">
      <SpainDialingCodesControls />

      <CanvasMap
        bounds={bounds}
        attribution={
          <a
            href="https://data.humdata.org/dataset/whosonfirst-data-admin-esp"
            target="_blank"
          >
            © OCHA
          </a>
        }
      >
        <SpainDialingCodesRendering />
      </CanvasMap>
    </div>
  );
}
