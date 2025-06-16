import { RegionSubset } from "../../subsets";

export const brazilPhoneCodes = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
  37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
  65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
];

function codeStartsWith(codes: number[], digit: number): number[] {
  return codes.filter((code) => +code.toString()[0] === digit);
}

export const brazilPhoneCodeSubsets: RegionSubset[] = [
  { key: "1x", name: "1x", codes: codeStartsWith(brazilPhoneCodes, 1) },
  { key: "2x", name: "2x", codes: codeStartsWith(brazilPhoneCodes, 2) },
  { key: "3x", name: "3x", codes: codeStartsWith(brazilPhoneCodes, 3) },
  { key: "4x", name: "4x", codes: codeStartsWith(brazilPhoneCodes, 4) },
  { key: "5x", name: "5x", codes: codeStartsWith(brazilPhoneCodes, 5) },
  { key: "6x", name: "6x", codes: codeStartsWith(brazilPhoneCodes, 6) },
  { key: "7x", name: "7x", codes: codeStartsWith(brazilPhoneCodes, 7) },
  { key: "8x", name: "8x", codes: codeStartsWith(brazilPhoneCodes, 8) },
  { key: "9x", name: "9x", codes: codeStartsWith(brazilPhoneCodes, 9) },
];
