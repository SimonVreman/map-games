"use client";

import { brazilPhoneCodes } from "@/lib/mapping/brazil/paths/phone-codes";
import { SvgMap } from "../svg-map";
import { BrazilTelephoneCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { brazilFirstAdministrativePaths } from "@/lib/mapping/brazil/paths";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function BrazilTelephoneCodesGame() {
  const [guess, correct, { positive, negative }] = useAppStore((s) => [
    s.brazilTelephoneCodes.guess,
    s.brazilTelephoneCodes.code,
    s.brazilTelephoneCodes.highlighted,
  ]);

  const handleGuess = (code: number) => {
    const isCorrect = code === correct;

    if (isCorrect) toast.success("Correct!");
    else toast.error("Incorrect!");

    guess(code);
  };

  return (
    <div className="size-full relative">
      <BrazilTelephoneCodesControls />

      <SvgMap
        className="pt-24"
        fontSize={2}
        bounds={{
          north: 5,
          south: -34,
          east: -35,
          west: -74,
          padding: 2,
        }}
      >
        <g>
          {brazilPhoneCodes.map(({ code, paths }) => (
            <g
              key={code}
              onClick={() => handleGuess(code)}
              className={cn(
                "fill-background stroke-foreground/10 transition-colors",
                {
                  "fill-green-500/20 stroke-green-500/30": positive === code,
                  "fill-red-500/20 stroke-red-500/30": negative === code,
                  "hover:fill-secondary-foreground":
                    positive !== code && negative !== code,
                }
              )}
            >
              {paths}
            </g>
          ))}
          {brazilPhoneCodes.map(({ code, center }) => (
            <text
              key={code}
              x={center[0]}
              y={center[1]}
              z={100}
              fill="black"
              fillOpacity={1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none"
              opacity={positive === code || negative === code ? 1 : 0}
            >
              {code}
            </text>
          ))}
        </g>
        <g className="stroke-secondary-foreground/30 pointer-events-none">
          {brazilFirstAdministrativePaths}
        </g>
      </SvgMap>
    </div>
  );
}
