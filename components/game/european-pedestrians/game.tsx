"use client";

import { europeanPedestrians } from "@/lib/mapping/countries/registry/pedestrians";
import { SvgMap } from "../svg-map";
import { EuropeanPedestriansControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { svgPedestrianPatterns } from "./pedestrian-patterns";
import { SelectableCountries } from "../selectable-countries";
import { useHandleGroupGuess } from "../group-pin/guess";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanPedestriansGame() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanPedestrians.highlighted,
    s.europeanPedestrians.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanPedestrians",
    targets: europeanPedestrians,
  });

  return (
    <div className="size-full relative">
      <EuropeanPedestriansControls />

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
        <defs>{svgPedestrianPatterns}</defs>
        <SelectableCountries
          items={europeanPedestrians}
          isHighlighted={(name) => highlighted.includes(name) || hints}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
