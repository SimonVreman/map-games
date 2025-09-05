import { labelQuizRegistryBase } from "../label-quiz";
import { memoize } from "../memoize";
import type { QuizRegistry, QuizSubset } from "../types";
import { brazilDialingCodesPreprocessed } from "./preprocess";

export const brazilDialingCodesRegistry = memoize(
  async (): Promise<QuizRegistry> => {
    const { subjects, targets } = labelQuizRegistryBase({
      collection: await brazilDialingCodesPreprocessed(),
    });

    function codeStartsWith(digit: number): string[] {
      return subjects.filter((s) => +s.id[0] === digit).map((s) => s.id);
    }

    const subsets: QuizSubset[] = [
      { id: "1x", label: "1x", subjects: codeStartsWith(1) },
      { id: "2x", label: "2x", subjects: codeStartsWith(2) },
      { id: "3x", label: "3x", subjects: codeStartsWith(3) },
      { id: "4x", label: "4x", subjects: codeStartsWith(4) },
      { id: "5x", label: "5x", subjects: codeStartsWith(5) },
      { id: "6x", label: "6x", subjects: codeStartsWith(6) },
      { id: "7x", label: "7x", subjects: codeStartsWith(7) },
      { id: "8x", label: "8x", subjects: codeStartsWith(8) },
      { id: "9x", label: "9x", subjects: codeStartsWith(9) },
    ];

    return {
      name: "brazilDialingCodes",
      subsets,
      subjects,
      targets,
    };
  }
);
