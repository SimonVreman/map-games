import { ImmerStateCreator } from "../types";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { usDialingCodes } from "@/lib/games/meta/us-dialing-codes-meta";

export type USDialingCodesSlice = {
  usDialingCodes: QuizSlice;
};

export const createUSDialingCodesSlice: ImmerStateCreator<USDialingCodesSlice> =
  createQuizSlice({
    name: "usDialingCodes",
    ...usDialingCodes,
  });
