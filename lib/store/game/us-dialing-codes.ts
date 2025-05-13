import { usPhoneCodes } from "@/lib/mapping/us/registry/phone-codes";
import { ImmerStateCreator } from "../types";
import { createSinglePinSlice, SinglePinSlice } from "../slice/single-pin";

export type USDialingCodesSlice = {
  usDialingCodes: SinglePinSlice;
};

export const createUSDialingCodesSlice: ImmerStateCreator<USDialingCodesSlice> =
  createSinglePinSlice({
    name: "usDialingCodes",
    codes: usPhoneCodes,
  });
