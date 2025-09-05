import { labelQuizRegistryBase } from "../label-quiz";
import { memoize } from "../memoize";
import type { QuizRegistry, QuizSubset } from "../types";
import { philippinesProvincesPreprocessed } from "./preprocess";

export const philippinesProvincesRegistry = memoize(
  async (): Promise<QuizRegistry> => {
    const { subjects, targets } = labelQuizRegistryBase({
      collection: await philippinesProvincesPreprocessed(),
    });

    const subsets: QuizSubset[] = [
      {
        id: "north",
        label: "North",
        subjects: [
          "PH-AUR",
          "PH-BUL",
          "PH-PAM",
          "PH-BAN",
          "PH-ZMB",
          "PH-PAN",
          "PH-LUN",
          "PH-ILS",
          "PH-ILN",
          "PH-CAG",
          "PH-ISA",
          "PH-BTN",
          "PH-NUE",
          "PH-RIZ",
          "PH-QUI",
          "PH-NUV",
          "PH-BEN",
          "PH-IFU",
          "PH-MOU",
          "PH-TAR",
          "PH-APA",
          "PH-KAL",
          "PH-ABR",
          "PH-MNL",
        ],
      },
      {
        id: "east",
        label: "East",
        subjects: [
          "PH-SUN",
          "PH-SUR",
          "PH-SLE",
          "PH-LEY",
          "PH-EAS",
          "PH-BIL",
          "PH-WSA",
          "PH-QUE",
          "PH-CAN",
          "PH-CAS",
          "PH-ALB",
          "PH-SOR",
          "PH-BTG",
          "PH-CAV",
          "PH-NSA",
          "PH-MAS",
          "PH-MAD",
          "PH-CAT",
          "PH-LAG",
        ],
      },
      {
        id: "west",
        label: "West",
        subjects: [
          "PH-PLW",
          "PH-CAM",
          "PH-SIG",
          "PH-BOH",
          "PH-GUI",
          "PH-NEC",
          "PH-NER",
          "PH-CEB",
          "PH-AKL",
          "PH-ANT",
          "PH-ILI",
          "PH-CAP",
          "PH-ROM",
          "PH-MDR",
          "PH-MDC",
        ],
      },
      {
        id: "south",
        label: "South",
        subjects: [
          "PH-SLU",
          "PH-DAV",
          "PH-ZSI",
          "PH-AGN",
          "PH-MSR",
          "PH-LAN",
          "PH-ZAS",
          "PH-MSC",
          "PH-ZAN",
          "PH-LAS",
          "PH-MAG",
          "PH-SUK",
          "PH-SAR",
          "PH-DAS",
          "PH-COM",
          "PH-DAO",
          "PH-TAW",
          "PH-BAS",
          "PH-AGS",
          "PH-BUK",
          "PH-NCO",
          "PH-SCO",
        ],
      },
    ];

    return {
      name: "philippinesProvinces",
      subsets,
      subjects,
      targets,
    };
  }
);
