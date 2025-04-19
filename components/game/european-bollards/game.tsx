"use client";

import { europeanBollards } from "@/lib/mapping/countries/registry/bollards";
import { scalingForBounds, SvgMap } from "../svg-map";
import { EuropeanBollardsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgBollardPatterns } from "./bollard-patterns";
import { SelectableCountries } from "../selectable-countries";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanBollardsGame() {
  const [guess, pattern, highlighted, guessed, maximum, hints] = useAppStore(
    (s) => [
      s.europeanBollards.guess,
      s.europeanBollards.subject,
      s.europeanBollards.highlighted,
      s.europeanBollards.guessed,
      s.europeanBollards.maximum,
      s.europeanBollards.hints,
    ]
  );

  const handleGuess = (country: string) => {
    if (guessed.includes(country) || hints) return;
    const isCorrect = europeanBollards
      .find((v) => v.name === country)
      ?.subjects.includes((pattern?.name || "") as never);

    if (isCorrect && guessed.length >= maximum - 1) toast.success("Correct!");
    else if (!isCorrect) toast.error("Incorrect!");

    guess(country);
  };

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
          scaling={scalingForBounds(bounds)}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
