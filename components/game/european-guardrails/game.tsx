"use client";

import { europeanGuardrails } from "@/lib/mapping/countries/registry/guardrails";
import { SvgMap } from "../svg-map";
import { EuropeanGuardrailsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { svgGuardrailPatterns } from "./guardrail-patterns";
import { SelectableCountries } from "../selectable-countries";
import { useHandleGroupGuess } from "../group-pin/guess";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanGuardrailsGame() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanGuardrails.highlighted,
    s.europeanGuardrails.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanGuardrails",
    targets: europeanGuardrails,
  });

  return (
    <div className="size-full relative">
      <EuropeanGuardrailsControls />

      <SvgMap
        fontSize={2}
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
        <defs>{svgGuardrailPatterns}</defs>
        <SelectableCountries
          items={europeanGuardrails}
          isHighlighted={(name) => highlighted.includes(name) || hints}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
