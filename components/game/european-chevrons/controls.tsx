import { useAppStore } from "@/lib/store/provider";
import { svgChevronPatterns } from "./chevron-patterns";
import { GroupPinControls } from "../group-pin/controls";

export function EuropeanChevronsControls() {
  const pattern = useAppStore((s) => s.europeanChevrons.subject);

  return (
    <GroupPinControls store="europeanChevrons">
      <p>Where is it seen?</p>

      <svg
        viewBox="0 0 200 100"
        className="absolute top-0 right-0 h-full"
        preserveAspectRatio="xMinYMin"
      >
        <defs>{svgChevronPatterns}</defs>
        <rect
          x={0}
          y={0}
          width="100%"
          height="100%"
          strokeWidth={0}
          fill={`url(#${pattern?.name}-base)`}
        />
      </svg>
    </GroupPinControls>
  );
}
