import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { PatternLayer } from "@/components/web-gl/layers/pattern-layer";
import { use } from "react";
import { Source } from "react-map-gl/maplibre";
import { europeMapBounds } from "@/lib/mapping/bounds";
import { europeanChevrons } from "@/lib/games/meta/european-chevrons-meta";

const key = "europeanChevrons";
const targetsPromise = fetchGeoAsset("european-countries-targets");
const subjectsPromise = fetchGeoAsset("european-chevrons-subjects");

export default function EuropeanChevronsGame() {
  const targets = use(targetsPromise);
  const subjects = use(subjectsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Where is it seen?"
        subsets={europeanChevrons.subsets}
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
        <Source id={key} type="geojson" data={subjects} />
        <PatternLayer store={key} />
        <TargetLayer
          store={key}
          targets={targets}
          enabled={europeanChevrons.targets}
        />
      </WebGLMap>
    </div>
  );
}
