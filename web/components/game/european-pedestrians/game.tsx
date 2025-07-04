import { europeanPedestrians } from "@/lib/mapping/registry/european-pedestrians";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/web-gl/pattern-preview";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";
import { PatternLayer } from "@/components/web-gl/layers/pattern-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { WebGLMap } from "@/components/web-gl/web-gl-map";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

const targetsPromise = fetchGeoAsset("european-countries");

export default function EuropeanPedestriansGame() {
  const targets = use(targetsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store="europeanPedestrians"
        label="Where is it seen?"
        subsets={europeanPedestrians.subsets}
        graphic={({ subject }) => (
          <PatternPreview {...europeanPedestrians} pattern={subject} />
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
          store="europeanPedestrians"
          targets={targets}
          {...europeanPedestrians}
        />
        <TargetLayer
          store="europeanPedestrians"
          targets={targets}
          {...europeanPedestrians}
        />
      </WebGLMap>
    </div>
  );
}
