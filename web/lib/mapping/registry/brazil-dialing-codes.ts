import type { BrazilDialingCode } from "../paths/brazil/dialing-codes";
import { QuizSubset } from "../subsets";

const codes = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
  37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
  65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
] as const;

const stringifiedCodes = codes.map((code) =>
  code.toString()
) as `${(typeof codes)[number]}`[] satisfies BrazilDialingCode[];

function codeStartsWith(digit: number): string[] {
  return stringifiedCodes.filter((code) => +code[0] === digit);
}

export const brazilDialingCodeSubsets: QuizSubset[] = [
  { name: "1x", label: "1x", subjects: codeStartsWith(1) },
  { name: "2x", label: "2x", subjects: codeStartsWith(2) },
  { name: "3x", label: "3x", subjects: codeStartsWith(3) },
  { name: "4x", label: "4x", subjects: codeStartsWith(4) },
  { name: "5x", label: "5x", subjects: codeStartsWith(5) },
  { name: "6x", label: "6x", subjects: codeStartsWith(6) },
  { name: "7x", label: "7x", subjects: codeStartsWith(7) },
  { name: "8x", label: "8x", subjects: codeStartsWith(8) },
  { name: "9x", label: "9x", subjects: codeStartsWith(9) },
];
