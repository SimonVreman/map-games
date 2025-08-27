import { europeanBollards } from "@/lib/games/meta/european-bollards-meta";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanBollardsSlice = {
  europeanBollards: QuizSlice;
};

export const createEuropeanBollardsSlice = createQuizSlice({
  name: "europeanBollards",
  ...europeanBollards,
});
