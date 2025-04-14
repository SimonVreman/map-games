"use client";

import { spainPhoneCodes } from "@/lib/mapping/spain/paths/phone-codes";
import { SvgMap } from "../svg-map";
import { SpainTelephoneCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SpainTelephoneCodesGame() {
  const [guess, correct, { positive, negative }, hints] = useAppStore((s) => [
    s.spainTelephoneCodes.guess,
    s.spainTelephoneCodes.code,
    s.spainTelephoneCodes.highlighted,
    s.spainTelephoneCodes.hints,
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
      <SpainTelephoneCodesControls />

      <SvgMap
        className="pt-24"
        fontSize={2}
        bounds={{
          north: 44,
          west: -10,
          south: 35,
          east: 4,
          padding: 2,
        }}
        attribution={
          <a
            href="https://data.humdata.org/dataset/whosonfirst-data-admin-esp"
            target="_blank"
          >
            © OCHA
          </a>
        }
      >
        {spainPhoneCodes.map(({ code, paths }) => (
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
                  hints &&
                  (code.toString().startsWith("98") ||
                    code.toString().startsWith("96")),
                "fill-chart-2/50":
                  hints &&
                  (code.toString().startsWith("97") ||
                    code.toString().startsWith("95")),
                "fill-chart-3/50": hints && code.toString().startsWith("94"),
                "fill-chart-4/50": hints && code.toString().startsWith("92"),
                "fill-chart-5/50":
                  hints &&
                  (code.toString().startsWith("91") ||
                    code.toString().startsWith("93")),
              }
            )}
          >
            {paths}
          </g>
        ))}
        {spainPhoneCodes.map(({ code, center }) => (
          <text
            key={code}
            x={center[0]}
            y={center[1]}
            z={100}
            fillOpacity={1}
            strokeWidth={0}
            textAnchor="middle"
            fontSize={1}
            dominantBaseline="middle"
            className="pointer-events-none fill-foreground"
            opacity={positive === code || negative === code || hints ? 1 : 0}
          >
            {code}
          </text>
        ))}
        {/* <g className="stroke-secondary-foreground/30 pointer-events-none">
          {spainFirstAdministrativePaths}
        </g>
        <g className="stroke-secondary-foreground pointer-events-none">
          {spainPaths}
        </g> */}
      </SvgMap>
    </div>
  );
}
