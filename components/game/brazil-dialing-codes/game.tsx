"use client";

import { brazilPhoneCodes } from "@/lib/mapping/brazil/paths/phone-codes";
import { SvgMap } from "../svg-map";
import { BrazilDialingCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import {
  brazilFirstAdministrativePaths,
  brazilPaths,
} from "@/lib/mapping/brazil/paths";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function BrazilDialingCodesGame() {
  const [guess, correct, { positive, negative }, hints] = useAppStore((s) => [
    s.brazilDialingCodes.guess,
    s.brazilDialingCodes.code,
    s.brazilDialingCodes.highlighted,
    s.brazilDialingCodes.hints,
  ]);

  const handleGuess = (code: number) => {
    if (hints) return;
    const isCorrect = code === correct;

    if (isCorrect) toast.success("Correct!");
    else toast.error("Incorrect!");

    guess(code);
  };

  return (
    <div className="size-full relative">
      <BrazilDialingCodesControls />

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
        attribution={
          <a href="https://data.humdata.org/dataset/cod-ab-bra" target="_blank">
            © OCHA
          </a>
        }
      >
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
                  positive !== code && negative !== code && !hints,
                "fill-chart-1/50":
                  hints && (code < 20 || (code >= 80 && code < 90)),
                "fill-chart-2/50":
                  hints &&
                  ((code >= 20 && code < 30) || (code >= 60 && code < 70)),
                "fill-chart-3/50": hints && code >= 30 && code < 40,
                "fill-chart-4/50":
                  hints && ((code >= 40 && code < 50) || code >= 90),
                "fill-chart-5/50":
                  hints &&
                  ((code >= 50 && code < 60) || (code >= 70 && code < 80)),
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
            fillOpacity={1}
            strokeWidth={0}
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none fill-foreground"
            opacity={positive === code || negative === code || hints ? 1 : 0}
          >
            {code}
          </text>
        ))}
        <g className="stroke-secondary-foreground/30 pointer-events-none">
          {brazilFirstAdministrativePaths}
        </g>
        <g className="stroke-secondary-foreground pointer-events-none">
          {brazilPaths}
        </g>
      </SvgMap>
    </div>
  );
}
