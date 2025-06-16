import { spainPhoneCodeSubsets } from "@/lib/mapping/spain/registry/phone-codes";
import { SinglePinControls } from "../single-pin/controls";

export function SpainDialingCodesControls() {
  return (
    <SinglePinControls
      store="spainDialingCodes"
      subsets={spainPhoneCodeSubsets}
    />
  );
}
