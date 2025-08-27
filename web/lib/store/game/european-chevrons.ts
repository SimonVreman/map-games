import { europeanChevrons } from "@/lib/games/meta/european-chevrons-meta";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanChevronsSlice = {
  europeanChevrons: QuizSlice;
};

export const createEuropeanChevronsSlice = createQuizSlice({
  name: "europeanChevrons",
  ...europeanChevrons,
});
