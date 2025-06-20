import { ImmerStateCreator } from "../types";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { brazilDialingCodes } from "@/lib/mapping/paths/brazil/dialing-codes";
import { brazilDialingCodeSubsets } from "@/lib/mapping/registry/brazil-dialing-codes";

export type BrazilDialingCodesSlice = {
  brazilDialingCodes: QuizSlice;
};

export const createBrazilDialingCodesSlice: ImmerStateCreator<BrazilDialingCodesSlice> =
  createQuizSlice({
    name: "brazilDialingCodes",
    targets: brazilDialingCodes,
    subjectSubsets: brazilDialingCodeSubsets,
  });
