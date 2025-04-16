import { GroupPinSettings } from "../group-pin/settings";

export function EuropeanGuardrailsSettings({
  className,
}: {
  className?: string;
}) {
  return (
    <GroupPinSettings
      store="europeanGuardrails"
      href="/european-chevrons/play"
      className={className}
    />
  );
}
