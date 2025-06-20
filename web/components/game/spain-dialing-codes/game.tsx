import { CanvasMap } from "@/components/canvas/canvas-map";
import { LabeledTargets } from "@/components/canvas/game/labeled-targets";
import { spainDialingCodes } from "@/lib/mapping/paths/spain/dialing-codes";
import { spainPaths } from "@/lib/mapping/paths/spain/country";
import { spainProvincesPaths } from "@/lib/mapping/paths/spain/provinces";
import { spainDivider } from "@/lib/mapping/paths/spain/divider";
import { spainDialingCodeSubsets } from "@/lib/mapping/registry/spain-dialing-codes";
import { QuizControls } from "../quiz/controls";

const bounds = {
  north: 44,
  west: -11,
  south: 35,
  east: 4,
  padding: 2,
};

export default function SpainDialingCodesGame() {
  return (
    <div className="size-full relative">
      <QuizControls
        store="spainDialingCodes"
        label="Area code:"
        subsets={spainDialingCodeSubsets}
      />

      <CanvasMap
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
        <LabeledTargets
          store="spainDialingCodes"
          targets={spainDialingCodes}
          country={spainPaths}
          firstSubdivision={spainProvincesPaths}
          divider={spainDivider}
          subsets={spainDialingCodeSubsets}
        />
      </CanvasMap>
    </div>
  );
}
