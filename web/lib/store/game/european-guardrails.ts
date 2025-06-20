import { europeanGuardrails } from "@/lib/mapping/registry/european-guardrails";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanGuardrailsSlice = {
  europeanGuardrails: QuizSlice;
};

export const createEuropeanGuardrailsSlice = createQuizSlice({
  name: "europeanGuardrails",
  targets: europeanGuardrails.entries,
  subjectSubsets: europeanGuardrails.subsets,
});
