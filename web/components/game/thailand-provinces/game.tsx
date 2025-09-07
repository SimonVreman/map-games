import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { thailandProvinces } from "@/lib/games/meta/thailand-provinces-meta";
import { use } from "react";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";

const bounds = {
  north: 21,
  south: 5,
  east: 112,
  west: 91,
  padding: 2,
};

const targetsPromise = fetchGeoAsset("thailand-provinces-targets");
const subjectsPromise = fetchGeoAsset("thailand-provinces-subjects");

const store = createQuizStoreConstructor(thailandProvinces, {
  name: "thailand-provinces",
});

export default function ThailandProvincesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls label="Area code:" {...thailandProvinces} />

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
            {...thailandProvinces}
          />
          <TargetLayer targetFeatures={targetFeatures} {...thailandProvinces} />
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}
