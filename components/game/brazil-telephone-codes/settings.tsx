import { SinglePinSettings } from "../single-pin/settings";

export function BrazilTelephoneCodesSettings({
  className,
}: {
  className?: string;
}) {
  return (
    <SinglePinSettings
      href="/brazil-telephone-codes/play"
      store="brazilTelephoneCodes"
      className={className}
    />
  );
}
