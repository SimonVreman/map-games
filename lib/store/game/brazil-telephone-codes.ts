import { brazilPhoneCodes } from "@/lib/mapping/brazil/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { createSinglePinSlice, SinglePinSlice } from "../slice/single-pin";

export type BrazilTelephoneCodesSlice = {
  brazilTelephoneCodes: SinglePinSlice;
};

export const createBrazilTelephoneCodesSlice: ImmerStateCreator<BrazilTelephoneCodesSlice> =
  createSinglePinSlice({
    name: "brazilTelephoneCodes",
    codes: brazilPhoneCodes,
  });
