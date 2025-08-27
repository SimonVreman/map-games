import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  blackOnWhite: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#fafafa\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#0a0a0a\"/>\n</svg>"
  },
  redOnWhite: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#fafafa\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#dc2626\"/>\n</svg>"
  },
  redOnYellow: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#facc15\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#dc2626\"/>\n</svg>"
  },
  whiteOnRed: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#dc2626\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#fafafa\"/>\n</svg>"
  },
  whiteOnBlack: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#0a0a0a\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#fafafa\"/>\n</svg>"
  },
  whiteOnBlue: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#3b82f6\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#fafafa\"/>\n</svg>"
  },
  yellowOnBlack: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#0a0a0a\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#facc15\"/>\n</svg>"
  },
  yellowOnBlue: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#3b82f6\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#facc15\"/>\n</svg>"
  },
  yellowOnRed: {
    svg: "<svg viewBox=\"0 0 400 400\">\n<path d=\"M0 0H400V400H0V0Z\" fill=\"#dc2626\"/>\n<path d=\"M221 79H99L179 200L99 321H221L301 200L221 79Z\" fill=\"#facc15\"/>\n</svg>"
  }
};

const targets: QuizTarget[] = [
  {
    id: "Albania",
    subjects: ["redOnWhite","whiteOnBlack","whiteOnRed"],
  },
  {
    id: "Andorra",
    subjects: ["whiteOnBlue"],
  },
  {
    id: "Austria",
    subjects: ["redOnYellow","whiteOnRed"],
  },
  {
    id: "Belarus",
    subjects: ["whiteOnRed"],
  },
  {
    id: "Belgium",
    subjects: ["redOnWhite"],
  },
  {
    id: "Bosnia and Herzegovina",
    subjects: ["redOnWhite"],
  },
  {
    id: "Bulgaria",
    subjects: ["redOnWhite"],
  },
  {
    id: "Croatia",
    subjects: ["redOnWhite","redOnYellow"],
  },
  {
    id: "Cyprus",
    subjects: ["redOnWhite"],
  },
  {
    id: "Czechia",
    subjects: ["redOnWhite"],
  },
  {
    id: "Denmark",
    subjects: ["redOnWhite"],
  },
  {
    id: "Estonia",
    subjects: ["whiteOnRed"],
  },
  {
    id: "Finland",
    subjects: ["yellowOnBlack"],
  },
  {
    id: "France",
    subjects: ["redOnWhite","whiteOnBlue"],
  },
  {
    id: "Germany",
    subjects: ["redOnWhite"],
  },
  {
    id: "Greece",
    subjects: ["whiteOnBlack"],
  },
  {
    id: "Hungary",
    subjects: ["redOnWhite","whiteOnRed"],
  },
  {
    id: "Iceland",
    subjects: ["yellowOnBlack"],
  },
  {
    id: "Ireland",
    subjects: ["yellowOnBlack"],
  },
  {
    id: "Italy",
    subjects: ["whiteOnBlack","whiteOnRed"],
  },
  {
    id: "Kosovo",
    subjects: ["blackOnWhite"],
  },
  {
    id: "Latvia",
    subjects: ["redOnWhite"],
  },
  {
    id: "Liechtenstein",
    subjects: ["whiteOnBlack"],
  },
  {
    id: "Lithuania",
    subjects: ["redOnWhite"],
  },
  {
    id: "Luxembourg",
    subjects: ["redOnWhite","yellowOnBlack","yellowOnBlue"],
  },
  {
    id: "Malta",
    subjects: ["whiteOnBlack"],
  },
  {
    id: "Monaco",
    subjects: ["redOnWhite"],
  },
  {
    id: "Montenegro",
    subjects: ["blackOnWhite","redOnYellow"],
  },
  {
    id: "Netherlands",
    subjects: ["redOnWhite"],
  },
  {
    id: "North Macedonia",
    subjects: ["redOnWhite"],
  },
  {
    id: "Norway",
    subjects: ["yellowOnBlack"],
  },
  {
    id: "Moldova",
    subjects: ["redOnWhite"],
  },
  {
    id: "Poland",
    subjects: ["redOnWhite"],
  },
  {
    id: "Portugal",
    subjects: ["yellowOnBlack"],
  },
  {
    id: "San Marino",
    subjects: ["redOnYellow"],
  },
  {
    id: "Serbia",
    subjects: ["blackOnWhite"],
  },
  {
    id: "Romania",
    subjects: ["redOnWhite"],
  },
  {
    id: "Russia",
    subjects: ["whiteOnRed"],
  },
  {
    id: "Slovakia",
    subjects: ["redOnWhite"],
  },
  {
    id: "Slovenia",
    subjects: ["blackOnWhite","redOnWhite"],
  },
  {
    id: "Spain",
    subjects: ["redOnWhite","whiteOnBlack","whiteOnBlue"],
  },
  {
    id: "Sweden",
    subjects: ["yellowOnBlue","yellowOnRed"],
  },
  {
    id: "Switzerland",
    subjects: ["whiteOnBlack"],
  },
  {
    id: "Turkey",
    subjects: ["redOnWhite","yellowOnBlack"],
  },
  {
    id: "Ukraine",
    subjects: ["whiteOnRed"],
  },
  {
    id: "United Kingdom",
    subjects: ["whiteOnBlack"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "all",
    label: "All",
    subjects: ["blackOnWhite","redOnWhite","redOnYellow","whiteOnRed","whiteOnBlack","whiteOnBlue","yellowOnBlack","yellowOnBlue","yellowOnRed"],
  }
];

export const europeanChevrons = { subjects, targets, subsets };
