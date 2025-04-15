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

export const chevronPatterns = [
  { name: "blackOnWhite", background: "white", foreground: "black" },
  { name: "redOnWhite", background: "white", foreground: "red" },
  { name: "redOnYellow", background: "yellow", foreground: "red" },
  { name: "whiteOnRed", background: "red", foreground: "white" },
  { name: "whiteOnBlack", background: "black", foreground: "white" },
  { name: "whiteOnBlue", background: "blue", foreground: "white" },
  { name: "yellowOnBlack", background: "black", foreground: "yellow" },
  { name: "yellowOnBlue", background: "blue", foreground: "yellow" },
] as const;

export const europeanChevrons = [
  { name: "Albania", paths: albaniaPaths, subjects: ["whiteOnBlack"] },
  {
    name: "Austria",
    paths: austriaPaths,
    subjects: ["redOnYellow", "whiteOnRed"],
  },
  { name: "Belarus", paths: belarusPaths, subjects: ["whiteOnRed"] },
  { name: "Belgium", paths: belgiumPaths, subjects: ["redOnWhite"] },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    subjects: ["redOnWhite"],
  },
  { name: "Bulgaria", paths: bulgariaPaths, subjects: ["redOnWhite"] },
  { name: "Croatia", paths: croatiaPaths, subjects: ["redOnWhite"] },
  { name: "Cyprus", paths: cyprusPaths, subjects: ["redOnWhite"] },
  { name: "Czechia", paths: czechiaPaths, subjects: ["redOnWhite"] },
  { name: "Denmark", paths: denmarkPaths, subjects: ["redOnWhite"] },
  { name: "Estonia", paths: estoniaPaths, subjects: ["whiteOnRed"] },
  { name: "Finland", paths: finlandPaths, subjects: ["yellowOnBlack"] },
  { name: "France", paths: francePaths, subjects: ["whiteOnBlue"] },
  { name: "Germany", paths: germanyPaths, subjects: ["redOnWhite"] },
  { name: "Greece", paths: greecePaths, subjects: ["whiteOnBlack"] },
  { name: "Hungary", paths: hungaryPaths, subjects: ["whiteOnRed"] },
  { name: "Iceland", paths: icelandPaths, subjects: ["yellowOnBlack"] },
  { name: "Ireland", paths: irelandPaths, subjects: ["yellowOnBlack"] },
  { name: "Italy", paths: italyPaths, subjects: ["whiteOnBlack"] },
  { name: "Kosovo", paths: kosovoPaths, subjects: ["blackOnWhite"] },
  { name: "Latvia", paths: latviaPaths, subjects: ["redOnWhite"] },
  { name: "Lithuania", paths: lithuaniaPaths, subjects: ["redOnWhite"] },
  { name: "Luxembourg", paths: luxembourgPaths, subjects: ["yellowOnBlack"] },
  // { name: "Malta", paths: maltaPaths, subjects: ["whiteOnBlack"] }, Too small to click
  {
    name: "Montenegro",
    paths: montenegroPaths,
    subjects: ["blackOnWhite", "redOnYellow"],
  },
  { name: "Netherlands", paths: netherlandsPaths, subjects: ["redOnWhite"] },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    subjects: ["redOnWhite"],
  },
  { name: "Norway", paths: norwayPaths, subjects: ["yellowOnBlack"] },
  { name: "Moldova", paths: moldovaPaths, subjects: ["redOnWhite"] },
  { name: "Poland", paths: polandPaths, subjects: ["redOnWhite"] },
  { name: "Portugal", paths: portugalPaths, subjects: ["yellowOnBlack"] },
  { name: "Serbia", paths: republicOfSerbiaPaths, subjects: ["blackOnWhite"] },
  { name: "Romania", paths: romaniaPaths, subjects: ["redOnWhite"] },
  { name: "Russia", paths: russiaPaths, subjects: ["whiteOnRed"] },
  { name: "Slovakia", paths: slovakiaPaths, subjects: ["redOnWhite"] },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    subjects: ["blackOnWhite", "redOnWhite"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    subjects: ["whiteOnBlack", "whiteOnBlue"],
  },
  { name: "Sweden", paths: swedenPaths, subjects: ["yellowOnBlue"] },
  { name: "Switzerland", paths: switzerlandPaths, subjects: ["whiteOnBlack"] },
  { name: "Turkey", paths: turkeyPaths, subjects: ["redOnWhite"] },
  { name: "Ukraine", paths: ukrainePaths, subjects: ["whiteOnRed"] },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    subjects: ["whiteOnBlack"],
  },
] as const;
