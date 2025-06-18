import { EuropeanPedestriansControls } from "./controls";
import { CanvasMap } from "@/components/canvas/canvas-map";
import { EuropeanPedestriansRendering } from "./rendering";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanPedestriansGame() {
  return (
    <div className="size-full relative">
      <EuropeanPedestriansControls />

      <CanvasMap
        bounds={bounds}
        attribution={
          <>
            <a href="https://geohints.com/meta/signs/chevrons">GeoHints</a>
            <span className="mx-1">-</span>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth.
            </a>
          </>
        }
      >
        <EuropeanPedestriansRendering />
      </CanvasMap>
    </div>
  );
}
