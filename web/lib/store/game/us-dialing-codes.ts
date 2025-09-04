import { ImmerStateCreator } from "../types";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { usDialingCodes } from "@/lib/mapping/paths/united-states/dialing-codes";
import { usDialingCodeSubsets } from "@/lib/mapping/registry/us-dialing-codes";

export type USDialingCodesSlice = {
  usDialingCodes: QuizSlice;
};

export const createUSDialingCodesSlice: ImmerStateCreator<USDialingCodesSlice> =
  createQuizSlice({
    name: "usDialingCodes",
    targets: usDialingCodes,
    subsets: usDialingCodeSubsets,
  });
