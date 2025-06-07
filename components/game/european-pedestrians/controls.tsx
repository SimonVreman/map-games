import { useAppStore } from "@/lib/store/provider";

import { GroupPinControls } from "../group-pin/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { europeanPedestrians } from "@/lib/mapping/countries/registry/pedestrians";

export function EuropeanPedestriansControls() {
  const pattern = useAppStore((s) => s.europeanPedestrians.subject);

  return (
    <GroupPinControls
      store="europeanPedestrians"
      graphic={
        <PatternPreview {...europeanPedestrians} pattern={pattern?.name} />
      }
    >
      <div>
        <p className="text-base leading-tight">Where is it seen?</p>
        <p className="text-sm font-medium text-muted-foreground">
          {pattern?.hint}
        </p>
      </div>
    </GroupPinControls>
  );
}
