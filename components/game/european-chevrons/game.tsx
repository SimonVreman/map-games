"use client";

import { europeanChevrons } from "@/lib/mapping/countries/chevrons";
import { SvgMap } from "../svg-map";
import { EuropeanChevronsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgChevronPatterns } from "./chevron-patterns";

export function EuropeanChevronsGame() {
  const [guess, pattern, highlighted, guessed, maximum, hints] = useAppStore(
    (s) => [
      s.europeanChevrons.guess,
      s.europeanChevrons.pattern,
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
      ?.colors.includes((pattern?.name || "") as never);

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
            <a href="https://www.reddit.com/user/isaacSW/">
              Mapped by u/isaacSW
            </a>
            <span className="mx-1">-</span>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth.
            </a>
          </>
        }
      >
        <defs>{svgChevronPatterns}</defs>
        <g className="stroke-secondary-foreground">
          {europeanChevrons.map(({ name, paths }) => (
            <g
              key={name}
              className="transition-all fill-background hover:fill-foreground"
              onClick={() => handleGuess(name)}
            >
              {paths}
            </g>
          ))}
          {europeanChevrons.map(({ name, paths, colors }) => (
            <g
              key={name}
              className="transition-all pointer-events-none"
              fill={`url(#${colors.join(",")})`}
              fillOpacity={highlighted.includes(name) || hints ? 1 : 0}
              stroke="transpararent"
            >
              {paths}
            </g>
          ))}
        </g>
      </SvgMap>
    </div>
  );
}
