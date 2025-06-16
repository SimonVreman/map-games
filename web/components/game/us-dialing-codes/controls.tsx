import { usPhoneCodeSubsets } from "@/lib/mapping/us/registry/phone-codes";
import { SinglePinControls } from "../single-pin/controls";

export function USDialingCodesControls() {
  return (
    <SinglePinControls store="usDialingCodes" subsets={usPhoneCodeSubsets} />
  );
}
