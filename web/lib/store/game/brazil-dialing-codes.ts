import { brazilPhoneCodeSubsets } from "@/lib/mapping/brazil/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { createSinglePinSlice, SinglePinSlice } from "../slice/single-pin";

export type BrazilDialingCodesSlice = {
  brazilDialingCodes: SinglePinSlice;
};

export const createBrazilDialingCodesSlice: ImmerStateCreator<BrazilDialingCodesSlice> =
  createSinglePinSlice({
    name: "brazilDialingCodes",
    subsets: brazilPhoneCodeSubsets,
  });
