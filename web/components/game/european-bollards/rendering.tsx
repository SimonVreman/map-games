import { useAppStore } from "@/lib/store/provider";
import { useHandleGroupGuess } from "../group-pin/guess";
import { europeanBollards } from "@/lib/mapping/countries/registry/bollards";
import { SelectablePatterns } from "@/components/canvas/game/selectable-patterns";

export function EuropeanBollardsRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanBollards.highlighted,
    s.europeanBollards.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanBollards",
    targets: europeanBollards.entries,
  });

  return (
    <SelectablePatterns
      {...europeanBollards}
      isHighlighted={(name) => highlighted.includes(name) || hints}
      onClick={handleGuess}
    />
  );
}
