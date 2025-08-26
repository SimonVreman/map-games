import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { QuizControls } from "../quiz/controls";
import { europeanChevrons } from "@/lib/mapping/registry/european-chevrons";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { PatternLayer } from "@/components/web-gl/layers/pattern-layer";
import { use } from "react";
import { Source } from "react-map-gl/maplibre";
import { europeMapBounds } from "@/lib/mapping/bounds";

const key = "europeanChevrons";
const targetsPromise = fetchGeoAsset("european-countries");
const patternsPromise = fetchGeoAsset("game/european-chevrons-targets");

export default function EuropeanChevronsGame() {
  const targets = use(targetsPromise);
  const patterns = use(patternsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store={key}
        label="Where is it seen?"
        subsets={europeanChevrons.subsets}
        graphic={({ subject }) => (
          <PatternPreview pattern={subject} {...europeanChevrons} />
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
        <Source id={key} type="geojson" data={patterns} />
        <PatternLayer store={key} />
        <TargetLayer store={key} targets={targets} {...europeanChevrons} />
      </WebGLMap>
    </div>
  );
}
