import { labelQuizRegistryBase } from "../label-quiz";
import { memoize } from "../memoize";
import type { QuizRegistry, QuizSubset } from "../types";
import { vietnamProvincesPreprocessed } from "./preprocess";

export const vietnamProvincesRegistry = memoize(
  async (): Promise<QuizRegistry> => {
    const { subjects, targets } = labelQuizRegistryBase({
      collection: await vietnamProvincesPreprocessed(),
    });

    const subsets: QuizSubset[] = [
      {
        id: "north",
        label: "North",
        subjects: [
          "VN-71",
          "VN-05",
          "VN-21",
          "VN-22",
          "VN-04",
          "VN-02",
          "VN-01",
          "VN-09",
          "VN-13",
          "VN-18",
          "VN-HP",
          "VN-07",
          "VN-68",
          "VN-HN",
          "VN-66",
          "VN-56",
          "VN-69",
        ],
      },
      {
        id: "middle",
        label: "Middle",
        subjects: [
          "VN-33",
          "VN-30",
          "VN-23",
          "VN-25",
          "VN-26",
          "VN-34",
          "VN-29",
          "VN-DN",
          "VN-35",
        ],
      },
      {
        id: "south",
        label: "South",
        subjects: [
          "VN-37",
          "VN-45",
          "VN-44",
          "VN-SG",
          "VN-59",
          "VN-49",
          "VN-39",
          "VN-CT",
        ],
      },
    ];
    return {
      name: "vietnamProvinces",
      subsets,
      subjects,
      targets,
    };
  }
);
