import { SinglePinSettings } from "../single-pin/settings";

export function SpainTelephoneCodesSettings({
  className,
}: {
  className?: string;
}) {
  return (
    <SinglePinSettings
      href="/spain-telephone-codes/play"
      store="spainTelephoneCodes"
      className={className}
    />
  );
}
