import { labelQuizRegistryBase } from "../label-quiz";
import { memoize } from "../memoize";
import type { QuizRegistry, QuizSubset } from "../types";
import { indiaStatesPreprocessed } from "./preprocess";

export const indiaStatesRegistry = memoize(async (): Promise<QuizRegistry> => {
  const { subjects, targets } = labelQuizRegistryBase({
    collection: await indiaStatesPreprocessed(),
  });

  for (const t of targets) {
    if (["IN-PY", "IN-LD", "IN-DH", "IN-CH", "IN-DL"].includes(t.id))
      t.tapArea = true;
  }

  const subsets: QuizSubset[] = [
    {
      id: "north",
      label: "North",
      subjects: [
        "IN-LA",
        "IN-AR",
        "IN-SK",
        "IN-WB",
        "IN-AS",
        "IN-UT",
        "IN-NL",
        "IN-MN",
        "IN-MZ",
        "IN-TR",
        "IN-ML",
        "IN-PB",
        "IN-HP",
        "IN-JK",
        "IN-BR",
        "IN-UP",
        "IN-JH",
        "IN-DL",
        "IN-CH",
        "IN-HR",
      ],
    },
    {
      id: "south",
      label: "South",
      subjects: [
        "IN-RJ",
        "IN-GJ",
        "IN-AP",
        "IN-OR",
        "IN-MH",
        "IN-GA",
        "IN-KA",
        "IN-KL",
        "IN-PY",
        "IN-TN",
        "IN-LD",
        "IN-AN",
        "IN-MP",
        "IN-CT",
        "IN-TG",
        "IN-DH",
      ],
    },
  ];

  return {
    name: "indiaStates",
    subsets,
    subjects,
    targets,
  };
});
