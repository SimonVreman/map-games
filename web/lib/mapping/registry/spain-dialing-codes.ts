import { QuizSubset } from "../subsets";

const spainDialingCodes = [
  95, 959, 956, 957, 953, 958, 950, 926, 924, 920, 927, 925, 923, 921, 922, 928,
  91, 969, 967, 968, 96, 964, 978, 976, 975, 974, 979, 973, 977, 972, 971, 93,
  949, 947, 941, 948, 945, 943, 94, 942, 98, 987, 983, 980, 988, 982, 981, 986,
];

function codesWithSecondDigit(codes: number[], digits: number[]): string[] {
  return codes
    .filter((code) => digits.includes(+code.toString()[1]))
    .map((c) => c.toString());
}

export const spainDialingCodeSubsets: QuizSubset[] = [
  {
    name: "nw",
    label: "North West",
    subjects: codesWithSecondDigit(spainDialingCodes, [8, 4]),
  },
  {
    name: "ne",
    label: "North East",
    subjects: codesWithSecondDigit(spainDialingCodes, [7, 3]),
  },
  {
    name: "se",
    label: "South East",
    subjects: codesWithSecondDigit(spainDialingCodes, [6, 5]),
  },
  {
    name: "sw",
    label: "West",
    subjects: codesWithSecondDigit(spainDialingCodes, [2, 1]),
  },
];
