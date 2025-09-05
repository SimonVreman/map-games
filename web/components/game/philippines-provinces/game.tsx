import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { philippinesProvinces } from "@/lib/games/meta/philippines-provinces-meta";
import { use } from "react";

const bounds = {
  north: 21,
  south: 3,
  east: 133,
  west: 110,
  padding: 2,
};

const key = "philippinesProvinces";
const targetsPromise = fetchGeoAsset("philippines-provinces-targets");
const subjectsPromise = fetchGeoAsset("philippines-provinces-subjects");

export default function PhilippinesProvincesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls store={key} label="Area code:" {...philippinesProvinces} />

      <WebGLMap
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
        <HintHandler store={key} />
        <SubjectLayer
          store={key}
          subjectFeatures={subjectFeatures}
          {...philippinesProvinces}
        />
        <TargetLayer
          store={key}
          targetFeatures={targetFeatures}
          {...philippinesProvinces}
        />
      </WebGLMap>
    </div>
  );
}
