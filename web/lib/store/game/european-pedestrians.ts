import { europeanPedestrians } from "@/lib/mapping/registry/european-pedestrians";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanPedestriansSlice = {
  europeanPedestrians: QuizSlice;
};

export const createEuropeanPedestriansSlice = createQuizSlice({
  name: "europeanPedestrians",
  targets: europeanPedestrians.entries,
  subjectSubsets: europeanPedestrians.subsets,
});
