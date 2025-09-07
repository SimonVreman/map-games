import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { indiaStates } from "@/lib/games/meta/india-states-meta";
import { use } from "react";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";

const bounds = {
  north: 36,
  south: 5,
  east: 100,
  west: 64,
  padding: 2,
};

const targetsPromise = fetchGeoAsset("india-states-targets");
const subjectsPromise = fetchGeoAsset("india-states-subjects");

const store = createQuizStoreConstructor(indiaStates, {
  name: "india-states",
});

export default function IndiaStatesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls label="Area code:" {...indiaStates} />

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
          <SubjectLayer subjectFeatures={subjectFeatures} {...indiaStates} />
          <TargetLayer targetFeatures={targetFeatures} {...indiaStates} />
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}
