import { CanvasMap } from "../../canvas/canvas-map";
import { QuizControls } from "../quiz/controls";
import { LabeledTargets } from "@/components/canvas/game/labeled-targets";
import { usDialingCodes } from "@/lib/mapping/paths/united-states/dialing-codes";
import { usPaths } from "@/lib/mapping/paths/united-states/country";
import { usStatesPaths } from "@/lib/mapping/paths/united-states/state-boundaries";
import { usDivider } from "@/lib/mapping/paths/united-states/divider";
import { usDialingCodeSubsets } from "@/lib/mapping/registry/us-dialing-codes";

const bounds = {
  north: 53,
  south: 10,
  east: -67,
  west: -127,
  padding: 2,
};

export default function USDialingCodesGame() {
  return (
    <div className="size-full relative">
      <QuizControls store="usDialingCodes" label="Area code:" />

      <CanvasMap
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
        <LabeledTargets
          store="usDialingCodes"
          targets={usDialingCodes}
          country={usPaths}
          firstSubdivision={usStatesPaths}
          divider={usDivider}
          subsets={usDialingCodeSubsets}
        />
      </CanvasMap>
    </div>
  );
}
