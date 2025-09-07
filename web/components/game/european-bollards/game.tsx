import { QuizControls } from "../quiz/controls";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { use } from "react";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { europeanBollards } from "@/lib/games/meta/european-bollards-meta";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";

const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-bollards-subjects");

const store = createQuizStoreConstructor(europeanBollards, {
  name: "european-bollards",
});

export default function EuropeanBollardsGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls
          label="Where is it seen?"
          {...europeanBollards}
          graphic={({ subject }) => (
            <PatternPreview subject={subject} {...europeanBollards} />
          )}
        />

        <WebGLMap
          bounds={europeMapBounds}
          attribution={
            <>
              <a href="https://geohints.com/meta/bollards">GeoHints</a>
              <span className="mx-1">-</span>
              <a href="https://www.naturalearthdata.com/" target="_blank">
                Made with Natural Earth.
              </a>
            </>
          }
        >
          <HintHandler />
          <SubjectLayer
            subjectFeatures={subjectFeatures}
            {...europeanBollards}
          />
          <TargetLayer targetFeatures={targetFeatures} {...europeanBollards} />
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}
