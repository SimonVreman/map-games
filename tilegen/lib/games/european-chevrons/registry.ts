import type { QuizTarget, VectorQuizSubject } from "../types";

const colors = {
  black: "#0a0a0a",
  blue: "#3b82f6",
  red: "#dc2626",
  yellow: "#facc15",
  white: "#fafafa",
} as const;

const size = { width: 400, height: 400 };

const createSvg = ({
  bg,
  fg,
}: {
  bg: keyof typeof colors;
  fg: keyof typeof colors;
}) =>
  `<svg viewBox="0 0 400 400">
<path d="M0 0H400V400H0V0Z" fill="${colors[bg]}"/>
<path d="M221 79H99L179 200L99 321H221L301 200L221 79Z" fill="${colors[fg]}"/>
</svg>`;

const smap = {
  blackOnWhite: {
    id: "blackOnWhite",
    svg: createSvg({ bg: "white", fg: "black" }),
  },
  redOnWhite: {
    id: "redOnWhite",
    svg: createSvg({ bg: "white", fg: "red" }),
  },
  redOnYellow: {
    id: "redOnYellow",
    svg: createSvg({ bg: "yellow", fg: "red" }),
  },
  whiteOnRed: {
    id: "whiteOnRed",
    svg: createSvg({ bg: "red", fg: "white" }),
  },
  whiteOnBlack: {
    id: "whiteOnBlack",
    svg: createSvg({ bg: "black", fg: "white" }),
  },
  whiteOnBlue: {
    id: "whiteOnBlue",
    svg: createSvg({ bg: "blue", fg: "white" }),
  },
  yellowOnBlack: {
    id: "yellowOnBlack",
    svg: createSvg({ bg: "black", fg: "yellow" }),
  },
  yellowOnBlue: {
    id: "yellowOnBlue",
    svg: createSvg({ bg: "blue", fg: "yellow" }),
  },
  yellowOnRed: {
    id: "yellowOnRed",
    svg: createSvg({ bg: "red", fg: "yellow" }),
  },
} satisfies Record<string, VectorQuizSubject>;

const subjects: VectorQuizSubject[] = Object.values(smap);

const targets: QuizTarget[] = [
  {
    id: "Albania",
    label: "Albania",
    subjects: [smap.redOnWhite, smap.whiteOnBlack, smap.whiteOnRed],
    transform: { scale: 2, oy: 0.2 },
  },
  {
    id: "Andorra",
    label: "Andorra",
    subjects: [smap.whiteOnBlue],
    transform: { scale: 3 },
  },
  {
    id: "Austria",
    label: "Austria",
    subjects: [smap.redOnYellow, smap.whiteOnRed],
    transform: { scale: 0.7, oy: 0.2 },
  },
  {
    id: "Belarus",
    label: "Belarus",
    subjects: [smap.whiteOnRed],
  },
  {
    id: "Belgium",
    label: "Belgium",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Bosnia and Herzegovina",
    label: "Bosnia and Herzegovina",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Bulgaria",
    label: "Bulgaria",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Croatia",
    label: "Croatia",
    subjects: [smap.redOnWhite, smap.redOnYellow],
    transform: { scale: 0.8, ox: 0.7, oy: 0.2 },
  },
  {
    id: "Cyprus",
    label: "Cyprus",
    subjects: [smap.redOnWhite],
    transform: { scale: 0.8, oy: 0 },
  },
  {
    id: "Czechia",
    label: "Czechia",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Denmark",
    label: "Denmark",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Estonia",
    label: "Estonia",
    subjects: [smap.whiteOnRed],
  },
  {
    id: "Finland",
    label: "Finland",
    subjects: [smap.yellowOnBlack],
    transform: { scale: 1.5 },
  },
  {
    id: "France",
    label: "France",
    subjects: [smap.redOnWhite, smap.whiteOnBlue],
    transform: { scale: 0.12, oy: 0.4 },
  },
  {
    id: "Germany",
    label: "Germany",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Greece",
    label: "Greece",
    subjects: [smap.whiteOnBlack],
    transform: { scale: 0.7, ox: 0.5 },
  },
  {
    id: "Hungary",
    label: "Hungary",
    subjects: [smap.redOnWhite, smap.whiteOnRed],
  },
  {
    id: "Iceland",
    label: "Iceland",
    subjects: [smap.yellowOnBlack],
  },
  {
    id: "Ireland",
    label: "Ireland",
    subjects: [smap.yellowOnBlack],
    transform: { scale: 1.5, ox: 0.7 },
  },
  {
    id: "Italy",
    label: "Italy",
    subjects: [smap.whiteOnBlack, smap.whiteOnRed],
  },
  {
    id: "Kosovo",
    label: "Kosovo",
    subjects: [smap.blackOnWhite],
  },
  {
    id: "Latvia",
    label: "Latvia",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Liechtenstein",
    label: "Liechtenstein",
    subjects: [smap.whiteOnBlack],
    transform: { scale: 3 },
  },
  {
    id: "Lithuania",
    label: "Lithuania",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Luxembourg",
    label: "Luxembourg",
    subjects: [smap.redOnWhite, smap.yellowOnBlack, smap.yellowOnBlue],
    transform: { scale: 1.3, oy: 0.2, ox: 0.1 },
  },
  {
    id: "Malta",
    label: "Malta",
    subjects: [smap.whiteOnBlack],
    transform: { scale: 3 },
  },
  {
    id: "Monaco",
    label: "Monaco",
    subjects: [smap.redOnWhite],
    transform: { scale: 3 },
  },
  {
    id: "Montenegro",
    label: "Montenegro",
    subjects: [smap.blackOnWhite, smap.redOnYellow],
    transform: { scale: 1.3, oy: 0.3, ox: 0.2 },
  },
  {
    id: "Netherlands",
    label: "Netherlands",
    subjects: [smap.redOnWhite],
    transform: { scale: 0.12, oy: 0.2 },
  },
  {
    id: "North Macedonia",
    label: "North Macedonia",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Norway",
    label: "Norway",
    subjects: [smap.yellowOnBlack],
    transform: { scale: 0.5 },
  },
  {
    id: "Moldova",
    label: "Moldova",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Poland",
    label: "Poland",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Portugal",
    label: "Portugal",
    subjects: [smap.yellowOnBlack],
    transform: { scale: 0.3, ox: 0.75 },
  },
  {
    id: "San Marino",
    label: "San Marino",
    subjects: [smap.redOnYellow],
    transform: { scale: 3 },
  },
  {
    id: "Serbia",
    label: "Serbia",
    subjects: [smap.blackOnWhite],
  },
  {
    id: "Romania",
    label: "Romania",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Russia",
    label: "Russia",
    subjects: [smap.whiteOnRed],
    transform: { scale: 0.1 },
  },
  {
    id: "Slovakia",
    label: "Slovakia",
    subjects: [smap.redOnWhite],
  },
  {
    id: "Slovenia",
    label: "Slovenia",
    subjects: [smap.blackOnWhite, smap.redOnWhite],
    transform: { scale: 0.8, oy: 0.3 },
  },
  {
    id: "Spain",
    label: "Spain",
    subjects: [smap.redOnWhite, smap.whiteOnBlack, smap.whiteOnBlue],
    transform: { scale: 0.4, oy: 0.2 },
  },
  {
    id: "Sweden",
    label: "Sweden",
    subjects: [smap.yellowOnBlue, smap.yellowOnRed],
    transform: { scale: 1.5, ox: 0.1 },
  },
  {
    id: "Switzerland",
    label: "Switzerland",
    subjects: [smap.whiteOnBlack],
  },
  {
    id: "Turkey",
    label: "Turkey",
    subjects: [smap.redOnWhite, smap.yellowOnBlack],
    transform: { scale: 0.5, oy: 0.3 },
  },
  {
    id: "Ukraine",
    label: "Ukraine",
    subjects: [smap.whiteOnRed],
    transform: { oy: 0.2 },
  },
  {
    id: "United Kingdom",
    label: "United Kingdom",
    subjects: [smap.whiteOnBlack],
    transform: { scale: 0.5, ox: 0.2 },
  },
];

export const europeanChevrons = {
  name: "europeanChevrons",
  subjects,
  targets,
  size,
};
