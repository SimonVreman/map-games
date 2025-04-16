import { albaniaPaths } from "../paths/albania";
import { austriaPaths } from "../paths/austria";
import { belarusPaths } from "../paths/belarus";
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
  { name: "Albania", paths: albaniaPaths, subjects: ["Five"] },
  { name: "Austria", paths: austriaPaths, subjects: ["None"] },
  { name: "Belarus", paths: belarusPaths, subjects: ["Three"] },
  { name: "Belgium", paths: belgiumPaths, subjects: ["None"] },
  // {
  //   name: "Bosnia and Herzegovina",
  //   paths: bosniaAndHerzegovinaPaths,
  //   subjects: [],
  // },
  { name: "Bulgaria", paths: bulgariaPaths, subjects: ["Four"] },
  { name: "Croatia", paths: croatiaPaths, subjects: ["Five"] },
  { name: "Cyprus", paths: cyprusPaths, subjects: ["None", "Five"] },
  { name: "Czechia", paths: czechiaPaths, subjects: ["Five", "Six"] },
  { name: "Denmark", paths: denmarkPaths, subjects: ["Five", "Six"] },
  { name: "Estonia", paths: estoniaPaths, subjects: ["Three"] },
  { name: "Finland", paths: finlandPaths, subjects: ["Five"] },
  { name: "France", paths: francePaths, subjects: ["None", "Five"] },
  { name: "Germany", paths: germanyPaths, subjects: ["Five"] },
  { name: "Greece", paths: greecePaths, subjects: ["None"] },
  { name: "Hungary", paths: hungaryPaths, subjects: ["Four", "Five"] },
  { name: "Iceland", paths: icelandPaths, subjects: ["Four"] },
  { name: "Ireland", paths: irelandPaths, subjects: ["None", "Three", "Ball"] },
  { name: "Italy", paths: italyPaths, subjects: ["None", "Five"] },
  { name: "Kosovo", paths: kosovoPaths, subjects: ["None", "Five"] },
  { name: "Latvia", paths: latviaPaths, subjects: ["Five"] },
  { name: "Lithuania", paths: lithuaniaPaths, subjects: ["Three"] },
  { name: "Luxembourg", paths: luxembourgPaths, subjects: ["Five"] },
  // { name: "Malta", paths: maltaPaths, subjects: [] }, Too small to click
  { name: "Montenegro", paths: montenegroPaths, subjects: ["None", "Five"] },
  { name: "Netherlands", paths: netherlandsPaths, subjects: ["Five"] },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    subjects: ["None", "Five"],
  },
  { name: "Norway", paths: norwayPaths, subjects: ["Four", "Five"] },
  { name: "Moldova", paths: moldovaPaths, subjects: ["Five"] },
  { name: "Poland", paths: polandPaths, subjects: ["None"] },
  { name: "Portugal", paths: portugalPaths, subjects: ["None", "Five"] },
  { name: "Serbia", paths: republicOfSerbiaPaths, subjects: ["None", "Five"] },
  { name: "Romania", paths: romaniaPaths, subjects: ["Five"] },
  { name: "Russia", paths: russiaPaths, subjects: ["Three"] },
  { name: "Slovakia", paths: slovakiaPaths, subjects: ["Five"] },
  { name: "Slovenia", paths: sloveniaPaths, subjects: ["None", "Five"] },
  {
    name: "Spain",
    paths: spainPaths,
    subjects: ["None", "Five", "Eight", "Twelve"],
  },
  { name: "Sweden", paths: swedenPaths, subjects: ["Four"] },
  { name: "Switzerland", paths: switzerlandPaths, subjects: ["Seven"] },
  { name: "Turkey", paths: turkeyPaths, subjects: ["Five"] },
  { name: "Ukraine", paths: ukrainePaths, subjects: ["Three"] },
  { name: "United Kingdom", paths: unitedKingdomPaths, subjects: ["Ball"] },
] as const;
