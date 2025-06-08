import { useAppStore } from "@/lib/store/provider";
import { GroupPinControls } from "../group-pin/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { europeanChevrons } from "@/lib/mapping/countries/registry/chevrons";

export function EuropeanChevronsControls() {
  const pattern = useAppStore((s) => s.europeanChevrons.subject);

  return (
    <GroupPinControls
      store="europeanChevrons"
      graphic={<PatternPreview {...europeanChevrons} pattern={pattern?.name} />}
    >
      <p>Where is it seen?</p>
    </GroupPinControls>
  );
}
