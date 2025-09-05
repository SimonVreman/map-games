import { ImmerStateCreator } from "../types";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";
import { philippinesProvinces } from "@/lib/games/meta/philippines-provinces-meta";

export type PhilippinesProvincesSlice = {
  philippinesProvinces: QuizSlice;
};

export const createPhilippinesProvincesSlice: ImmerStateCreator<PhilippinesProvincesSlice> =
  createQuizSlice({
    name: "philippinesProvinces",
    ...philippinesProvinces,
  });
