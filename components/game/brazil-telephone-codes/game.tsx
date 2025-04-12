"use client";

import { brazilPhoneCodes } from "@/lib/mapping/paths/brazil";
import { SvgMap } from "../svg-map";
import { BrazilTelephoneCodesControls } from "./controls";
import { Fragment } from "react";

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
        <image
          opacity={0.2}
          href="/img/brazil-phone-codes.png"
          x={295}
          y={485}
          width={109}
          height={114.5}
          preserveAspectRatio="none"
        />

        <g stroke="red" fillOpacity={0.2} fill="red">
          {brazilPhoneCodes.map(({ code, paths }) => (
            <Fragment key={code}>{paths}</Fragment>
          ))}
        </g>
      </SvgMap>
    </div>
  );
}
