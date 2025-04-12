"use client";

import { SvgMap } from "../svg-map";
import { BrazilPath } from "./brazil";
import { BrazilTelephoneCodesControls } from "./controls";

export function BrazilTelephoneCodesGame() {
  return (
    <div className="size-full relative">
      <BrazilTelephoneCodesControls />

      <SvgMap
        className="pt-24"
        bounds={{
          north: 5,
          south: -34,
          east: -35,
          west: -74,
          padding: 2,
        }}
      >
        <BrazilPath />
      </SvgMap>
    </div>
  );
}
