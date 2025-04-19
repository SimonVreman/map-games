import { albaniaPaths, albaniaMeta } from "../paths/albania";
import { andorraPaths, andorraMeta } from "../paths/andorra";
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
import { liechtensteinPaths, liechtensteinMeta } from "../paths/liechtenstein";
import { lithuaniaPaths, lithuaniaMeta } from "../paths/lithuania";
import { luxembourgPaths, luxembourgMeta } from "../paths/luxembourg";
import { maltaPaths, maltaMeta } from "../paths/malta";
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

export const bollardTypes = [
  { name: "albaniaItalyMaltaSanMarino" },
  { name: "andorraSpain" },
  { name: "austria" },
  { name: "belgium" },
  { name: "croatiaBulgariaNorthMacedonia" },
  { name: "cyprus" },
  { name: "czechiaSlovakia" },
  { name: "denmark" },
  { name: "estoniaFinlandSweden" },
  { name: "estoniaSweden" },
  { name: "finlandLatvia" },
  { name: "latvia" },
  { name: "norway" },
  { name: "lithuania" },
  { name: "swedenGermanyLuxembourgSwitzerland" },
  { name: "france" },
  { name: "germany" },
  { name: "greece" },
  { name: "hungary" },
  { name: "iceland" },
  { name: "ireland" },
  { name: "liechtensteinSwitzerland" },
  { name: "montenegroSlovenia" },
  { name: "northMacedonia" },
  { name: "poland" },
  { name: "portugal" },
  { name: "romania" },
  { name: "turkey" },
  { name: "serbia" },
  { name: "serbia2" },
  { name: "spain" },
  { name: "ukraine" },
  { name: "unitedKingdom" },
  { name: "netherlands" },
  { name: "netherlands2" },
  { name: "russia" },
  { name: "russia2" },
  { name: "russiaUkraine" },
] as const;

export const europeanBollards = [
  {
    name: "Albania",
    paths: albaniaPaths,
    meta: albaniaMeta,
    subjects: ["albaniaItalyMaltaSanMarino"],
  },
  {
    name: "Andorra",
    paths: andorraPaths,
    meta: andorraMeta,
    subjects: ["andorraSpain"],
  },
  {
    name: "Austria",
    paths: austriaPaths,
    meta: austriaMeta,
    subjects: ["austria"],
  },
  // {
  //   name: "Belarus",
  //   paths: belarusPaths,
  //   meta: belarusMeta,
  //   subjects: [],
  // },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["belgium"],
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
    subjects: ["croatiaBulgariaNorthMacedonia"],
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["croatiaBulgariaNorthMacedonia"],
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["cyprus"],
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["czechiaSlovakia"],
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["denmark"],
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["estoniaFinlandSweden", "estoniaSweden"],
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["estoniaFinlandSweden", "finlandLatvia"],
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["france"],
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["swedenGermanyLuxembourgSwitzerland", "germany"],
  },
  {
    name: "Greece",
    paths: greecePaths,
    meta: greeceMeta,
    subjects: ["greece"],
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["hungary"],
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["iceland"],
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["ireland"],
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["albaniaItalyMaltaSanMarino"],
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["serbia", "serbia2"],
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    meta: latviaMeta,
    subjects: ["latvia", "finlandLatvia"],
  },
  {
    name: "Liechtenstein",
    paths: liechtensteinPaths,
    meta: liechtensteinMeta,
    subjects: ["liechtensteinSwitzerland"],
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    meta: lithuaniaMeta,
    subjects: ["lithuania"],
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["swedenGermanyLuxembourgSwitzerland"],
  },
  {
    name: "Malta",
    paths: maltaPaths,
    meta: maltaMeta,
    subjects: ["albaniaItalyMaltaSanMarino"],
  },
  // {
  //   name: "Monaco",
  //   paths: monacoPaths,
  //   meta: monacoMeta,
  //   subjects: [],
  // },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    meta: montenegroMeta,
    subjects: ["montenegroSlovenia"],
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["netherlands", "netherlands2"],
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["croatiaBulgariaNorthMacedonia", "northMacedonia"],
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["norway"],
  },
  // {
  //   name: "Moldova",
  //   paths: moldovaPaths,
  //   meta: moldovaMeta,
  //   subjects: [],
  // },
  {
    name: "Poland",
    paths: polandPaths,
    meta: polandMeta,
    subjects: ["poland"],
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["portugal"],
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    meta: republicOfSerbiaMeta,
    subjects: ["serbia", "serbia2"],
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["romania"],
  },
  {
    name: "Russia",
    paths: russiaPaths,
    meta: russiaMeta,
    subjects: ["russia2", "russia", "russiaUkraine"],
  },
  {
    name: "San Marino",
    paths: sanMarinoPaths,
    meta: sanMarinoMeta,
    subjects: ["albaniaItalyMaltaSanMarino"],
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["czechiaSlovakia"],
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["montenegroSlovenia"],
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["spain", "andorraSpain"],
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    meta: swedenMeta,
    subjects: [
      "estoniaFinlandSweden",
      "estoniaSweden",
      "swedenGermanyLuxembourgSwitzerland",
    ],
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: [
      "swedenGermanyLuxembourgSwitzerland",
      "liechtensteinSwitzerland",
    ],
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    meta: turkeyMeta,
    subjects: ["turkey"],
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["russiaUkraine", "ukraine"],
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["unitedKingdom"],
  },
] as const;
