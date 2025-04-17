import { albaniaPaths, albaniaMeta } from "../paths/albania";
import { andorraPaths, andorraMeta } from "../paths/andorra";
import { austriaPaths, austriaMeta } from "../paths/austria";
import { belarusPaths, belarusMeta } from "../paths/belarus";
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
import { liechtensteinPaths, liechtensteinMeta } from "../paths/liechtenstein";
import { lithuaniaPaths, lithuaniaMeta } from "../paths/lithuania";
import { luxembourgPaths, luxembourgMeta } from "../paths/luxembourg";
import { maltaPaths, maltaMeta } from "../paths/malta";
import { moldovaPaths, moldovaMeta } from "../paths/moldova";
import { monacoPaths, monacoMeta } from "../paths/monaco";
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
import { sanMarinoPaths, sanMarinoMeta } from "../paths/san-marino";
import { slovakiaPaths, slovakiaMeta } from "../paths/slovakia";
import { sloveniaPaths, sloveniaMeta } from "../paths/slovenia";
import { spainPaths, spainMeta } from "../paths/spain";
import { swedenPaths, swedenMeta } from "../paths/sweden";
import { switzerlandPaths, switzerlandMeta } from "../paths/switzerland";
import { turkeyPaths, turkeyMeta } from "../paths/turkey";
import { ukrainePaths, ukraineMeta } from "../paths/ukraine";
import { unitedKingdomPaths, unitedKingdomMeta } from "../paths/united-kingdom";

export const pedestrianTypes = [
  { name: "None", hint: "0 stripes" },
  { name: "Three", hint: "3 stripes" },
  { name: "Four", hint: "4 stripes" },
  { name: "Five", hint: "5 stripes" },
  { name: "Six", hint: "6 stripes" },
  { name: "Seven", hint: "7 stripes" },
  { name: "Eight", hint: "8 stripes" },
  { name: "Twelve", hint: "12 stripes" },
  { name: "Ball", hint: "Yellow ball" },
] as const;

export const europeanPedestrians = [
  {
    name: "Albania",
    paths: albaniaPaths,
    meta: albaniaMeta,
    subjects: ["Five"],
  },
  {
    name: "Andorra",
    paths: andorraPaths,
    meta: andorraMeta,
    subjects: ["Eight"],
  },
  {
    name: "Austria",
    paths: austriaPaths,
    meta: austriaMeta,
    subjects: ["None"],
  },
  {
    name: "Belarus",
    paths: belarusPaths,
    meta: belarusMeta,
    subjects: ["Three"],
  },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["None"],
  },
  // {
  //   name: "Bosnia and Herzegovina",
  //   paths: bosniaAndHerzegovinaPaths, meta: bosniaAndHerzegovinaMeta,
  //   subjects: [],
  // },
  {
    name: "Bulgaria",
    paths: bulgariaPaths,
    meta: bulgariaMeta,
    subjects: ["Four"],
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["Five"],
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["Five", "Six"],
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["Five", "Six"],
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["Three"],
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["Five"],
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["Five"],
  },
  { name: "Greece", paths: greecePaths, meta: greeceMeta, subjects: ["None"] },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["Four", "Five"],
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["Four"],
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["None", "Three", "Ball"],
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["None", "Five"],
  },
  { name: "Latvia", paths: latviaPaths, meta: latviaMeta, subjects: ["Five"] },
  {
    name: "Liechtenstein",
    paths: liechtensteinPaths,
    meta: liechtensteinMeta,
    subjects: ["Seven"],
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    meta: lithuaniaMeta,
    subjects: ["Three"],
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["Five"],
  },
  {
    name: "Malta",
    paths: maltaPaths,
    meta: maltaMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Monaco",
    paths: monacoPaths,
    meta: monacoMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    meta: montenegroMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["Five"],
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["Four", "Five"],
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    meta: moldovaMeta,
    subjects: ["Five"],
  },
  { name: "Poland", paths: polandPaths, meta: polandMeta, subjects: ["None"] },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    meta: republicOfSerbiaMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["Five"],
  },
  { name: "Russia", paths: russiaPaths, meta: russiaMeta, subjects: ["Three"] },
  {
    name: "San Marino",
    paths: sanMarinoPaths,
    meta: sanMarinoMeta,
    subjects: [],
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["Five"],
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["None", "Five"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["None", "Five", "Eight", "Twelve"],
  },
  { name: "Sweden", paths: swedenPaths, meta: swedenMeta, subjects: ["Four"] },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: ["Seven"],
  },
  { name: "Turkey", paths: turkeyPaths, meta: turkeyMeta, subjects: ["Five"] },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["Three"],
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["Ball"],
  },
] as const;
