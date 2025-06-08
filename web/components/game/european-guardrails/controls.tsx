import { useAppStore } from "@/lib/store/provider";
import { GroupPinControls } from "../group-pin/controls";
import { europeanGuardrails } from "@/lib/mapping/countries/registry/guardrails";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";

export function EuropeanGuardrailsControls() {
  const pattern = useAppStore((s) => s.europeanGuardrails.subject);

  return (
    <GroupPinControls
      store="europeanGuardrails"
      graphic={
        <PatternPreview {...europeanGuardrails} pattern={pattern?.name} />
      }
    >
      <p>Where is it seen?</p>
    </GroupPinControls>
  );
}
