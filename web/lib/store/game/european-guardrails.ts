import { europeanGuardrails } from "@/lib/games/meta/european-guardrails-meta";
import { createQuizSlice, QuizSlice } from "../slice/quiz-slice";

export type EuropeanGuardrailsSlice = {
  europeanGuardrails: QuizSlice;
};

export const createEuropeanGuardrailsSlice = createQuizSlice({
  name: "europeanGuardrails",
  ...europeanGuardrails,
});
