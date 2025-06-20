import { europeanBollards } from "@/lib/mapping/registry/european-bollards";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanBollardsSlice = {
  europeanBollards: QuizSlice;
};

export const createEuropeanBollardsSlice = createQuizSlice({
  name: "europeanBollards",
  targets: europeanBollards.entries,
  subjectSubsets: europeanBollards.subsets,
});
