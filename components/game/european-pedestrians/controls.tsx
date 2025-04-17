import { useAppStore } from "@/lib/store/provider";

import { GroupPinControls } from "../group-pin/controls";
import { svgPedestrianPatterns } from "./pedestrian-patterns";

export function EuropeanPedestriansControls() {
  const pattern = useAppStore((s) => s.europeanPedestrians.subject);

  return (
    <GroupPinControls store="europeanPedestrians">
      <div>
        <p className="text-base leading-tight">Where is it seen?</p>
        <p className="text-sm font-medium text-muted-foreground">
          {pattern?.hint}
        </p>
      </div>

      <svg
        viewBox="0 0 200 200"
        className="absolute top-0 right-0 h-full bg-secondary"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>{svgPedestrianPatterns}</defs>
        <rect
          width="200"
          height="200"
          strokeWidth={0}
          fill={`url(#${pattern?.name}-base)`}
        />
      </svg>
    </GroupPinControls>
  );
}
