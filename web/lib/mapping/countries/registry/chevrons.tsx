import { Pattern, PatternEntry } from "@/types/registry";
import { albaniaPaths, albaniaMeta } from "../paths/albania";
import { andorraMeta } from "../paths/andorra";
import { austriaPaths, austriaMeta } from "../paths/austria";
import { belarusPaths, belarusMeta } from "../paths/belarus";
import { belgiumPaths, belgiumMeta } from "../paths/belgium";
import {
  bosniaAndHerzegovinaPaths,
  bosniaAndHerzegovinaMeta,
} from "../paths/bosnia-and-herzegovina";
import { bulgariaPaths, bulgariaMeta } from "../paths/bulgaria";
import { croatiaPaths, croatiaMeta } from "../paths/croatia";
import { cyprusPaths, cyprusMeta } from "../paths/cyprus";
import { czechiaPaths, czechiaMeta } from "../paths/czechia";
import { denmarkPaths, denmarkMeta } from "../paths/denmark";
import { estoniaPaths, estoniaMeta } from "../paths/estonia";
import { finlandPaths, finlandMeta } from "../paths/finland";
import { francePaths, franceMeta } from "../paths/france";
import { germanyPaths, germanyMeta } from "../paths/germany";
import { greecePaths, greeceMeta } from "../paths/greece";
import { hungaryPaths, hungaryMeta } from "../paths/hungary";
import { icelandPaths, icelandMeta } from "../paths/iceland";
import { irelandPaths, irelandMeta } from "../paths/ireland";
import { italyPaths, italyMeta } from "../paths/italy";
import { kosovoPaths, kosovoMeta } from "../paths/kosovo";
import { latviaPaths, latviaMeta } from "../paths/latvia";
import { liechtensteinMeta } from "../paths/liechtenstein";
import { lithuaniaPaths, lithuaniaMeta } from "../paths/lithuania";
import { luxembourgPaths, luxembourgMeta } from "../paths/luxembourg";
import { maltaMeta } from "../paths/malta";
import { moldovaPaths, moldovaMeta } from "../paths/moldova";
import { monacoMeta } from "../paths/monaco";
import { montenegroPaths, montenegroMeta } from "../paths/montenegro";
import { netherlandsPaths, netherlandsMeta } from "../paths/netherlands";
import {
  northMacedoniaPaths,
  northMacedoniaMeta,
} from "../paths/north-macedonia";
import { norwayPaths, norwayMeta } from "../paths/norway";
import { polandPaths, polandMeta } from "../paths/poland";
import { portugalPaths, portugalMeta } from "../paths/portugal";
import {
  republicOfSerbiaPaths,
  republicOfSerbiaMeta,
} from "../paths/republic-of-serbia";
import { romaniaPaths, romaniaMeta } from "../paths/romania";
import { russiaPaths, russiaMeta } from "../paths/russia";
import { sanMarinoMeta } from "../paths/san-marino";
import { slovakiaPaths, slovakiaMeta } from "../paths/slovakia";
import { sloveniaPaths, sloveniaMeta } from "../paths/slovenia";
import { spainPaths, spainMeta } from "../paths/spain";
import { swedenPaths, swedenMeta } from "../paths/sweden";
import { switzerlandPaths, switzerlandMeta } from "../paths/switzerland";
import { turkeyPaths, turkeyMeta } from "../paths/turkey";
import { ukrainePaths, ukraineMeta } from "../paths/ukraine";
import { unitedKingdomPaths, unitedKingdomMeta } from "../paths/united-kingdom";
import { createTapTarget, createTranslate } from "./pattern";

const size = { width: 400, height: 400 };
const t = createTranslate(size);

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
  background: { light: colors[bg], dark: colors[bg] },
  paths: [
    {
      path: "M221 79H99L179 200L99 321H221L301 200L221 79Z",
      fill: colors[fg],
    },
  ],
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
    transform: t(albaniaMeta, { scale: 2, oy: 0.2 }),
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
    transform: t(austriaMeta, { scale: 0.7, oy: 0.2 }),
  },
  {
    name: "Belarus",
    paths: belarusPaths,
    meta: belarusMeta,
    subjects: ["whiteOnRed"],
    transform: t(belarusMeta),
  },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["redOnWhite"],
    transform: t(belgiumMeta),
  },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    meta: bosniaAndHerzegovinaMeta,
    subjects: ["redOnWhite"],
    transform: t(bosniaAndHerzegovinaMeta),
  },
  {
    name: "Bulgaria",
    paths: bulgariaPaths,
    meta: bulgariaMeta,
    subjects: ["redOnWhite"],
    transform: t(bulgariaMeta),
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["redOnWhite", "redOnYellow"],
    transform: t(croatiaMeta, { scale: 0.8, ox: 0.7, oy: 0.2 }),
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["redOnWhite"],
    transform: t(cyprusMeta, { scale: 0.8, oy: 0 }),
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["redOnWhite"],
    transform: t(czechiaMeta),
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["redOnWhite"],
    transform: t(denmarkMeta),
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["whiteOnRed"],
    transform: t(estoniaMeta),
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["yellowOnBlack"],
    transform: t(finlandMeta, { scale: 1.5 }),
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["redOnWhite", "whiteOnBlue"],
    transform: t(franceMeta, { scale: 0.12, oy: 0.4 }),
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["redOnWhite"],
    transform: t(germanyMeta),
  },
  {
    name: "Greece",
    paths: greecePaths,
    meta: greeceMeta,
    subjects: ["whiteOnBlack"],
    transform: t(greeceMeta, { scale: 0.7, ox: 0.5 }),
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["redOnWhite", "whiteOnRed"],
    transform: t(hungaryMeta),
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["yellowOnBlack"],
    transform: t(icelandMeta),
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["yellowOnBlack"],
    transform: t(irelandMeta, { scale: 1.5, ox: 0.7 }),
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["whiteOnBlack", "whiteOnRed"],
    transform: t(italyMeta),
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["blackOnWhite"],
    transform: t(kosovoMeta),
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    meta: latviaMeta,
    subjects: ["redOnWhite"],
    transform: t(latviaMeta),
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
    transform: t(lithuaniaMeta),
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["redOnWhite", "yellowOnBlack", "yellowOnBlue"],
    transform: t(luxembourgMeta, { scale: 1.3, oy: 0.2, ox: 0.1 }),
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
    transform: t(montenegroMeta, { scale: 1.3, oy: 0.3, ox: 0.2 }),
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["redOnWhite"],
    transform: t(netherlandsMeta, { scale: 0.12, oy: 0.2 }),
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["redOnWhite"],
    transform: t(northMacedoniaMeta),
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["yellowOnBlack"],
    transform: t(norwayMeta, { scale: 0.5 }),
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    meta: moldovaMeta,
    subjects: ["redOnWhite"],
    transform: t(moldovaMeta),
  },
  {
    name: "Poland",
    paths: polandPaths,
    meta: polandMeta,
    subjects: ["redOnWhite"],
    transform: t(polandMeta),
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["yellowOnBlack"],
    transform: t(portugalMeta, { scale: 0.3, ox: 0.75 }),
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
    transform: t(republicOfSerbiaMeta),
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["redOnWhite"],
    transform: t(romaniaMeta),
  },
  {
    name: "Russia",
    paths: russiaPaths,
    meta: russiaMeta,
    subjects: ["whiteOnRed"],
    transform: t(russiaMeta, { scale: 0.1 }),
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["redOnWhite"],
    transform: t(slovakiaMeta),
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["blackOnWhite", "redOnWhite"],
    transform: t(sloveniaMeta, { scale: 0.8, oy: 0.3 }),
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnBlue"],
    transform: t(spainMeta, { scale: 0.4, oy: 0.2 }),
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    meta: swedenMeta,
    subjects: ["yellowOnBlue", "yellowOnRed"],
    transform: t(swedenMeta, { scale: 1.5, ox: 0.1 }),
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: ["whiteOnBlack"],
    transform: t(switzerlandMeta),
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    meta: turkeyMeta,
    subjects: ["redOnWhite", "yellowOnBlack"],
    transform: t(turkeyMeta, { scale: 0.5, oy: 0.3 }),
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["whiteOnRed"],
    transform: t(ukraineMeta, { oy: 0.2 }),
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["whiteOnBlack"],
    transform: t(unitedKingdomMeta, { scale: 0.5, ox: 0.2 }),
  },
].sort((a, b) => (a.tiny === true ? 1 : b.tiny === true ? -1 : 0));

const subjects = Object.keys(patterns).map((name) => ({ name })) as {
  name: keyof typeof patterns;
}[];

export const europeanChevrons = { patterns, entries, subjects, size };
