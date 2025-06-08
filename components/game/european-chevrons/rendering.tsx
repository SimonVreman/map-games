import { useAppStore } from "@/lib/store/provider";
import { useHandleGroupGuess } from "../group-pin/guess";
import { europeanChevrons } from "@/lib/mapping/countries/registry/chevrons";
import { SelectablePatterns } from "@/components/canvas/game/selectable-patterns";

export default function EuropeanChevronsRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanChevrons.highlighted,
    s.europeanChevrons.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanChevrons",
    targets: europeanChevrons.entries,
  });

  return (
    <SelectablePatterns
      {...europeanChevrons}
      isHighlighted={(name) => highlighted.includes(name) || hints}
      onClick={handleGuess}
    />
  );
}
