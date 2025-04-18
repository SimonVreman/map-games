"use client";

import { brazilPhoneCodes } from "@/lib/mapping/brazil/paths/phone-codes";
import { scalingForBounds, SvgMap } from "../svg-map";
import { BrazilDialingCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { SelectableRegions } from "../selectable-regions";
import { brazilStatesPaths } from "@/lib/mapping/brazil/paths/states";
import { brazilPaths } from "@/lib/mapping/brazil/paths/country";

const bounds = {
  north: 5,
  south: -34,
  east: -35,
  west: -74,
  padding: 2,
};

export function BrazilDialingCodesGame() {
  const [guess, correct, highlighted, hints] = useAppStore((s) => [
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
        bounds={bounds}
        attribution={
          <a href="https://data.humdata.org/dataset/cod-ab-bra" target="_blank">
            © OCHA
          </a>
        }
      >
        <SelectableRegions
          regions={brazilPhoneCodes}
          countryPaths={brazilPaths}
          firstAdministrativePaths={brazilStatesPaths}
          hints={hints}
          highlighted={highlighted}
          scaling={scalingForBounds(bounds)}
          getCodeGroup={(code) => code.toString()[0]}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
