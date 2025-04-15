import { spainPhoneCodes } from "@/lib/mapping/spain/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { createSinglePinSlice, SinglePinSlice } from "../slice/single-pin";

export type SpainTelephoneCodesSlice = {
  spainTelephoneCodes: SinglePinSlice;
};

export const createSpainTelephoneCodesSlice: ImmerStateCreator<SpainTelephoneCodesSlice> =
  createSinglePinSlice({
    name: "spainTelephoneCodes",
    codes: spainPhoneCodes,
  });
