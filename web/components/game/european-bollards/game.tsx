import { CanvasMap } from "@/components/canvas/canvas-map";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { europeanBollards } from "@/lib/mapping/registry/european-bollards";
import { PatternedTargets } from "@/components/canvas/game/patterned-targets";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export default function EuropeanBollardsGame() {
  return (
    <div className="size-full relative">
      <QuizControls
        store="europeanBollards"
        label="Where is it seen?"
        subsets={europeanBollards.subsets}
        graphic={({ subject }) => (
          <PatternPreview pattern={subject} {...europeanBollards} />
        )}
      />

      <CanvasMap
        bounds={bounds}
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
        <PatternedTargets store="europeanBollards" {...europeanBollards} />
      </CanvasMap>
    </div>
  );
}
