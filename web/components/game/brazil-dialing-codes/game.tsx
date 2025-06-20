import { CanvasMap } from "@/components/canvas/canvas-map";
import { QuizControls } from "../quiz/controls";
import { LabeledTargets } from "@/components/canvas/game/labeled-targets";
import { brazilDialingCodes } from "@/lib/mapping/paths/brazil/dialing-codes";
import { brazilPaths } from "@/lib/mapping/paths/brazil/country";
import { brazilStatesPaths } from "@/lib/mapping/paths/brazil/states";
import { brazilDialingCodeSubsets } from "@/lib/mapping/registry/brazil-dialing-codes";

const bounds = {
  north: 9,
  south: -34,
  east: -35,
  west: -74,
  padding: 2,
};

export default function BrazilDialingCodesGame() {
  return (
    <div className="size-full relative">
      <QuizControls
        store="brazilDialingCodes"
        label="Area code:"
        subsets={brazilDialingCodeSubsets}
      />

      <CanvasMap
        bounds={bounds}
        attribution={
          <a href="https://data.humdata.org/dataset/cod-ab-bra" target="_blank">
            © OCHA
          </a>
        }
      >
        <LabeledTargets
          store="brazilDialingCodes"
          targets={brazilDialingCodes}
          country={brazilPaths}
          firstSubdivision={brazilStatesPaths}
          subsets={brazilDialingCodeSubsets}
        />
      </CanvasMap>
    </div>
  );
}
