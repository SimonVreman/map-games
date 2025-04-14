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
import { maltaPaths } from "./malta";
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
  { name: "Albania", paths: albaniaPaths, colors: ["whiteOnBlack"] },
  {
    name: "Austria",
    paths: austriaPaths,
    colors: ["redOnYellow", "whiteOnRed"],
  },
  { name: "Belarus", paths: belarusPaths, colors: ["whiteOnRed"] },
  { name: "Belgium", paths: belgiumPaths, colors: ["redOnWhite"] },
  {
    name: "Bosnia and Herzegovina",
    paths: bosniaAndHerzegovinaPaths,
    colors: ["redOnWhite"],
  },
  { name: "Bulgaria", paths: bulgariaPaths, colors: ["redOnWhite"] },
  { name: "Croatia", paths: croatiaPaths, colors: ["redOnWhite"] },
  { name: "Cyprus", paths: cyprusPaths, colors: ["redOnWhite"] },
  { name: "Czechia", paths: czechiaPaths, colors: ["redOnWhite"] },
  { name: "Denmark", paths: denmarkPaths, colors: ["redOnWhite"] },
  { name: "Estonia", paths: estoniaPaths, colors: ["whiteOnRed"] },
  { name: "Finland", paths: finlandPaths, colors: ["yellowOnBlack"] },
  { name: "France", paths: francePaths, colors: ["whiteOnBlue"] },
  { name: "Germany", paths: germanyPaths, colors: ["redOnWhite"] },
  { name: "Greece", paths: greecePaths, colors: ["whiteOnBlack"] },
  { name: "Hungary", paths: hungaryPaths, colors: ["whiteOnRed"] },
  { name: "Iceland", paths: icelandPaths, colors: ["yellowOnBlack"] },
  { name: "Ireland", paths: irelandPaths, colors: ["yellowOnBlack"] },
  { name: "Italy", paths: italyPaths, colors: ["whiteOnBlack"] },
  { name: "Kosovo", paths: kosovoPaths, colors: ["blackOnWhite"] },
  { name: "Latvia", paths: latviaPaths, colors: ["redOnWhite"] },
  { name: "Lithuania", paths: lithuaniaPaths, colors: ["redOnWhite"] },
  { name: "Luxembourg", paths: luxembourgPaths, colors: ["yellowOnBlack"] },
  { name: "Malta", paths: maltaPaths, colors: ["whiteOnBlack"] },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    colors: ["blackOnWhite", "redOnYellow"],
  },
  { name: "Netherlands", paths: netherlandsPaths, colors: ["redOnWhite"] },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    colors: ["redOnWhite"],
  },
  { name: "Norway", paths: norwayPaths, colors: ["yellowOnBlack"] },
  { name: "Moldova", paths: moldovaPaths, colors: ["redOnWhite"] },
  { name: "Poland", paths: polandPaths, colors: ["redOnWhite"] },
  { name: "Portugal", paths: portugalPaths, colors: ["yellowOnBlack"] },
  { name: "Serbia", paths: republicOfSerbiaPaths, colors: ["blackOnWhite"] },
  { name: "Romania", paths: romaniaPaths, colors: ["redOnWhite"] },
  { name: "Russia", paths: russiaPaths, colors: ["whiteOnRed"] },
  { name: "Slovakia", paths: slovakiaPaths, colors: ["redOnWhite"] },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    colors: ["blackOnWhite", "redOnWhite"],
  },
  { name: "Spain", paths: spainPaths, colors: ["whiteOnBlack", "whiteOnBlue"] },
  { name: "Sweden", paths: swedenPaths, colors: ["yellowOnBlue"] },
  { name: "Switzerland", paths: switzerlandPaths, colors: ["whiteOnBlack"] },
  { name: "Turkey", paths: turkeyPaths, colors: ["redOnWhite"] },
  { name: "Ukraine", paths: ukrainePaths, colors: ["whiteOnRed"] },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    colors: ["whiteOnBlack"],
  },
] as const;
