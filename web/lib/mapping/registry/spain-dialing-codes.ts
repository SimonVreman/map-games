import type { SpainDialingCode } from "../paths/spain/dialing-codes";
import { QuizSubset } from "../subsets";

const codes = [
  95, 959, 956, 957, 953, 958, 950, 926, 924, 920, 927, 925, 923, 921, 922, 928,
  91, 969, 967, 968, 96, 964, 978, 976, 975, 974, 979, 973, 977, 972, 971, 93,
  949, 947, 941, 948, 945, 943, 94, 942, 98, 987, 983, 980, 988, 982, 981, 986,
] as const;

const stringifiedCodes = codes.map((code) =>
  code.toString()
) as `${(typeof codes)[number]}`[] satisfies SpainDialingCode[];

function codesWithSecondDigit(digits: number[]): string[] {
  return stringifiedCodes.filter((code) => digits.includes(+code[1]));
}

export const spainDialingCodeSubsets: QuizSubset[] = [
  {
    name: "nw",
    label: "North West",
    subjects: codesWithSecondDigit([8, 4]),
  },
  {
    name: "ne",
    label: "North East",
    subjects: codesWithSecondDigit([7, 3]),
  },
  {
    name: "se",
    label: "South East",
    subjects: codesWithSecondDigit([6, 5]),
  },
  {
    name: "sw",
    label: "West",
    subjects: codesWithSecondDigit([2, 1]),
  },
];
