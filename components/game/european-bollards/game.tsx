"use client";

import { europeanBollards } from "@/lib/mapping/countries/registry/bollards";
import { SvgMap } from "../svg-map";
import { EuropeanBollardsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { svgBollardPatterns } from "./bollard-patterns";
import { SelectableCountries } from "../selectable-countries";
import { useHandleGroupGuess } from "../group-pin/guess";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanBollardsGame() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanBollards.highlighted,
    s.europeanBollards.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanBollards",
    targets: europeanBollards,
  });

  return (
    <div className="size-full relative">
      <EuropeanBollardsControls />

      <SvgMap
        fontSize={2}
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
        <defs>{svgBollardPatterns}</defs>
        <SelectableCountries
          items={europeanBollards}
          isHighlighted={(name) => highlighted.includes(name) || hints}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
