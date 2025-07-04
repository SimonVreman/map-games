import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { QuizControls } from "../quiz/controls";
import { europeanChevrons } from "@/lib/mapping/registry/european-chevrons";
import { PatternLayer } from "@/components/web-gl/layers/pattern-layer";
import { use } from "react";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { fetchGeoAsset } from "@/lib/games/geo-asset";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

const targetsPromise = fetchGeoAsset("european-countries");

export default function EuropeanChevronsGame() {
  const targets = use(targetsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store="europeanChevrons"
        label="Where is it seen?"
        subsets={europeanChevrons.subsets}
        graphic={({ subject }) => (
          <PatternPreview pattern={subject} {...europeanChevrons} />
        )}
      />

      <WebGLMap
        bounds={bounds}
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
        <PatternLayer
          store="europeanChevrons"
          targets={targets}
          {...europeanChevrons}
        />
        <TargetLayer
          store="europeanChevrons"
          targets={targets}
          {...europeanChevrons}
        />
      </WebGLMap>
    </div>
  );
}
