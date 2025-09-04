import { brazilDialingCodes } from "@/lib/games/meta/brazil-dialing-codes-meta";
import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";

const bounds = {
  north: 9,
  south: -34,
  east: -30,
  west: -79,
  padding: 2,
};

const key = "brazilDialingCodes";
const targetsPromise = fetchGeoAsset("brazil-dialing-codes-targets");
const subjectsPromise = fetchGeoAsset("brazil-dialing-codes-subjects");

export default function BrazilDialingCodesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Area code:"
        subsets={brazilDialingCodes.subsets}
      />

      <WebGLMap
        bounds={bounds}
        attribution={
          <a href="https://data.humdata.org/dataset/cod-ab-bra" target="_blank">
            © OCHA
          </a>
        }
      >
        <HintHandler store={key} />
        <SubjectLayer
          store={key}
          subjectFeatures={subjectFeatures}
          {...brazilDialingCodes}
        />
        <TargetLayer
          store={key}
          targetFeatures={targetFeatures}
          {...brazilDialingCodes}
        />
      </WebGLMap>
    </div>
  );
}
