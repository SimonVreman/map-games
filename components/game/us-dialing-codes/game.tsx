"use client";

import { scalingForBounds, SvgMap } from "../svg-map";
import { USDialingCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { SelectableRegions } from "../selectable-regions";
import { useHandleSingleGuess } from "../single-pin/guess";
import { usPaths } from "@/lib/mapping/us/paths/country";
import { usStatesPaths } from "@/lib/mapping/us/paths/states";
import { usPhoneCodes } from "@/lib/mapping/us/paths/phone-codes";

const bounds = {
  north: 50,
  south: 24,
  east: -67,
  west: -125,
  padding: 2,
};

export function USDialingCodesGame() {
  const [highlighted, hints] = useAppStore((s) => [
    s.usDialingCodes.highlighted,
    s.usDialingCodes.hints,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "usDialingCodes",
  });

  return (
    <div className="size-full relative">
      <USDialingCodesControls />

      <SvgMap
        className="pt-24"
        bounds={bounds}
        attribution={
          <>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth
            </a>
            <span className="mx-1">-</span>
            <span>
              Sources: Esri; TomTom North America, Inc.; Pitney Bowes Software
              Inc.; iconectiv
            </span>
          </>
        }
      >
        <SelectableRegions
          regions={usPhoneCodes}
          countryPaths={usPaths}
          firstAdministrativePaths={usStatesPaths}
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
