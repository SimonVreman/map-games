import { useAppStore } from "@/lib/store/provider";
import { GroupPinControls } from "../group-pin/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { usLicensePlates } from "@/lib/mapping/us/registry/license-plates";
import { Sprites } from "@/types/registry";

export function USLicensePlatesControls({ sprites }: { sprites: Sprites }) {
  const pattern = useAppStore((s) => s.usLicensePlates.subject);

  return (
    <GroupPinControls
      store="usLicensePlates"
      graphic={
        <PatternPreview
          {...usLicensePlates}
          pattern={pattern?.name}
          sprites={sprites}
        />
      }
    >
      <p className="text-base">Where is it seen?</p>
    </GroupPinControls>
  );
}
