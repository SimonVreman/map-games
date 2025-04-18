"use client";

import { spainPhoneCodes } from "@/lib/mapping/spain/paths/phone-codes";
import { scalingForBounds, SvgMap } from "../svg-map";
import { SpainDialingCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { SelectableRegions } from "../selectable-regions";
import { spainProvincesPaths } from "@/lib/mapping/spain/paths/provinces";
import { spainPaths } from "@/lib/mapping/spain/paths/country";

const bounds = {
  north: 44,
  west: -11,
  south: 35,
  east: 4,
  padding: 2,
};

export function SpainDialingCodesGame() {
  const [guess, correct, highlighted, hints] = useAppStore((s) => [
    s.spainDialingCodes.guess,
    s.spainDialingCodes.code,
    s.spainDialingCodes.highlighted,
    s.spainDialingCodes.hints,
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
      <SpainDialingCodesControls />

      <SvgMap
        className="pt-24"
        bounds={bounds}
        attribution={
          <a
            href="https://data.humdata.org/dataset/whosonfirst-data-admin-esp"
            target="_blank"
          >
            © OCHA
          </a>
        }
      >
        <SelectableRegions
          regions={spainPhoneCodes}
          countryPaths={spainPaths}
          firstAdministrativePaths={spainProvincesPaths}
          hints={hints}
          highlighted={highlighted}
          scaling={scalingForBounds(bounds)}
          getCodeGroup={(code) => code.toString().slice(0, 2)}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
