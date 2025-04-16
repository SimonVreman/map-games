import { useAppStore } from "@/lib/store/provider";

import { GroupPinControls } from "../group-pin/controls";
import { svgGuardrailPatterns } from "./guardrail-patterns";

export function EuropeanGuardrailsControls() {
  const pattern = useAppStore((s) => s.europeanGuardrails.subject);

  return (
    <GroupPinControls store="europeanGuardrails">
      <p>Where is it seen?</p>

      <svg
        viewBox="0 0 200 100"
        className="absolute top-0 right-0 h-full"
        preserveAspectRatio="xMinYMin"
      >
        <defs>{svgGuardrailPatterns}</defs>
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
