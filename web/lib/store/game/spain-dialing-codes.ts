import { spainPhoneCodes } from "@/lib/mapping/spain/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { createSinglePinSlice, SinglePinSlice } from "../slice/single-pin";

export type SpainDialingCodesSlice = {
  spainDialingCodes: SinglePinSlice;
};

export const createSpainDialingCodesSlice: ImmerStateCreator<SpainDialingCodesSlice> =
  createSinglePinSlice({
    name: "spainDialingCodes",
    codes: spainPhoneCodes,
  });
