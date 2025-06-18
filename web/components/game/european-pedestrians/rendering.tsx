import { useAppStore } from "@/lib/store/provider";
import { useHandleGroupGuess } from "../group-pin/guess";
import { europeanPedestrians } from "@/lib/mapping/countries/registry/pedestrians";
import { SelectablePatterns } from "@/components/canvas/game/selectable-patterns";

export function EuropeanPedestriansRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.europeanPedestrians.highlighted,
    s.europeanPedestrians.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "europeanPedestrians",
    targets: europeanPedestrians.entries,
  });

  return (
    <SelectablePatterns
      {...europeanPedestrians}
      isHighlighted={(name) => highlighted.includes(name) || hints}
      onClick={handleGuess}
    />
  );
}
