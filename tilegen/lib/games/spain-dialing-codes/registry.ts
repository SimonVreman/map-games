import type { LabelQuizSubject, QuizSubset, QuizTarget } from "../types";

const subjects: LabelQuizSubject[] = [
  { id: "95", label: "95" },
  { id: "959", label: "959" },
  { id: "956", label: "956" },
  { id: "957", label: "957" },
  { id: "953", label: "953" },
  { id: "958", label: "958" },
  { id: "950", label: "950" },
  { id: "926", label: "926" },
  { id: "924", label: "924" },
  { id: "920", label: "920" },
  { id: "927", label: "927" },
  { id: "925", label: "925" },
  { id: "923", label: "923" },
  { id: "921", label: "921" },
  { id: "922", label: "922" },
  { id: "928", label: "928" },
  { id: "91", label: "91" },
  { id: "969", label: "969" },
  { id: "967", label: "967" },
  { id: "968", label: "968" },
  { id: "96", label: "96" },
  { id: "964", label: "964" },
  { id: "978", label: "978" },
  { id: "976", label: "976" },
  { id: "975", label: "975" },
  { id: "974", label: "974" },
  { id: "979", label: "979" },
  { id: "973", label: "973" },
  { id: "977", label: "977" },
  { id: "972", label: "972" },
  { id: "971", label: "971" },
  { id: "93", label: "93" },
  { id: "949", label: "949" },
  { id: "947", label: "947" },
  { id: "941", label: "941" },
  { id: "948", label: "948" },
  { id: "945", label: "945" },
  { id: "943", label: "943" },
  { id: "94", label: "94" },
  { id: "942", label: "942" },
  { id: "98", label: "98" },
  { id: "987", label: "987" },
  { id: "983", label: "983" },
  { id: "980", label: "980" },
  { id: "988", label: "988" },
  { id: "982", label: "982" },
  { id: "981", label: "981" },
  { id: "986", label: "986" },
];

const targets: QuizTarget[] = subjects.map((s) => ({ ...s, subjects: [s] }));

function codesWithSecondDigit(digits: number[]): string[] {
  return subjects
    .filter((subject) => digits.includes(+subject.id[1]))
    .map((c) => c.id);
}

const subsets: QuizSubset[] = [
  {
    id: "nw",
    label: "North West",
    subjects: codesWithSecondDigit([8, 4]),
  },
  {
    id: "ne",
    label: "North East",
    subjects: codesWithSecondDigit([7, 3]),
  },
  {
    id: "se",
    label: "South East",
    subjects: codesWithSecondDigit([6, 5]),
  },
  {
    id: "sw",
    label: "West",
    subjects: codesWithSecondDigit([2, 1]),
  },
];

export const spainDialingCodes = {
  name: "spainDialingCodes",
  targets,
  subjects,
  subsets,
};
