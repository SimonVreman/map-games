"use client";

import { europeanChevrons } from "@/lib/mapping/countries/registry/chevrons";
import { SvgMap } from "../svg-map";
import { EuropeanChevronsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgChevronPatterns } from "./chevron-patterns";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { TapTargets } from "../tap-targets";

export function EuropeanChevronsGame() {
  const [guess, pattern, highlighted, guessed, maximum, hints] = useAppStore(
    (s) => [
      s.europeanChevrons.guess,
      s.europeanChevrons.subject,
      s.europeanChevrons.highlighted,
      s.europeanChevrons.guessed,
      s.europeanChevrons.maximum,
      s.europeanChevrons.hints,
    ]
  );

  const handleGuess = (country: string) => {
    if (guessed.includes(country) || hints) return;
    const isCorrect = europeanChevrons
      .find((v) => v.name === country)
      ?.subjects.includes((pattern?.name || "") as never);

    if (isCorrect && guessed.length >= maximum - 1) toast.success("Correct!");
    else if (!isCorrect) toast.error("Incorrect!");

    guess(country);
  };

  return (
    <div className="size-full relative">
      <EuropeanChevronsControls />

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
        <defs>{svgChevronPatterns}</defs>
        <g className="stroke-secondary-foreground">
          {europeanChevrons.map(({ name, paths, subjects }) => (
            <g
              key={name}
              href={`#${name}`}
              onClick={() => handleGuess(name)}
              className={cn({
                "fill-background hover:fill-foreground":
                  !highlighted.includes(name) && !hints,
              })}
              fill={
                highlighted.includes(name) || hints
                  ? `url(#${subjects.join(",")})`
                  : "none"
              }
            >
              {paths}
            </g>
          ))}

          <TapTargets
            items={europeanChevrons}
            props={({ name, subjects }) => ({
              onClick: () => handleGuess(name),
              className: cn({
                "fill-background/30 hover:fill-foreground":
                  !highlighted.includes(name) && !hints,
              }),
              fill:
                highlighted.includes(name) || hints
                  ? `url(#${subjects.join(",")})`
                  : "none",
            })}
          />
        </g>
      </SvgMap>
    </div>
  );
}
