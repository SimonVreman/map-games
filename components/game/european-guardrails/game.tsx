"use client";

import { europeanGuardrails } from "@/lib/mapping/countries/registry/guardrails";
import { SvgMap } from "../svg-map";
import { EuropeanGuardrailsControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { svgGuardrailPatterns } from "./guardrail-patterns";
import { cn } from "@/lib/utils";

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
            <span>Keaton</span>
            <span className="mx-1">-</span>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth.
            </a>
          </>
        }
      >
        <defs>
          {svgGuardrailPatterns}
          {europeanGuardrails.map(({ name, paths }) => (
            <g id={name} key={name}>
              {paths}
            </g>
          ))}
        </defs>
        <g className="stroke-secondary-foreground">
          {europeanGuardrails.map(({ name, subjects }) => (
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
