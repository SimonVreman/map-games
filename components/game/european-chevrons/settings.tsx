import { GroupPinSettings } from "../group-pin/settings";

export function EuropeanChevronsSettings({
  className,
}: {
  className?: string;
}) {
  return (
    <GroupPinSettings
      store="europeanChevrons"
      href="/european-chevrons/play"
      className={className}
    />
  );
}
