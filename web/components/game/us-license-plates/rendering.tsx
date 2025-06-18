import { useAppStore } from "@/lib/store/provider";
import { useHandleGroupGuess } from "../group-pin/guess";
import { SelectablePatterns } from "@/components/canvas/game/selectable-patterns";
import { usLicensePlates } from "@/lib/mapping/us/registry/license-plates";
import { Sprites } from "@/types/registry";

export function USLicensePlatesRendering({ sprites }: { sprites: Sprites }) {
  const [highlighted, hints] = useAppStore((s) => [
    s.usLicensePlates.highlighted,
    s.usLicensePlates.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "usLicensePlates",
    targets: usLicensePlates.entries,
  });

  return (
    <SelectablePatterns
      {...usLicensePlates}
      sprites={sprites}
      isHighlighted={(name) => highlighted.includes(name) || hints}
      onClick={handleGuess}
    />
  );
}
