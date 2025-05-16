"use client";

import { USDialingCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { useHandleSingleGuess } from "../single-pin/guess";
import { CanvasMap } from "../canvas-map";

const bounds = {
  north: 51,
  south: 10,
  east: -67,
  west: -129,
  padding: 2,
};

export function USDialingCodesGame() {
  const [highlighted, hints] = useAppStore((s) => [
    s.usDialingCodes.highlighted,
    s.usDialingCodes.hints,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "usDialingCodes",
  });

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
      ></CanvasMap>
    </div>
  );
}
