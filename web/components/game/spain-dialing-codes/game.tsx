"use client";

import { CanvasMap } from "@/components/canvas/canvas-map";
import { SpainDialingCodesControls } from "./controls";
import dynamic from "next/dynamic";

const Rendering = dynamic(() => import("./rendering"), {
  ssr: false,
});

const bounds = {
  north: 44,
  west: -11,
  south: 35,
  east: 4,
  padding: 2,
};

export function SpainDialingCodesGame() {
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
        <Rendering />
      </CanvasMap>
    </div>
  );
}
