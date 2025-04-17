"use client";

import { europeanPedestrians } from "@/lib/mapping/countries/registry/pedestrians";
import { SvgMap } from "../svg-map";
import { EuropeanPedestriansControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgPedestrianPatterns } from "./pedestrian-patterns";
import { SelectableCountries } from "../selectable-countries";

export function EuropeanPedestriansGame() {
  const [guess, pattern, highlighted, guessed, maximum, hints] = useAppStore(
    (s) => [
      s.europeanPedestrians.guess,
      s.europeanPedestrians.subject,
      s.europeanPedestrians.highlighted,
      s.europeanPedestrians.guessed,
      s.europeanPedestrians.maximum,
      s.europeanPedestrians.hints,
    ]
  );

  const handleGuess = (country: string) => {
    if (guessed.includes(country) || hints) return;
    const isCorrect = europeanPedestrians
      .find((v) => v.name === country)
      ?.subjects.includes((pattern?.name || "") as never);

    if (isCorrect && guessed.length >= maximum - 1) toast.success("Correct!");
    else if (!isCorrect) toast.error("Incorrect!");

    guess(country);
  };

  return (
    <div className="size-full relative">
      <EuropeanPedestriansControls />

      <SvgMap
        fontSize={2}
        bounds={{
          north: 71,
          west: -25,
          south: 34,
          east: 38,
          padding: 2,
        }}
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
