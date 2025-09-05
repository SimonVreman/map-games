import { labelQuizRegistryBase } from "../label-quiz";
import { memoize } from "../memoize";
import type { QuizRegistry, QuizSubset } from "../types";
import { spainDialingCodesPreprocessed } from "./preprocess";

export const spainDialingCodesRegistry = memoize(
  async (): Promise<QuizRegistry> => {
    const { subjects, targets } = labelQuizRegistryBase({
      collection: await spainDialingCodesPreprocessed(),
    });

    function codesWithSecondDigit(digits: number[]): string[] {
      return subjects
        .filter((subject) => digits.includes(+subject.id[1]))
        .map((c) => c.id);
    }

    const subsets: QuizSubset[] = [
      {
        id: "nw",
        label: "North West",
        subjects: codesWithSecondDigit([8, 4]),
      },
      {
        id: "ne",
        label: "North East",
        subjects: codesWithSecondDigit([7, 3]),
      },
      {
        id: "se",
        label: "South East",
        subjects: codesWithSecondDigit([6, 5]),
      },
      {
        id: "sw",
        label: "West",
        subjects: codesWithSecondDigit([2, 1]),
      },
    ];

    return {
      name: "spainDialingCodes",
      subsets,
      subjects,
      targets,
    };
  }
);
