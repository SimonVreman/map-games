import { QuizControls } from "../quiz/controls";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { Source } from "react-map-gl/maplibre";
import { PatternLayer } from "@/components/web-gl/layers/pattern-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { use } from "react";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { europeanBollards } from "@/lib/games/meta/european-bollards-meta";

const key = "europeanBollards";
const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-bollards-subjects");

export default function EuropeanBollardsGame() {
  const targets = use(targetsPromise);
  const subjects = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Where is it seen?"
        subsets={europeanBollards.subsets}
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
        <Source id={key} type="geojson" data={subjects} />
        <PatternLayer store={key} />
        <TargetLayer
          store={key}
          targets={targets}
          enabled={europeanBollards.targets}
        />
      </WebGLMap>
    </div>
  );
}
