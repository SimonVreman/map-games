"use client";

import { europeanGuardrails } from "@/lib/mapping/countries/guardrails";
import { SvgMap } from "../svg-map";
import { EuropeanGuardrailsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgGuardrailPatterns } from "./guardrail-patterns";

export function EuropeanGuardrailsGame() {
  const [guess, pattern, highlighted, guessed, maximum, hints] = useAppStore(
    (s) => [
      s.europeanGuardrails.guess,
      s.europeanGuardrails.subject,
      s.europeanGuardrails.highlighted,
      s.europeanGuardrails.guessed,
      s.europeanGuardrails.maximum,
      s.europeanGuardrails.hints,
    ]
  );

  const handleGuess = (country: string) => {
    if (guessed.includes(country) || hints) return;
    const isCorrect = europeanGuardrails
      .find((v) => v.name === country)
      ?.subjects.includes((pattern?.name || "") as never);

    if (isCorrect && guessed.length >= maximum - 1) toast.success("Correct!");
    else if (!isCorrect) toast.error("Incorrect!");

    guess(country);
  };

  return (
    <div className="size-full relative">
      <EuropeanGuardrailsControls />

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
        <defs>{svgGuardrailPatterns}</defs>
        <g className="stroke-secondary-foreground">
          {europeanGuardrails.map(({ name, paths }) => (
            <g
              key={name}
              className="transition-all fill-background hover:fill-foreground"
              onClick={() => handleGuess(name)}
            >
              {paths}
            </g>
          ))}
          {europeanGuardrails.map(({ name, paths, subjects }) => (
            <g
              key={name}
              className="transition-all pointer-events-none"
              fill={`url(#${subjects.join(",")})`}
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
