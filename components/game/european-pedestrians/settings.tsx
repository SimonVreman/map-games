import { GroupPinSettings } from "../group-pin/settings";

export function EuropeanPedestriansSettings({
  className,
}: {
  className?: string;
}) {
  return (
    <GroupPinSettings
      store="europeanPedestrians"
      href="/european-pedestrians/play"
      className={className}
    />
  );
}
