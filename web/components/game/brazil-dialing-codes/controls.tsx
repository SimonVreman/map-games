import { brazilPhoneCodeSubsets } from "@/lib/mapping/brazil/registry/phone-codes";
import { SinglePinControls } from "../single-pin/controls";

export function BrazilDialingCodesControls() {
  return (
    <SinglePinControls
      store="brazilDialingCodes"
      subsets={brazilPhoneCodeSubsets}
    />
  );
}
