import { useAppStore } from "@/lib/store/provider";

import { GroupPinControls } from "../group-pin/controls";
import { svgBollardPatterns } from "./bollard-patterns";

export function EuropeanBollardsControls() {
  const pattern = useAppStore((s) => s.europeanBollards.subject);

  return (
    <GroupPinControls
      store="europeanBollards"
      graphic={
        <svg
          viewBox="0 0 400 500"
          className="w-32 bg-secondary"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>{svgBollardPatterns}</defs>
          <rect
            width="400"
            height="500"
            strokeWidth={0}
            fill={`url(#${pattern?.name}-base)`}
          />
        </svg>
      }
    >
      <p className="text-base">Where is it seen?</p>
    </GroupPinControls>
  );
}
