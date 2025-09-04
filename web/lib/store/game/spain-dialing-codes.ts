import { spainDialingCodes } from "@/lib/games/meta/spain-dialing-codes-meta";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { ImmerStateCreator } from "../types";

export type SpainDialingCodesSlice = {
  spainDialingCodes: QuizSlice;
};

export const createSpainDialingCodesSlice: ImmerStateCreator<SpainDialingCodesSlice> =
  createQuizSlice({
    name: "spainDialingCodes",
    ...spainDialingCodes,
  });
