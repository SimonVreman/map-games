import { brazilPhoneCodes } from "@/lib/mapping/brazil/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { AreaCodesSliceState, createAreaCodesSlice } from "./area-codes";

export type BrazilTelephoneCodesSlice = {
  brazilTelephoneCodes: AreaCodesSliceState;
};

export const createBrazilTelephoneCodesSlice: ImmerStateCreator<BrazilTelephoneCodesSlice> =
  createAreaCodesSlice({
    name: "brazilTelephoneCodes",
    codes: brazilPhoneCodes,
  });
