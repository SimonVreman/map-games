import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { vietnamProvinces } from "@/lib/games/meta/vietnam-provinces-meta";
import { use } from "react";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";

const bounds = {
  north: 23,
  south: 9,
  east: 119,
  west: 91,
  padding: 2,
};

const targetsPromise = fetchGeoAsset("vietnam-provinces-targets");
const subjectsPromise = fetchGeoAsset("vietnam-provinces-subjects");

const store = createQuizStoreConstructor(vietnamProvinces, {
  name: "vietnam-provinces",
});

export default function VietnamProvincesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls label="Area code:" {...vietnamProvinces} />

        <WebGLMap
          bounds={bounds}
          layers={{ states: false }}
          attribution={
            <>
              <a href="https://www.naturalearthdata.com/" target="_blank">
                Made with Natural Earth
              </a>
            </>
          }
        >
          <HintHandler />
          <SubjectLayer
            subjectFeatures={subjectFeatures}
            {...vietnamProvinces}
          />
          <TargetLayer targetFeatures={targetFeatures} {...vietnamProvinces} />
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}
