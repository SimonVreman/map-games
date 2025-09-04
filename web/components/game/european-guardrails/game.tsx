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

const key = "europeanGuardrails";
const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-guardrails-subjects");

export default function EuropeanGuardrailsGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Where is it seen?"
        subsets={europeanGuardrails.subsets}
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
        <HintHandler store={key} />
        <SubjectLayer
          store={key}
          subjectFeatures={subjectFeatures}
          {...europeanGuardrails}
        />
        <TargetLayer
          store={key}
          targetFeatures={targetFeatures}
          {...europeanGuardrails}
        />
      </WebGLMap>
    </div>
  );
}
