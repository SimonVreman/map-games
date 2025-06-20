import { europeanChevrons } from "@/lib/mapping/registry/european-chevrons";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanChevronsSlice = {
  europeanChevrons: QuizSlice;
};

export const createEuropeanChevronsSlice = createQuizSlice({
  name: "europeanChevrons",
  targets: europeanChevrons.entries,
  subjectSubsets: europeanChevrons.subsets,
});
