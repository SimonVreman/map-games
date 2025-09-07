import { europeanGuardrails } from "@/lib/games/meta/european-guardrails-meta";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";

const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-guardrails-subjects");

const store = createQuizStoreConstructor(europeanGuardrails, {
  name: "european-guardrails",
});

export default function EuropeanGuardrailsGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls
          label="Where is it seen?"
          {...europeanGuardrails}
          graphic={({ subject }) => (
            <PatternPreview {...europeanGuardrails} subject={subject} />
          )}
        />

        <WebGLMap
          bounds={europeMapBounds}
          attribution={
            <>
              <span>Keaton</span>
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
            {...europeanGuardrails}
          />
          <TargetLayer
            targetFeatures={targetFeatures}
            {...europeanGuardrails}
          />
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}
