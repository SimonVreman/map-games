import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { europeanChevrons } from "@/lib/games/meta/european-chevrons-meta";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";

const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-chevrons-subjects");

const store = createQuizStoreConstructor(europeanChevrons, {
  name: "european-chevrons",
});

export default function EuropeanChevronsGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls
          label="Where is it seen?"
          {...europeanChevrons}
          graphic={({ subject }) => (
            <PatternPreview subject={subject} {...europeanChevrons} />
          )}
        />

        <WebGLMap
          bounds={europeMapBounds}
          attribution={
            <>
              <a href="https://geohints.com/meta/signs/chevrons">GeoHints</a>
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
            {...europeanChevrons}
          />
          <TargetLayer targetFeatures={targetFeatures} {...europeanChevrons} />
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}
