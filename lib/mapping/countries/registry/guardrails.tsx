import { albaniaPaths, albaniaMeta } from "../paths/albania";
import { andorraMeta, andorraPaths } from "../paths/andorra";
import { austriaPaths, austriaMeta } from "../paths/austria";
import { belgiumPaths, belgiumMeta } from "../paths/belgium";
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

export const guardrailTypes = [
  { name: "A-profile", selectable: true },
  { name: "B-profile" },
  { name: "B-profile-thin" },
] as const;

export const europeanGuardrails = [
  {
    name: "Albania",
    paths: albaniaPaths,
    meta: albaniaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Andorra",
    paths: andorraPaths,
    meta: andorraMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Austria",
    paths: austriaPaths,
    meta: austriaMeta,
    subjects: ["A-profile"],
  },
  // { name: "Belarus", paths: belarusPaths, meta: belarusMeta, subjects: [] },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["A-profile"],
  },
  // {
  //   name: "Bosnia and Herzegovina",
  //   paths: bosniaAndHerzegovinaPaths,
  //   meta: bosniaAndHerzegovinaMeta,
  //   subjects: [],
  // },
  {
    name: "Bulgaria",
    paths: bulgariaPaths,
    meta: bulgariaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["B-profile"],
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["B-profile-thin"],
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["B-profile"],
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["A-profile"],
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["A-profile", "B-profile"],
  },
  {
    name: "Greece",
    paths: greecePaths,
    meta: greeceMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["A-profile", "B-profile"],
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["B-profile"],
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    meta: latviaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Liechtenstein",
    paths: liechtensteinPaths,
    meta: liechtensteinMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    meta: lithuaniaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Malta",
    paths: maltaPaths,
    meta: maltaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Monaco",
    paths: monacoPaths,
    meta: monacoMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    meta: montenegroMeta,
    subjects: ["A-profile", "B-profile"],
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["A-profile"],
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    meta: moldovaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Poland",
    paths: polandPaths,
    meta: polandMeta,
    subjects: ["B-profile"],
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    meta: republicOfSerbiaMeta,
    subjects: ["B-profile"],
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Russia",
    paths: russiaPaths,
    meta: russiaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "San Marino",
    paths: sanMarinoPaths,
    meta: sanMarinoMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["B-profile-thin"],
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    meta: swedenMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: ["A-profile"],
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    meta: turkeyMeta,
    subjects: ["A-profile", "B-profile"],
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["A-profile"],
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["A-profile"],
  },
] as const;
