"use client";

import { EuropeanBollardsControls } from "./controls";
import { CanvasMap } from "@/components/canvas/canvas-map";
import dynamic from "next/dynamic";

const Rendering = dynamic(() => import("./rendering"), {
  ssr: false,
});

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export default function EuropeanBollardsGame() {
  return (
    <div className="size-full relative">
      <EuropeanBollardsControls />

      <CanvasMap
        bounds={bounds}
        attribution={
          <>
            <a href="https://geohints.com/meta/bollards">GeoHints</a>
            <span className="mx-1">-</span>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth.
            </a>
          </>
        }
      >
        <Rendering />
      </CanvasMap>
    </div>
  );
}
