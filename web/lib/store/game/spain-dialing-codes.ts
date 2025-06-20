import { spainDialingCodeSubsets } from "@/lib/mapping/registry/spain-dialing-codes";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { ImmerStateCreator } from "../types";
import { spainDialingCodes } from "@/lib/mapping/paths/spain/dialing-codes";

export type SpainDialingCodesSlice = {
  spainDialingCodes: QuizSlice;
};

export const createSpainDialingCodesSlice: ImmerStateCreator<SpainDialingCodesSlice> =
  createQuizSlice({
    name: "spainDialingCodes",
    targets: spainDialingCodes,
    subjectSubsets: spainDialingCodeSubsets,
  });
