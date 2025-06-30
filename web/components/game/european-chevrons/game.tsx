import WebGLMap from "@/components/web-gl/WebGLMap";
import { QuizControls } from "../quiz/controls";

import { europeanChevrons } from "@/lib/mapping/registry/european-chevrons";
import { PatternLayer } from "@/components/web-gl/layers/PatternLayer";
import { cache, use } from "react";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

const fetchTargets = cache(
  async () =>
    await fetch("/assets/geo/european-countries.geojson").then(
      async (r) => (await r.json()) as GeoJSON.FeatureCollection
    )
);

const targetsPromise = fetchTargets();

export default function EuropeanChevronsGame() {
  const targets = use(targetsPromise);

  return (
    <div className="size-full relative">
      <QuizControls
        store="europeanChevrons"
        label="Where is it seen?"
        subsets={europeanChevrons.subsets}
        // graphic={({ subject }) => (
        //   <PatternPreview pattern={subject} {...europeanChevrons} />
        // )}
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
        {/* <PatternedTargets store="europeanChevrons" {...europeanChevrons} /> */}
        <PatternLayer targets={targets} {...europeanChevrons} />
      </WebGLMap>
    </div>
  );
}
