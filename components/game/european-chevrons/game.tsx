"use client";

import { europeanChevrons } from "@/lib/mapping/countries/registry/chevrons";
import { scalingForBounds, SvgMap } from "../svg-map";
import { EuropeanChevronsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { svgChevronPatterns } from "./chevron-patterns";
import { SelectableCountries } from "../selectable-countries";
import { useHandleGroupGuess } from "../group-pin/guess";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanChevronsGame() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanChevrons.highlighted,
    s.europeanChevrons.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanChevrons",
    targets: europeanChevrons,
  });

  return (
    <div className="size-full relative">
      <EuropeanChevronsControls />

      <SvgMap
        fontSize={2}
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
        <defs>{svgChevronPatterns}</defs>
        <SelectableCountries
          items={europeanChevrons}
          isHighlighted={(name) => highlighted.includes(name) || hints}
          scaling={scalingForBounds(bounds)}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
