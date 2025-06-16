import { RegionSubset } from "../../subsets";

export const spainPhoneCodes = [
  95, 959, 956, 957, 953, 958, 950, 926, 924, 920, 927, 925, 923, 921, 922, 928,
  91, 969, 967, 968, 96, 964, 978, 976, 975, 974, 979, 973, 977, 972, 971, 93,
  949, 947, 941, 948, 945, 943, 94, 942, 98, 987, 983, 980, 988, 982, 981, 986,
];

function codesWithSecondDigit(codes: number[], digits: number[]): number[] {
  return codes.filter((code) => digits.includes(+code.toString()[1]));
}

export const spainPhoneCodeSubsets: RegionSubset[] = [
  {
    key: "nw",
    name: "North West",
    codes: codesWithSecondDigit(spainPhoneCodes, [8, 4]),
  },
  {
    key: "ne",
    name: "North East",
    codes: codesWithSecondDigit(spainPhoneCodes, [7, 3]),
  },
  {
    key: "se",
    name: "South East",
    codes: codesWithSecondDigit(spainPhoneCodes, [6, 5]),
  },
  {
    key: "sw",
    name: "West",
    codes: codesWithSecondDigit(spainPhoneCodes, [2, 1]),
  },
];
