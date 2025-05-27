import { useAppStore } from "@/lib/store/provider";
import { GroupPinControls } from "../group-pin/controls";
import { europeanBollards } from "@/lib/mapping/countries/registry/bollards";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";

export function EuropeanBollardsControls() {
  const pattern = useAppStore((s) => s.europeanBollards.subject);

  return (
    <GroupPinControls
      store="europeanBollards"
      graphic={<PatternPreview {...europeanBollards} pattern={pattern?.name} />}
    >
      <p className="text-base">Where is it seen?</p>
    </GroupPinControls>
  );
}
