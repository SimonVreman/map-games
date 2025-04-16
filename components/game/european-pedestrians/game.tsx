"use client";

import { europeanPedestrians } from "@/lib/mapping/countries/registry/pedestrians";
import { SvgMap } from "../svg-map";
import { EuropeanPedestriansControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgPedestrianPatterns } from "./pedestrian-patterns";
import { cn } from "@/lib/utils";

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
        <defs>
          {svgPedestrianPatterns}
          {europeanPedestrians.map(({ name, paths }) => (
            <g id={name} key={name}>
              {paths}
            </g>
          ))}
        </defs>
        <g className="stroke-secondary-foreground">
          {europeanPedestrians.map(({ name, subjects }) => (
            <use
              key={name}
              href={`#${name}`}
              className={cn({
                "fill-background hover:fill-primary": !(
                  highlighted.includes(name) || hints
                ),
              })}
              fill={
                highlighted.includes(name) || hints
                  ? `url(#${subjects.join(",")})`
                  : undefined
              }
              onClick={() => handleGuess(name)}
            />
          ))}
        </g>
      </SvgMap>
    </div>
  );
}
