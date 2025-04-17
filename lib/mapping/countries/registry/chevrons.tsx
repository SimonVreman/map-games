import { albaniaPaths, albaniaMeta } from "../paths/albania";
import { andorraMeta, andorraPaths } from "../paths/andorra";
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
import { liechtensteinMeta, liechtensteinPaths } from "../paths/liechtenstein";
import { lithuaniaPaths, lithuaniaMeta } from "../paths/lithuania";
import { luxembourgPaths, luxembourgMeta } from "../paths/luxembourg";
import { maltaMeta, maltaPaths } from "../paths/malta";
import { moldovaPaths, moldovaMeta } from "../paths/moldova";
import { monacoMeta, monacoPaths } from "../paths/monaco";
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
import { sanMarinoMeta, sanMarinoPaths } from "../paths/san-marino";
import { slovakiaPaths, slovakiaMeta } from "../paths/slovakia";
import { sloveniaPaths, sloveniaMeta } from "../paths/slovenia";
import { spainPaths, spainMeta } from "../paths/spain";
import { swedenPaths, swedenMeta } from "../paths/sweden";
import { switzerlandPaths, switzerlandMeta } from "../paths/switzerland";
import { turkeyPaths, turkeyMeta } from "../paths/turkey";
import { ukrainePaths, ukraineMeta } from "../paths/ukraine";
import { unitedKingdomPaths, unitedKingdomMeta } from "../paths/united-kingdom";

export const chevronPatterns = [
  { name: "blackOnWhite", background: "white", foreground: "black" },
  { name: "redOnWhite", background: "white", foreground: "red" },
  { name: "redOnYellow", background: "yellow", foreground: "red" },
  { name: "whiteOnRed", background: "red", foreground: "white" },
  { name: "whiteOnBlack", background: "black", foreground: "white" },
  { name: "whiteOnBlue", background: "blue", foreground: "white" },
  { name: "yellowOnBlack", background: "black", foreground: "yellow" },
  { name: "yellowOnBlue", background: "blue", foreground: "yellow" },
  { name: "yellowOnRed", background: "red", foreground: "yellow" },
] as const;

export const europeanChevrons = [
  {
    name: "Albania",
    paths: albaniaPaths,
    meta: albaniaMeta,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnRed"],
  },
  {
    name: "Andorra",
    paths: andorraPaths,
    meta: andorraMeta,
    subjects: ["whiteOnBlue"],
  },
  {
    name: "Austria",
    paths: austriaPaths,
    meta: austriaMeta,
    subjects: ["redOnYellow", "whiteOnRed"],
  },
  {
    name: "Belarus",
    paths: belarusPaths,
    meta: belarusMeta,
    subjects: ["whiteOnRed"],
  },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    meta: bosniaAndHerzegovinaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Bulgaria",
    paths: bulgariaPaths,
    meta: bulgariaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["redOnWhite", "redOnYellow"],
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["whiteOnRed"],
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["redOnWhite", "whiteOnBlue"],
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Greece",
    paths: greecePaths,
    meta: greeceMeta,
    subjects: ["whiteOnBlack"],
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["redOnWhite", "whiteOnRed"],
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["whiteOnBlack", "whiteOnRed"],
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["blackOnWhite"],
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    meta: latviaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Liechtenstein",
    paths: liechtensteinPaths,
    meta: liechtensteinMeta,
    subjects: ["whiteOnBlack"],
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    meta: lithuaniaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["redOnWhite", "yellowOnBlack", "yellowOnBlue"],
  },
  {
    name: "Malta",
    paths: maltaPaths,
    meta: maltaMeta,
    subjects: ["whiteOnBlack"],
  },
  {
    name: "Monaco",
    paths: monacoPaths,
    meta: monacoMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    meta: montenegroMeta,
    subjects: ["blackOnWhite", "redOnYellow"],
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    meta: moldovaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Poland",
    paths: polandPaths,
    meta: polandMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "San Marino",
    paths: sanMarinoPaths,
    meta: sanMarinoMeta,
    subjects: ["redOnYellow"],
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    meta: republicOfSerbiaMeta,
    subjects: ["blackOnWhite"],
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Russia",
    paths: russiaPaths,
    meta: russiaMeta,
    subjects: ["whiteOnRed"],
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["redOnWhite"],
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["blackOnWhite", "redOnWhite"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnBlue"],
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    meta: swedenMeta,
    subjects: ["yellowOnBlue", "yellowOnRed"],
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: ["whiteOnBlack"],
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    meta: turkeyMeta,
    subjects: ["redOnWhite", "yellowOnBlack"],
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["whiteOnRed"],
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["whiteOnBlack"],
  },
] as const;
