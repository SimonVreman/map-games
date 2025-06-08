"use client";

import dynamic from "next/dynamic";
import { EuropeanGuardrailsControls } from "./controls";
import { CanvasMap } from "@/components/canvas/canvas-map";

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

export default function EuropeanGuardrailsGame() {
  return (
    <div className="size-full relative">
      <EuropeanGuardrailsControls />

      <CanvasMap
        bounds={bounds}
        attribution={
          <>
            <span>Keaton</span>
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
