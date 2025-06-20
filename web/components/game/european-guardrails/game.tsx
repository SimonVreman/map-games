import { CanvasMap } from "@/components/canvas/canvas-map";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { europeanGuardrails } from "@/lib/mapping/registry/european-guardrails";
import { PatternedTargets } from "@/components/canvas/game/patterned-targets";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 38,
  padding: 2,
};

export default function EuropeanGuardrailsGame() {
  return (
    <div className="size-full relative">
      <QuizControls
        store="europeanGuardrails"
        label="Where is it seen?"
        subsets={europeanGuardrails.subsets}
        graphic={({ subject }) => (
          <PatternPreview {...europeanGuardrails} pattern={subject} />
        )}
      />

      <CanvasMap
        bounds={bounds}
        attribution={
          <>
            <span>Keaton</span>
            <span className="mx-1">-</span>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth.
            </a>
          </>
        }
      >
        <PatternedTargets store="europeanGuardrails" {...europeanGuardrails} />
      </CanvasMap>
    </div>
  );
}
