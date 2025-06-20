import { CanvasMap } from "@/components/canvas/canvas-map";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { europeanChevrons } from "@/lib/mapping/registry/european-chevrons";
import { PatternedTargets } from "@/components/canvas/game/patterned-targets";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export default function EuropeanChevronsGame() {
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

      <CanvasMap
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
        <PatternedTargets store="europeanChevrons" {...europeanChevrons} />
      </CanvasMap>
    </div>
  );
}
