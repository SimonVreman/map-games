import { spainPhoneCodes } from "@/lib/mapping/spain/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { AreaCodesSliceState, createAreaCodesSlice } from "./area-codes";

export type SpainTelephoneCodesSlice = {
  spainTelephoneCodes: AreaCodesSliceState;
};

export const createSpainTelephoneCodesSlice: ImmerStateCreator<SpainTelephoneCodesSlice> =
  createAreaCodesSlice({
    name: "spainTelephoneCodes",
    codes: spainPhoneCodes,
  });
