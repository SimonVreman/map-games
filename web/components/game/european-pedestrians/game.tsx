import { CanvasMap } from "@/components/canvas/canvas-map";
import { PatternedTargets } from "@/components/canvas/game/patterned-targets";
import { europeanPedestrians } from "@/lib/mapping/registry/european-pedestrians";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export function EuropeanPedestriansGame() {
  return (
    <div className="size-full relative">
      <QuizControls
        store="europeanPedestrians"
        label="Where is it seen?"
        graphic={({ subject }) => (
          <PatternPreview {...europeanPedestrians} pattern={subject} />
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
        <PatternedTargets
          store="europeanPedestrians"
          {...europeanPedestrians}
        />
      </CanvasMap>
    </div>
  );
}
