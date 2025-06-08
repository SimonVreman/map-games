import { useAppStore } from "@/lib/store/provider";
import { useHandleGroupGuess } from "../group-pin/guess";
import { europeanGuardrails } from "@/lib/mapping/countries/registry/guardrails";
import { SelectablePatterns } from "@/components/canvas/game/selectable-patterns";

export default function EuropeanGuardrailsRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanGuardrails.highlighted,
    s.europeanGuardrails.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanGuardrails",
    targets: europeanGuardrails.entries,
  });

  return (
    <SelectablePatterns
      {...europeanGuardrails}
      isHighlighted={(name) => highlighted.includes(name) || hints}
      onClick={handleGuess}
    />
  );
}
