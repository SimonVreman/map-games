import { albaniaPaths } from "../paths/albania";
import { austriaPaths } from "../paths/austria";
import { belgiumPaths } from "../paths/belgium";
import { bulgariaPaths } from "../paths/bulgaria";
import { croatiaPaths } from "../paths/croatia";
import { cyprusPaths } from "../paths/cyprus";
import { czechiaPaths } from "../paths/czechia";
import { denmarkPaths } from "../paths/denmark";
import { estoniaPaths } from "../paths/estonia";
import { finlandPaths } from "../paths/finland";
import { francePaths } from "../paths/france";
import { germanyPaths } from "../paths/germany";
import { greecePaths } from "../paths/greece";
import { hungaryPaths } from "../paths/hungary";
import { icelandPaths } from "../paths/iceland";
import { irelandPaths } from "../paths/ireland";
import { italyPaths } from "../paths/italy";
import { kosovoPaths } from "../paths/kosovo";
import { latviaPaths } from "../paths/latvia";
import { lithuaniaPaths } from "../paths/lithuania";
import { luxembourgPaths } from "../paths/luxembourg";
import { moldovaPaths } from "../paths/moldova";
import { montenegroPaths } from "../paths/montenegro";
import { netherlandsPaths } from "../paths/netherlands";
import { northMacedoniaPaths } from "../paths/north-macedonia";
import { norwayPaths } from "../paths/norway";
import { polandPaths } from "../paths/poland";
import { portugalPaths } from "../paths/portugal";
import { republicOfSerbiaPaths } from "../paths/republic-of-serbia";
import { romaniaPaths } from "../paths/romania";
import { russiaPaths } from "../paths/russia";
import { slovakiaPaths } from "../paths/slovakia";
import { sloveniaPaths } from "../paths/slovenia";
import { spainPaths } from "../paths/spain";
import { swedenPaths } from "../paths/sweden";
import { switzerlandPaths } from "../paths/switzerland";
import { turkeyPaths } from "../paths/turkey";
import { ukrainePaths } from "../paths/ukraine";
import { unitedKingdomPaths } from "../paths/united-kingdom";

export const guardrailTypes = [
  { name: "A-profile", selectable: true },
  { name: "B-profile" },
  { name: "B-profile-thin" },
] as const;

export const europeanGuardrails = [
  { name: "Albania", paths: albaniaPaths, subjects: ["A-profile"] },
  { name: "Austria", paths: austriaPaths, subjects: ["A-profile"] },
  // { name: "Belarus", paths: belarusPaths, subjects: [] },
  { name: "Belgium", paths: belgiumPaths, subjects: ["A-profile"] },
  // {
  //   name: "Bosnia and Herzegovina",
  //   paths: bosniaAndHerzegovinaPaths,
  //   subjects: [],
  // },
  { name: "Bulgaria", paths: bulgariaPaths, subjects: ["A-profile"] },
  { name: "Croatia", paths: croatiaPaths, subjects: ["B-profile"] },
  { name: "Cyprus", paths: cyprusPaths, subjects: ["A-profile"] },
  { name: "Czechia", paths: czechiaPaths, subjects: ["B-profile-thin"] },
  { name: "Denmark", paths: denmarkPaths, subjects: ["B-profile"] },
  { name: "Estonia", paths: estoniaPaths, subjects: ["A-profile"] },
  { name: "Finland", paths: finlandPaths, subjects: ["A-profile"] },
  { name: "France", paths: francePaths, subjects: ["A-profile"] },
  {
    name: "Germany",
    paths: germanyPaths,
    subjects: ["A-profile", "B-profile"],
  },
  { name: "Greece", paths: greecePaths, subjects: ["A-profile"] },
  { name: "Hungary", paths: hungaryPaths, subjects: ["A-profile"] },
  { name: "Iceland", paths: icelandPaths, subjects: ["A-profile"] },
  {
    name: "Ireland",
    paths: irelandPaths,
    subjects: ["A-profile", "B-profile"],
  },
  { name: "Italy", paths: italyPaths, subjects: ["A-profile"] },
  { name: "Kosovo", paths: kosovoPaths, subjects: ["B-profile"] },
  { name: "Latvia", paths: latviaPaths, subjects: ["A-profile"] },
  { name: "Lithuania", paths: lithuaniaPaths, subjects: ["A-profile"] },
  { name: "Luxembourg", paths: luxembourgPaths, subjects: ["A-profile"] },
  // { name: "Malta", paths: maltaPaths, subjects: ["A-profile"] }, Too small to click
  {
    name: "Montenegro",
    paths: montenegroPaths,
    subjects: ["A-profile", "B-profile"],
  },
  { name: "Netherlands", paths: netherlandsPaths, subjects: ["A-profile"] },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    subjects: ["A-profile"],
  },
  { name: "Norway", paths: norwayPaths, subjects: ["A-profile"] },
  { name: "Moldova", paths: moldovaPaths, subjects: ["A-profile"] },
  { name: "Poland", paths: polandPaths, subjects: ["B-profile"] },
  { name: "Portugal", paths: portugalPaths, subjects: ["A-profile"] },
  { name: "Serbia", paths: republicOfSerbiaPaths, subjects: ["B-profile"] },
  { name: "Romania", paths: romaniaPaths, subjects: ["A-profile"] },
  { name: "Russia", paths: russiaPaths, subjects: ["A-profile"] },
  { name: "Slovakia", paths: slovakiaPaths, subjects: ["B-profile-thin"] },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    subjects: ["A-profile"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    subjects: ["A-profile"],
  },
  { name: "Sweden", paths: swedenPaths, subjects: ["A-profile"] },
  { name: "Switzerland", paths: switzerlandPaths, subjects: ["A-profile"] },
  { name: "Turkey", paths: turkeyPaths, subjects: ["A-profile", "B-profile"] },
  { name: "Ukraine", paths: ukrainePaths, subjects: ["A-profile"] },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    subjects: ["A-profile"],
  },
] as const;
