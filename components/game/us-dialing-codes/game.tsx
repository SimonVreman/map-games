"use client";

import { USDialingCodesControls } from "./controls";
import { CanvasMap } from "../../canvas/canvas-map";
import dynamic from "next/dynamic";

const USDialingCodesRendering = dynamic(() => import("./rendering"), {
  ssr: false,
});

const bounds = {
  north: 53,
  south: 10,
  east: -67,
  west: -125,
  padding: 2,
};

export function USDialingCodesGame() {
  return (
    <div className="size-full relative">
      <USDialingCodesControls />

      <CanvasMap
        bounds={bounds}
        attribution={
          <>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth
            </a>
            <span className="mx-1">-</span>
            <span>
              Sources: Esri; TomTom North America, Inc.; Pitney Bowes Software
              Inc.; iconectiv
            </span>
          </>
        }
      >
        <USDialingCodesRendering />
      </CanvasMap>
    </div>
  );
}
