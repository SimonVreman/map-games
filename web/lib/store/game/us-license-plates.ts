import { usLicensePlates } from "@/lib/mapping/registry/us-license-plates";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type USLicensePlatesSlice = {
  usLicensePlates: QuizSlice;
};

export const createUSLicensePlatesSlice = createQuizSlice({
  name: "usLicensePlates",
  targets: usLicensePlates.entries,
  subjectSubsets: usLicensePlates.subsets,
});
