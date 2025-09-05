import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { europeanPedestrians } from "@/lib/games/meta/european-pedestrians-meta";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { HintHandler } from "@/components/web-gl/hint-handler";

const key = "europeanPedestrians";
const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-pedestrians-subjects");

export default function EuropeanPedestriansGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Where is it seen?"
        {...europeanPedestrians}
        graphic={({ subject }) => (
          <PatternPreview {...europeanPedestrians} subject={subject} />
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
        <HintHandler store={key} />
        <SubjectLayer
          store={key}
          subjectFeatures={subjectFeatures}
          {...europeanPedestrians}
        />
        <TargetLayer
          store={key}
          targetFeatures={targetFeatures}
          {...europeanPedestrians}
        />
      </WebGLMap>
    </div>
  );
}
