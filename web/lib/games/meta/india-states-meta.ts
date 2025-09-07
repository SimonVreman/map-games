import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  "IN-AN": {
    label: "Andaman and Nicobar"
  },
  "IN-AP": {
    label: "Andhra Pradesh"
  },
  "IN-AR": {
    label: "Arunachal Pradesh"
  },
  "IN-AS": {
    label: "Assam"
  },
  "IN-BR": {
    label: "Bihar"
  },
  "IN-CH": {
    label: "Chandigarh"
  },
  "IN-CT": {
    label: "Chhattisgarh"
  },
  "IN-DH": {
    label: "Dadra and Nagar Haveli and Daman and Diu"
  },
  "IN-DL": {
    label: "Delhi"
  },
  "IN-GA": {
    label: "Goa"
  },
  "IN-GJ": {
    label: "Gujarat"
  },
  "IN-HP": {
    label: "Himachal Pradesh"
  },
  "IN-HR": {
    label: "Haryana"
  },
  "IN-JH": {
    label: "Jharkhand"
  },
  "IN-JK": {
    label: "Jammu and Kashmir"
  },
  "IN-KA": {
    label: "Karnataka"
  },
  "IN-KL": {
    label: "Kerala"
  },
  "IN-LA": {
    label: "Ladakh"
  },
  "IN-LD": {
    label: "Lakshadweep"
  },
  "IN-MH": {
    label: "Maharashtra"
  },
  "IN-ML": {
    label: "Meghalaya"
  },
  "IN-MN": {
    label: "Manipur"
  },
  "IN-MP": {
    label: "Madhya Pradesh"
  },
  "IN-MZ": {
    label: "Mizoram"
  },
  "IN-NL": {
    label: "Nagaland"
  },
  "IN-OR": {
    label: "Odisha"
  },
  "IN-PB": {
    label: "Punjab"
  },
  "IN-PY": {
    label: "Puducherry"
  },
  "IN-RJ": {
    label: "Rajasthan"
  },
  "IN-SK": {
    label: "Sikkim"
  },
  "IN-TG": {
    label: "Telangana"
  },
  "IN-TN": {
    label: "Tamil Nadu"
  },
  "IN-TR": {
    label: "Tripura"
  },
  "IN-UP": {
    label: "Uttar Pradesh"
  },
  "IN-UT": {
    label: "Uttarakhand"
  },
  "IN-WB": {
    label: "West Bengal"
  }
};

const targets: QuizTarget[] = [
  {
    id: "IN-AN",
    subjects: ["IN-AN"],
  },
  {
    id: "IN-AP",
    subjects: ["IN-AP"],
  },
  {
    id: "IN-AR",
    subjects: ["IN-AR"],
  },
  {
    id: "IN-AS",
    subjects: ["IN-AS"],
  },
  {
    id: "IN-BR",
    subjects: ["IN-BR"],
  },
  {
    id: "IN-CH",
    subjects: ["IN-CH"],
  },
  {
    id: "IN-CT",
    subjects: ["IN-CT"],
  },
  {
    id: "IN-DH",
    subjects: ["IN-DH"],
  },
  {
    id: "IN-DL",
    subjects: ["IN-DL"],
  },
  {
    id: "IN-GA",
    subjects: ["IN-GA"],
  },
  {
    id: "IN-GJ",
    subjects: ["IN-GJ"],
  },
  {
    id: "IN-HP",
    subjects: ["IN-HP"],
  },
  {
    id: "IN-HR",
    subjects: ["IN-HR"],
  },
  {
    id: "IN-JH",
    subjects: ["IN-JH"],
  },
  {
    id: "IN-JK",
    subjects: ["IN-JK"],
  },
  {
    id: "IN-KA",
    subjects: ["IN-KA"],
  },
  {
    id: "IN-KL",
    subjects: ["IN-KL"],
  },
  {
    id: "IN-LA",
    subjects: ["IN-LA"],
  },
  {
    id: "IN-LD",
    subjects: ["IN-LD"],
  },
  {
    id: "IN-MH",
    subjects: ["IN-MH"],
  },
  {
    id: "IN-ML",
    subjects: ["IN-ML"],
  },
  {
    id: "IN-MN",
    subjects: ["IN-MN"],
  },
  {
    id: "IN-MP",
    subjects: ["IN-MP"],
  },
  {
    id: "IN-MZ",
    subjects: ["IN-MZ"],
  },
  {
    id: "IN-NL",
    subjects: ["IN-NL"],
  },
  {
    id: "IN-OR",
    subjects: ["IN-OR"],
  },
  {
    id: "IN-PB",
    subjects: ["IN-PB"],
  },
  {
    id: "IN-PY",
    subjects: ["IN-PY"],
  },
  {
    id: "IN-RJ",
    subjects: ["IN-RJ"],
  },
  {
    id: "IN-SK",
    subjects: ["IN-SK"],
  },
  {
    id: "IN-TG",
    subjects: ["IN-TG"],
  },
  {
    id: "IN-TN",
    subjects: ["IN-TN"],
  },
  {
    id: "IN-TR",
    subjects: ["IN-TR"],
  },
  {
    id: "IN-UP",
    subjects: ["IN-UP"],
  },
  {
    id: "IN-UT",
    subjects: ["IN-UT"],
  },
  {
    id: "IN-WB",
    subjects: ["IN-WB"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "north",
    label: "North",
    subjects: ["IN-LA","IN-AR","IN-SK","IN-WB","IN-AS","IN-UT","IN-NL","IN-MN","IN-MZ","IN-TR","IN-ML","IN-PB","IN-HP","IN-JK","IN-BR","IN-UP","IN-JH","IN-DL","IN-CH","IN-HR"],
  },
  {
    id: "south",
    label: "South",
    subjects: ["IN-RJ","IN-GJ","IN-AP","IN-OR","IN-MH","IN-GA","IN-KA","IN-KL","IN-PY","IN-TN","IN-LD","IN-AN","IN-MP","IN-CT","IN-TG","IN-DH"],
  }
];

export const indiaStates = { subjects, targets, subsets };
