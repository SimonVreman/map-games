import { albaniaPaths, albaniaBounds } from "./albania";
import { austriaPaths, austriaBounds } from "./austria";
import { belarusPaths, belarusBounds } from "./belarus";
import { belgiumPaths, belgiumBounds } from "./belgium";
import {
  bosniaAndHerzegovinaPaths,
  bosniaAndHerzegovinaBounds,
} from "./bosnia-and-herzegovina";
import { bulgariaPaths, bulgariaBounds } from "./bulgaria";
import { croatiaPaths, croatiaBounds } from "./croatia";
import { cyprusPaths, cyprusBounds } from "./cyprus";
import { czechiaPaths, czechiaBounds } from "./czechia";
import { denmarkPaths, denmarkBounds } from "./denmark";
import { estoniaPaths, estoniaBounds } from "./estonia";
import { finlandPaths, finlandBounds } from "./finland";
import { francePaths, franceBounds } from "./france";
import { germanyPaths, germanyBounds } from "./germany";
import { greecePaths, greeceBounds } from "./greece";
import { hungaryPaths, hungaryBounds } from "./hungary";
import { icelandPaths, icelandBounds } from "./iceland";
import { irelandPaths, irelandBounds } from "./ireland";
import { italyPaths, italyBounds } from "./italy";
import { kosovoPaths, kosovoBounds } from "./kosovo";
import { latviaPaths, latviaBounds } from "./latvia";
import { lithuaniaPaths, lithuaniaBounds } from "./lithuania";
import { luxembourgPaths, luxembourgBounds } from "./luxembourg";
import { moldovaPaths, moldovaBounds } from "./moldova";
import { montenegroPaths, montenegroBounds } from "./montenegro";
import { netherlandsPaths, netherlandsBounds } from "./netherlands";
import { northMacedoniaPaths, northMacedoniaBounds } from "./north-macedonia";
import { norwayPaths, norwayBounds } from "./norway";
import { polandPaths, polandBounds } from "./poland";
import { portugalPaths, portugalBounds } from "./portugal";
import {
  republicOfSerbiaPaths,
  republicOfSerbiaBounds,
} from "./republic-of-serbia";
import { romaniaPaths, romaniaBounds } from "./romania";
import { russiaPaths, russiaBounds } from "./russia";
import { slovakiaPaths, slovakiaBounds } from "./slovakia";
import { sloveniaPaths, sloveniaBounds } from "./slovenia";
import { spainPaths, spainBounds } from "./spain";
import { swedenPaths, swedenBounds } from "./sweden";
import { switzerlandPaths, switzerlandBounds } from "./switzerland";
import { turkeyPaths, turkeyBounds } from "./turkey";
import { ukrainePaths, ukraineBounds } from "./ukraine";
import { unitedKingdomPaths, unitedKingdomBounds } from "./united-kingdom";

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
