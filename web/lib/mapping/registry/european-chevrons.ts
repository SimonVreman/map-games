import { Pattern, PatternEntry } from "@/types/registry";
import { albaniaPaths, albaniaMeta } from "../paths/europe/albania";
import { andorraMeta } from "../paths/europe/andorra";
import { austriaPaths, austriaMeta } from "../paths/europe/austria";
import { belarusPaths, belarusMeta } from "../paths/europe/belarus";
import { belgiumPaths, belgiumMeta } from "../paths/europe/belgium";
import {
  bosniaAndHerzegovinaPaths,
  bosniaAndHerzegovinaMeta,
} from "../paths/europe/bosnia-and-herzegovina";
import { bulgariaPaths, bulgariaMeta } from "../paths/europe/bulgaria";
import { croatiaPaths, croatiaMeta } from "../paths/europe/croatia";
import { cyprusPaths, cyprusMeta } from "../paths/europe/cyprus";
import { czechiaPaths, czechiaMeta } from "../paths/europe/czechia";
import { denmarkPaths, denmarkMeta } from "../paths/europe/denmark";
import { estoniaPaths, estoniaMeta } from "../paths/europe/estonia";
import { finlandPaths, finlandMeta } from "../paths/europe/finland";
import { francePaths, franceMeta } from "../paths/europe/france";
import { germanyPaths, germanyMeta } from "../paths/europe/germany";
import { greecePaths, greeceMeta } from "../paths/europe/greece";
import { hungaryPaths, hungaryMeta } from "../paths/europe/hungary";
import { icelandPaths, icelandMeta } from "../paths/europe/iceland";
import { irelandPaths, irelandMeta } from "../paths/europe/ireland";
import { italyPaths, italyMeta } from "../paths/europe/italy";
import { kosovoPaths, kosovoMeta } from "../paths/europe/kosovo";
import { latviaPaths, latviaMeta } from "../paths/europe/latvia";
import { liechtensteinMeta } from "../paths/europe/liechtenstein";
import { lithuaniaPaths, lithuaniaMeta } from "../paths/europe/lithuania";
import { luxembourgPaths, luxembourgMeta } from "../paths/europe/luxembourg";
import { maltaMeta } from "../paths/europe/malta";
import { moldovaPaths, moldovaMeta } from "../paths/europe/moldova";
import { monacoMeta } from "../paths/europe/monaco";
import { montenegroPaths, montenegroMeta } from "../paths/europe/montenegro";
import { netherlandsPaths, netherlandsMeta } from "../paths/europe/netherlands";
import {
  northMacedoniaPaths,
  northMacedoniaMeta,
} from "../paths/europe/north-macedonia";
import { norwayPaths, norwayMeta } from "../paths/europe/norway";
import { polandPaths, polandMeta } from "../paths/europe/poland";
import { portugalPaths, portugalMeta } from "../paths/europe/portugal";
import {
  republicOfSerbiaPaths,
  republicOfSerbiaMeta,
} from "../paths/europe/republic-of-serbia";
import { romaniaPaths, romaniaMeta } from "../paths/europe/romania";
import { russiaPaths, russiaMeta } from "../paths/europe/russia";
import { sanMarinoMeta } from "../paths/europe/san-marino";
import { slovakiaPaths, slovakiaMeta } from "../paths/europe/slovakia";
import { sloveniaPaths, sloveniaMeta } from "../paths/europe/slovenia";
import { spainPaths, spainMeta } from "../paths/europe/spain";
import { swedenPaths, swedenMeta } from "../paths/europe/sweden";
import { switzerlandPaths, switzerlandMeta } from "../paths/europe/switzerland";
import { turkeyPaths, turkeyMeta } from "../paths/europe/turkey";
import { ukrainePaths, ukraineMeta } from "../paths/europe/ukraine";
import {
  unitedKingdomPaths,
  unitedKingdomMeta,
} from "../paths/europe/united-kingdom";
import {
  createTapTarget,
  createTranslateNew as createTranslate,
} from "../pattern";
import { QuizSubset } from "../subsets";

const size = { width: 400, height: 400 };
const t = createTranslate();

const colors = {
  black: "#0a0a0a",
  blue: "#3b82f6",
  red: "#dc2626",
  yellow: "#facc15",
  white: "#fafafa",
} as const;

const createPattern = ({
  bg,
  fg,
}: {
  bg: keyof typeof colors;
  fg: keyof typeof colors;
}): Pattern => ({
  svg: `<svg width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="${colors[bg]}"/>
<path d="M221 79H99L179 200L99 321H221L301 200L221 79Z" fill="${colors[fg]}"/>
</svg>
`,
});

const patterns: Record<string, Pattern> = {
  blackOnWhite: createPattern({ bg: "white", fg: "black" }),
  redOnWhite: createPattern({ bg: "white", fg: "red" }),
  redOnYellow: createPattern({ bg: "yellow", fg: "red" }),
  whiteOnRed: createPattern({ bg: "red", fg: "white" }),
  whiteOnBlack: createPattern({ bg: "black", fg: "white" }),
  whiteOnBlue: createPattern({ bg: "blue", fg: "white" }),
  yellowOnBlack: createPattern({ bg: "black", fg: "yellow" }),
  yellowOnBlue: createPattern({ bg: "blue", fg: "yellow" }),
  yellowOnRed: createPattern({ bg: "red", fg: "yellow" }),
};

const entries: PatternEntry<typeof patterns>[] = [
  {
    name: "Albania",
    paths: albaniaPaths,
    meta: albaniaMeta,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnRed"],
    transform: t({ scale: 2, oy: 0.2 }),
  },
  {
    name: "Andorra",
    subjects: ["whiteOnBlue"],
    ...createTapTarget(andorraMeta),
  },
  {
    name: "Austria",
    paths: austriaPaths,
    meta: austriaMeta,
    subjects: ["redOnYellow", "whiteOnRed"],
    transform: t({ scale: 0.7, oy: 0.2 }),
  },
  {
    name: "Belarus",
    paths: belarusPaths,
    meta: belarusMeta,
    subjects: ["whiteOnRed"],
    transform: t(),
  },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    meta: bosniaAndHerzegovinaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Bulgaria",
    paths: bulgariaPaths,
    meta: bulgariaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["redOnWhite", "redOnYellow"],
    transform: t({ scale: 0.8, ox: 0.7, oy: 0.2 }),
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["redOnWhite"],
    transform: t({ scale: 0.8, oy: 0 }),
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["whiteOnRed"],
    transform: t(),
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["yellowOnBlack"],
    transform: t({ scale: 1.5 }),
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["redOnWhite", "whiteOnBlue"],
    transform: t({ scale: 0.12, oy: 0.4 }),
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Greece",
    paths: greecePaths,
    meta: greeceMeta,
    subjects: ["whiteOnBlack"],
    transform: t({ scale: 0.7, ox: 0.5 }),
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["redOnWhite", "whiteOnRed"],
    transform: t(),
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["yellowOnBlack"],
    transform: t(),
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["yellowOnBlack"],
    transform: t({ scale: 1.5, ox: 0.7 }),
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["whiteOnBlack", "whiteOnRed"],
    transform: t(),
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["blackOnWhite"],
    transform: t(),
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    meta: latviaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Liechtenstein",
    subjects: ["whiteOnBlack"],
    ...createTapTarget(liechtensteinMeta),
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    meta: lithuaniaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["redOnWhite", "yellowOnBlack", "yellowOnBlue"],
    transform: t({ scale: 1.3, oy: 0.2, ox: 0.1 }),
  },
  {
    name: "Malta",
    subjects: ["whiteOnBlack"],
    ...createTapTarget(maltaMeta),
  },
  {
    name: "Monaco",
    subjects: ["redOnWhite"],
    ...createTapTarget(monacoMeta),
  },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    meta: montenegroMeta,
    subjects: ["blackOnWhite", "redOnYellow"],
    transform: t({ scale: 1.3, oy: 0.3, ox: 0.2 }),
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["redOnWhite"],
    transform: t({ scale: 0.12, oy: 0.2 }),
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["yellowOnBlack"],
    transform: t({ scale: 0.5 }),
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    meta: moldovaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Poland",
    paths: polandPaths,
    meta: polandMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["yellowOnBlack"],
    transform: t({ scale: 0.3, ox: 0.75 }),
  },
  {
    name: "San Marino",
    subjects: ["redOnYellow"],
    ...createTapTarget(sanMarinoMeta),
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    meta: republicOfSerbiaMeta,
    subjects: ["blackOnWhite"],
    transform: t(),
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Russia",
    paths: russiaPaths,
    meta: russiaMeta,
    subjects: ["whiteOnRed"],
    transform: t({ scale: 0.1 }),
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["redOnWhite"],
    transform: t(),
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["blackOnWhite", "redOnWhite"],
    transform: t({ scale: 0.8, oy: 0.3 }),
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnBlue"],
    transform: t({ scale: 0.4, oy: 0.2 }),
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    meta: swedenMeta,
    subjects: ["yellowOnBlue", "yellowOnRed"],
    transform: t({ scale: 1.5, ox: 0.1 }),
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: ["whiteOnBlack"],
    transform: t(),
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    meta: turkeyMeta,
    subjects: ["redOnWhite", "yellowOnBlack"],
    transform: t({ scale: 0.5, oy: 0.3 }),
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["whiteOnRed"],
    transform: t({ oy: 0.2 }),
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["whiteOnBlack"],
    transform: t({ scale: 0.5, ox: 0.2 }),
  },
].sort((a, b) => (a.tiny === true ? 1 : b.tiny === true ? -1 : 0));

const subsets: QuizSubset[] = [
  {
    name: "all",
    label: "All",
    subjects: Object.keys(patterns),
  },
];

export const europeanChevrons = { patterns, entries, subsets, size };
