import { albaniaPaths, albaniaBounds } from "../paths/albania";
import { austriaPaths, austriaBounds } from "../paths/austria";
import { belarusPaths, belarusBounds } from "../paths/belarus";
import { belgiumPaths, belgiumBounds } from "../paths/belgium";
import {
  bosniaAndHerzegovinaPaths,
  bosniaAndHerzegovinaBounds,
} from "../paths/bosnia-and-herzegovina";
import { bulgariaPaths, bulgariaBounds } from "../paths/bulgaria";
import { croatiaPaths, croatiaBounds } from "../paths/croatia";
import { cyprusPaths, cyprusBounds } from "../paths/cyprus";
import { czechiaPaths, czechiaBounds } from "../paths/czechia";
import { denmarkPaths, denmarkBounds } from "../paths/denmark";
import { estoniaPaths, estoniaBounds } from "../paths/estonia";
import { finlandPaths, finlandBounds } from "../paths/finland";
import { francePaths, franceBounds } from "../paths/france";
import { germanyPaths, germanyBounds } from "../paths/germany";
import { greecePaths, greeceBounds } from "../paths/greece";
import { hungaryPaths, hungaryBounds } from "../paths/hungary";
import { icelandPaths, icelandBounds } from "../paths/iceland";
import { irelandPaths, irelandBounds } from "../paths/ireland";
import { italyPaths, italyBounds } from "../paths/italy";
import { kosovoPaths, kosovoBounds } from "../paths/kosovo";
import { latviaPaths, latviaBounds } from "../paths/latvia";
import { lithuaniaPaths, lithuaniaBounds } from "../paths/lithuania";
import { luxembourgPaths, luxembourgBounds } from "../paths/luxembourg";
import { moldovaPaths, moldovaBounds } from "../paths/moldova";
import { montenegroPaths, montenegroBounds } from "../paths/montenegro";
import { netherlandsPaths, netherlandsBounds } from "../paths/netherlands";
import { northMacedoniaPaths, northMacedoniaBounds } from "../paths/north-macedonia";
import { norwayPaths, norwayBounds } from "../paths/norway";
import { polandPaths, polandBounds } from "../paths/poland";
import { portugalPaths, portugalBounds } from "../paths/portugal";
import {
  republicOfSerbiaPaths,
  republicOfSerbiaBounds,
} from "../paths/republic-of-serbia";
import { romaniaPaths, romaniaBounds } from "../paths/romania";
import { russiaPaths, russiaBounds } from "../paths/russia";
import { slovakiaPaths, slovakiaBounds } from "../paths/slovakia";
import { sloveniaPaths, sloveniaBounds } from "../paths/slovenia";
import { spainPaths, spainBounds } from "../paths/spain";
import { swedenPaths, swedenBounds } from "../paths/sweden";
import { switzerlandPaths, switzerlandBounds } from "../paths/switzerland";
import { turkeyPaths, turkeyBounds } from "../paths/turkey";
import { ukrainePaths, ukraineBounds } from "../paths/ukraine";
import { unitedKingdomPaths, unitedKingdomBounds } from "../paths/united-kingdom";

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
    bounds: albaniaBounds,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnRed"],
  },
  {
    name: "Austria",
    paths: austriaPaths,
    bounds: austriaBounds,
    subjects: ["redOnYellow", "whiteOnRed"],
  },
  {
    name: "Belarus",
    paths: belarusPaths,
    bounds: belarusBounds,
    subjects: ["whiteOnRed"],
  },
  {
    name: "Belgium",
    paths: belgiumPaths,
    bounds: belgiumBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    bounds: bosniaAndHerzegovinaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Bulgaria",
    paths: bulgariaPaths,
    bounds: bulgariaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    bounds: croatiaBounds,
    subjects: ["redOnWhite", "redOnYellow"],
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    bounds: cyprusBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    bounds: czechiaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    bounds: denmarkBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    bounds: estoniaBounds,
    subjects: ["whiteOnRed"],
  },
  {
    name: "Finland",
    paths: finlandPaths,
    bounds: finlandBounds,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "France",
    paths: francePaths,
    bounds: franceBounds,
    subjects: ["redOnWhite", "whiteOnBlue"],
  },
  {
    name: "Germany",
    paths: germanyPaths,
    bounds: germanyBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Greece",
    paths: greecePaths,
    bounds: greeceBounds,
    subjects: ["whiteOnBlack"],
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    bounds: hungaryBounds,
    subjects: ["redOnWhite", "whiteOnRed"],
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    bounds: icelandBounds,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    bounds: irelandBounds,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Italy",
    paths: italyPaths,
    bounds: italyBounds,
    subjects: ["whiteOnBlack", "whiteOnRed"],
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    bounds: kosovoBounds,
    subjects: ["blackOnWhite"],
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    bounds: latviaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    bounds: lithuaniaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    bounds: luxembourgBounds,
    subjects: ["redOnWhite", "yellowOnBlack", "yellowOnBlue"],
  },
  // { name: "Malta", paths: maltaPaths, bounds: maltaBounds, subjects: ["whiteOnBlack"] }, Too small to click
  {
    name: "Montenegro",
    paths: montenegroPaths,
    bounds: montenegroBounds,
    subjects: ["blackOnWhite", "redOnYellow"],
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    bounds: netherlandsBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    bounds: northMacedoniaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Norway",
    paths: norwayPaths,
    bounds: norwayBounds,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    bounds: moldovaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Poland",
    paths: polandPaths,
    bounds: polandBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    bounds: portugalBounds,
    subjects: ["yellowOnBlack"],
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    bounds: republicOfSerbiaBounds,
    subjects: ["blackOnWhite"],
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    bounds: romaniaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Russia",
    paths: russiaPaths,
    bounds: russiaBounds,
    subjects: ["whiteOnRed"],
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    bounds: slovakiaBounds,
    subjects: ["redOnWhite"],
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    bounds: sloveniaBounds,
    subjects: ["blackOnWhite", "redOnWhite"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    bounds: spainBounds,
    subjects: ["redOnWhite", "whiteOnBlack", "whiteOnBlue"],
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    bounds: swedenBounds,
    subjects: ["yellowOnBlue", "yellowOnRed"],
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    bounds: switzerlandBounds,
    subjects: ["whiteOnBlack"],
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    bounds: turkeyBounds,
    subjects: ["redOnWhite", "yellowOnBlack"],
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    bounds: ukraineBounds,
    subjects: ["whiteOnRed"],
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    bounds: unitedKingdomBounds,
    subjects: ["whiteOnBlack"],
  },
] as const;
