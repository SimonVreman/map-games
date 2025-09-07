import { labelQuizRegistryBase } from "../label-quiz";
import { memoize } from "../memoize";
import type { QuizRegistry, QuizSubset } from "../types";
import { thailandProvincesPreprocessed } from "./preprocess";

export const thailandProvincesRegistry = memoize(
  async (): Promise<QuizRegistry> => {
    const { subjects, targets } = labelQuizRegistryBase({
      collection: await thailandProvincesPreprocessed(),
    });

    const subsets: QuizSubset[] = [
      {
        id: "north",
        label: "North",
        subjects: [
          "TH-57",
          "TH-50",
          "TH-58",
          "TH-63",
          "TH-56",
          "TH-55",
          "TH-53",
          "TH-65",
          "TH-42",
          "TH-62",
          "TH-52",
          "TH-64",
          "TH-66",
          "TH-54",
          "TH-51",
        ],
      },
      {
        id: "east",
        label: "East",
        subjects: [
          "TH-32",
          "TH-33",
          "TH-34",
          "TH-27",
          "TH-31",
          "TH-23",
          "TH-22",
          "TH-38",
          "TH-43",
          "TH-48",
          "TH-49",
          "TH-37",
          "TH-40",
          "TH-47",
          "TH-30",
          "TH-46",
          "TH-45",
          "TH-44",
          "TH-39",
          "TH-41",
          "TH-67",
          "TH-36",
          "TH-35",
        ],
      },
      {
        id: "central",
        label: "Central",
        subjects: [
          "TH-71",
          "TH-70",
          "TH-75",
          "TH-74",
          "TH-10",
          "TH-11",
          "TH-24",
          "TH-20",
          "TH-21",
          "TH-72",
          "TH-17",
          "TH-18",
          "TH-15",
          "TH-19",
          "TH-26",
          "TH-13",
          "TH-61",
          "TH-16",
          "TH-14",
          "TH-12",
          "TH-73",
          "TH-60",
          "TH-25",
        ],
      },
      {
        id: "south",
        label: "South",
        subjects: [
          "TH-91",
          "TH-90",
          "TH-95",
          "TH-96",
          "TH-77",
          "TH-76",
          "TH-86",
          "TH-85",
          "TH-82",
          "TH-81",
          "TH-92",
          "TH-94",
          "TH-93",
          "TH-80",
          "TH-84",
          "TH-83",
        ],
      },
    ];

    return {
      name: "thailandProvinces",
      subsets,
      subjects,
      targets,
    };
  }
);
