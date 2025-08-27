import { europeanPedestrians } from "@/lib/games/meta/european-pedestrians-meta";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanPedestriansSlice = {
  europeanPedestrians: QuizSlice;
};

export const createEuropeanPedestriansSlice = createQuizSlice({
  name: "europeanPedestrians",
  ...europeanPedestrians,
});
