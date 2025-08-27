import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";
import { PatternLayer } from "@/components/web-gl/layers/pattern-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { Source } from "react-map-gl/maplibre";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { europeanPedestrians } from "@/lib/games/meta/european-pedestrians-meta";

const key = "europeanPedestrians";
const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-pedestrians-subjects");

export default function EuropeanPedestriansGame() {
  const targets = use(targetsPromise);
  const subjects = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Where is it seen?"
        subsets={europeanPedestrians.subsets}
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
        <Source id={key} type="geojson" data={subjects} />
        <PatternLayer store={key} />
        <TargetLayer
          store={key}
          targets={targets}
          enabled={europeanPedestrians.targets}
        />
      </WebGLMap>
    </div>
  );
}
