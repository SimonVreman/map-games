import { useAppStore } from "@/lib/store/provider";

import { GroupPinControls } from "../group-pin/controls";
import { svgGuardrailPatterns } from "./guardrail-patterns";

export function EuropeanGuardrailsControls() {
  const pattern = useAppStore((s) => s.europeanGuardrails.subject);

  return (
    <GroupPinControls store="europeanGuardrails">
      <p>Where is it seen?</p>

      <svg
        viewBox="300 0 300 152"
        className="absolute top-0 right-0 h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>{svgGuardrailPatterns}</defs>
        <rect
          width="1002"
          height="152"
          strokeWidth={0}
          fill={`url(#${pattern?.name})`}
        />
      </svg>
    </GroupPinControls>
  );
}
