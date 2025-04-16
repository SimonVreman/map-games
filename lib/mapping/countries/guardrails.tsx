import { albaniaPaths } from "./albania";
import { austriaPaths } from "./austria";
import { belarusPaths } from "./belarus";
import { belgiumPaths } from "./belgium";
import { bosniaAndHerzegovinaPaths } from "./bosnia-and-herzegovina";
import { bulgariaPaths } from "./bulgaria";
import { croatiaPaths } from "./croatia";
import { cyprusPaths } from "./cyprus";
import { czechiaPaths } from "./czechia";
import { denmarkPaths } from "./denmark";
import { estoniaPaths } from "./estonia";
import { finlandPaths } from "./finland";
import { francePaths } from "./france";
import { germanyPaths } from "./germany";
import { greecePaths } from "./greece";
import { hungaryPaths } from "./hungary";
import { icelandPaths } from "./iceland";
import { irelandPaths } from "./ireland";
import { italyPaths } from "./italy";
import { kosovoPaths } from "./kosovo";
import { latviaPaths } from "./latvia";
import { lithuaniaPaths } from "./lithuania";
import { luxembourgPaths } from "./luxembourg";
import { moldovaPaths } from "./moldova";
import { montenegroPaths } from "./montenegro";
import { netherlandsPaths } from "./netherlands";
import { northMacedoniaPaths } from "./north-macedonia";
import { norwayPaths } from "./norway";
import { polandPaths } from "./poland";
import { portugalPaths } from "./portugal";
import { republicOfSerbiaPaths } from "./republic-of-serbia";
import { romaniaPaths } from "./romania";
import { russiaPaths } from "./russia";
import { slovakiaPaths } from "./slovakia";
import { sloveniaPaths } from "./slovenia";
import { spainPaths } from "./spain";
import { swedenPaths } from "./sweden";
import { switzerlandPaths } from "./switzerland";
import { turkeyPaths } from "./turkey";
import { ukrainePaths } from "./ukraine";
import { unitedKingdomPaths } from "./united-kingdom";

export const guardrailTypes = [
  { name: "A-profile", selectable: false },
  { name: "B-profile" },
  { name: "B-profile-thin" },
] as const;

export const europeanGuardrails = [
  { name: "Albania", paths: albaniaPaths, subjects: ["A-profile"] },
  { name: "Austria", paths: austriaPaths, subjects: ["A-profile"] },
  { name: "Belarus", paths: belarusPaths, subjects: [] },
  { name: "Belgium", paths: belgiumPaths, subjects: ["A-profile"] },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    subjects: [],
  },
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
