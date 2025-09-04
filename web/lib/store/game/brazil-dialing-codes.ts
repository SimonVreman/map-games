import { ImmerStateCreator } from "../types";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { brazilDialingCodes } from "@/lib/games/meta/brazil-dialing-codes-meta";

export type BrazilDialingCodesSlice = {
  brazilDialingCodes: QuizSlice;
};

export const createBrazilDialingCodesSlice: ImmerStateCreator<BrazilDialingCodesSlice> =
  createQuizSlice({
    name: "brazilDialingCodes",
    ...brazilDialingCodes,
  });
