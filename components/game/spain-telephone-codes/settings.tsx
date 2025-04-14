"use client";

import { AreaCodesSettings } from "../area-codes/settings";

export function SpainTelephoneCodesSettings({
  className,
}: {
  className?: string;
}) {
  return (
    <AreaCodesSettings
      href="/spain-telephone-codes/play"
      store="spainTelephoneCodes"
      className={className}
    />
  );
}
