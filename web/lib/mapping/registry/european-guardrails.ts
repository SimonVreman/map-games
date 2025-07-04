import { Pattern, PatternEntry } from "@/types/registry";
import { mapColors } from "../colors";
import { albaniaPaths, albaniaMeta } from "../paths/europe/albania";
import { andorraMeta } from "../paths/europe/andorra";
import { austriaPaths, austriaMeta } from "../paths/europe/austria";
import { belgiumPaths, belgiumMeta } from "../paths/europe/belgium";
import { bulgariaPaths, bulgariaMeta } from "../paths/europe/bulgaria";
import { croatiaPaths, croatiaMeta } from "../paths/europe/croatia";
import { cyprusPaths, cyprusMeta } from "../paths/europe/cyprus";
import { czechiaPaths, czechiaMeta } from "../paths/europe/czechia";
import { denmarkPaths, denmarkMeta } from "../paths/europe/denmark";
import { estoniaPaths, estoniaMeta } from "../paths/europe/estonia";
import { finlandPaths, finlandMeta } from "../paths/europe/finland";
import { francePaths, franceMeta } from "../paths/europe/france";
import { germanyPaths, germanyMeta } from "../paths/europe/germany";
import { greecePaths, greeceMeta } from "../paths/europe/greece";
import { hungaryPaths, hungaryMeta } from "../paths/europe/hungary";
import { icelandPaths, icelandMeta } from "../paths/europe/iceland";
import { irelandPaths, irelandMeta } from "../paths/europe/ireland";
import { italyPaths, italyMeta } from "../paths/europe/italy";
import { kosovoPaths, kosovoMeta } from "../paths/europe/kosovo";
import { latviaPaths, latviaMeta } from "../paths/europe/latvia";
import { liechtensteinMeta } from "../paths/europe/liechtenstein";
import { lithuaniaPaths, lithuaniaMeta } from "../paths/europe/lithuania";
import { luxembourgPaths, luxembourgMeta } from "../paths/europe/luxembourg";
import { maltaMeta } from "../paths/europe/malta";
import { moldovaPaths, moldovaMeta } from "../paths/europe/moldova";
import { monacoMeta } from "../paths/europe/monaco";
import { montenegroPaths, montenegroMeta } from "../paths/europe/montenegro";
import { netherlandsPaths, netherlandsMeta } from "../paths/europe/netherlands";
import {
  northMacedoniaPaths,
  northMacedoniaMeta,
} from "../paths/europe/north-macedonia";
import { norwayPaths, norwayMeta } from "../paths/europe/norway";
import { polandPaths, polandMeta } from "../paths/europe/poland";
import { portugalPaths, portugalMeta } from "../paths/europe/portugal";
import {
  republicOfSerbiaPaths,
  republicOfSerbiaMeta,
} from "../paths/europe/republic-of-serbia";
import { romaniaPaths, romaniaMeta } from "../paths/europe/romania";
import { russiaPaths, russiaMeta } from "../paths/europe/russia";
import { sanMarinoMeta } from "../paths/europe/san-marino";
import { slovakiaPaths, slovakiaMeta } from "../paths/europe/slovakia";
import { sloveniaPaths, sloveniaMeta } from "../paths/europe/slovenia";
import { spainPaths, spainMeta } from "../paths/europe/spain";
import { swedenPaths, swedenMeta } from "../paths/europe/sweden";
import { switzerlandPaths, switzerlandMeta } from "../paths/europe/switzerland";
import { turkeyPaths, turkeyMeta } from "../paths/europe/turkey";
import { ukrainePaths, ukraineMeta } from "../paths/europe/ukraine";
import {
  unitedKingdomPaths,
  unitedKingdomMeta,
} from "../paths/europe/united-kingdom";
import { createTapTarget, createTranslate } from "../pattern";
import { QuizSubset } from "../subsets";

const size = { width: 400, height: 300 };
const t = createTranslate();
const c = mapColors.sweet;

const patterns: Record<string, Pattern> = {
  "A-profile": {
    background: c[0],
    svg: `<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M67.3031 118C65.3096 116.667 59.9935 115.333 59.9935 115.333L317.157 60C317.157 60 322.473 61.3333 324.467 62.6667C326.46 64 337.092 76 339.75 80.6667C342.408 85.3333 343.073 90.6667 339.75 94C336.428 97.3333 317.157 110 315.164 113.333V132C315.164 134.667 337.092 155.333 339.75 159.333C342.408 163.333 342.408 168.667 339.75 172C337.092 175.333 327.125 182.667 324.467 183.333C321.809 184 317.157 184.667 317.157 184.667L68.5445 238.16C68.0429 238.412 67.6208 238.587 67.3031 238.667C64.6451 239.333 59.9935 240 59.9935 240L68.5445 238.16C72.2395 236.304 80.2464 230.268 82.5867 227.333C85.2447 224 85.2447 218.667 82.5867 214.667C79.9287 210.667 58 190 58 187.333L58 168.667C59.9935 165.333 79.2642 152.667 82.5867 149.333C85.9092 146 85.2447 140.667 82.5867 136C79.9287 131.333 69.2966 119.333 67.3031 118Z" fill="url(#paint0_linear_370_31)"/>
<defs>
<linearGradient id="paint0_linear_370_31" x1="167.643" y1="93.3333" x2="193.052" y2="210.633" gradientUnits="userSpaceOnUse">
<stop stop-color="#999999"/>
<stop offset="0.02" stop-color="#D9D9D9"/>
<stop offset="0.25" stop-color="#D9D9D9"/>
<stop offset="0.33" stop-color="#999999"/>
<stop offset="0.376177" stop-color="#999999"/>
<stop offset="0.44" stop-color="#666666"/>
<stop offset="0.53" stop-color="#999999"/>
<stop offset="0.556907" stop-color="#999999"/>
<stop offset="0.601393" stop-color="#CCCCCC"/>
<stop offset="0.848295" stop-color="#CCCCCC"/>
<stop offset="0.9375" stop-color="#999999"/>
</linearGradient>
</defs>
</svg>
`,
  },
  "B-profile": {
    background: c[1],
    svg: `<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M337.061 68.7994L333.256 66.4181C332.827 66.1494 332.312 66.0536 331.815 66.1499L82.4266 114.486C81.9442 114.58 81.8547 115.232 82.2941 115.452L85.4634 117.567C86.0192 117.938 86.3529 118.563 86.3529 119.231V152.461C86.3529 153.398 85.7022 154.209 84.7874 154.413L63.5656 159.135C62.6508 159.339 62 160.151 62 161.088V181.895C62 182.685 62.465 183.401 63.1868 183.722L85.1662 193.504C85.8879 193.825 86.3529 194.541 86.3529 195.331V230.817C86.3529 231.107 86.1893 231.372 85.9301 231.502L80.9976 233.972C80.9886 233.976 80.9932 233.99 81.0031 233.988L332.319 185.278C332.498 185.243 332.671 185.184 332.834 185.103L336.895 183.069C337.572 182.73 338 182.038 338 181.281V146.557C338 145.767 337.535 145.051 336.813 144.73L314.834 134.948C314.112 134.626 313.647 133.91 313.647 133.12V112.314C313.647 111.376 314.298 110.565 315.213 110.361L336.434 105.639C337.349 105.435 338 104.624 338 103.686V70.4948C338 69.8056 337.645 69.1651 337.061 68.7994Z" fill="url(#paint0_linear_370_25)"/>
<defs>
<linearGradient id="paint0_linear_370_25" x1="179.499" y1="96.3918" x2="201.412" y2="210.956" gradientUnits="userSpaceOnUse">
<stop stop-color="#D9D9D9"/>
<stop offset="0.03" stop-color="#E6E6E6"/>
<stop offset="0.04" stop-color="#A6A6A6"/>
<stop offset="0.32" stop-color="#A6A6A6"/>
<stop offset="0.34" stop-color="#666666"/>
<stop offset="0.52" stop-color="#666666"/>
<stop offset="0.56" stop-color="#CCCCCC"/>
<stop offset="0.66" stop-color="#CCCCCC"/>
<stop offset="0.68" stop-color="#A6A6A6"/>
<stop offset="0.98" stop-color="#A6A6A6"/>
<stop offset="1" stop-color="#333333"/>
</linearGradient>
</defs>
</svg>
`,
  },
  "B-profile-thin": {
    background: c[2],
    svg: `<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M337.59 68.5256L334.55 66.6257C333.907 66.2236 333.135 66.0802 332.39 66.2243L81.5743 114.769C81.0889 114.863 80.999 115.519 81.4412 115.74L84.1935 117.575C85.0281 118.132 85.5294 119.068 85.5294 120.071V142.081C85.5294 143.968 83.8087 145.386 81.9568 145.026L64.5726 141.646C62.7207 141.286 61 142.704 61 144.591V200.614C61 201.99 61.9369 203.19 63.2724 203.524L83.257 208.52C84.5925 208.854 85.5294 210.054 85.5294 211.431V231.779C85.5294 232.071 85.3646 232.337 85.1037 232.468L80.1352 234.952C80.1262 234.957 80.1308 234.97 80.1408 234.968L333.145 186C333.413 185.948 333.673 185.86 333.917 185.738L337.342 184.025C338.358 183.517 339 182.478 339 181.342V162.372C339 160.995 338.063 159.795 336.728 159.461L316.743 154.465C315.407 154.131 314.471 152.931 314.471 151.555V103.904C314.471 102.468 315.488 101.234 316.898 100.959L336.573 97.1338C337.982 96.8597 339 95.625 339 94.1889V71.0696C339 70.0353 338.467 69.0739 337.59 68.5256Z" fill="url(#paint0_linear_370_27)"/>
<path d="M83.4853 146.402L61 151.172V145.039C61.2271 144.358 62.9078 142.177 65.0882 141.632L83.4853 145.039V146.402Z" fill="url(#paint1_linear_370_27)"/>
<defs>
<linearGradient id="paint0_linear_370_27" x1="179.351" y1="96.706" x2="201.317" y2="211.835" gradientUnits="userSpaceOnUse">
<stop stop-color="#D9D9D9"/>
<stop offset="0.03" stop-color="#E6E6E6"/>
<stop offset="0.04" stop-color="#A6A6A6"/>
<stop offset="0.23" stop-color="#A6A6A6"/>
<stop offset="0.26" stop-color="#666666"/>
<stop offset="0.41187" stop-color="#8C8C8C"/>
<stop offset="0.68" stop-color="#999999"/>
<stop offset="0.71" stop-color="#CCCCCC"/>
<stop offset="0.78" stop-color="#CCCCCC"/>
<stop offset="0.81" stop-color="#A6A6A6"/>
<stop offset="0.98" stop-color="#A6A6A6"/>
<stop offset="1" stop-color="#333333"/>
</linearGradient>
<linearGradient id="paint1_linear_370_27" x1="65.0882" y1="141.632" x2="66.451" y2="149.127" gradientUnits="userSpaceOnUse">
<stop stop-color="#4D4D4D"/>
<stop offset="1" stop-color="#666666"/>
</linearGradient>
</defs>
</svg>
`,
  },
};

const entries: PatternEntry<typeof patterns>[] = [
  {
    name: "Albania",
    paths: albaniaPaths,
    meta: albaniaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Andorra",
    subjects: ["A-profile"],
    ...createTapTarget(andorraMeta, { scale: 1.3 }),
  },
  {
    name: "Austria",
    paths: austriaPaths,
    meta: austriaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  // { name: "Belarus", paths: belarusPaths, meta: belarusMeta, subjects: [] },
  {
    name: "Belgium",
    paths: belgiumPaths,
    meta: belgiumMeta,
    subjects: ["A-profile"],
    transform: t(),
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
    transform: t(),
  },
  {
    name: "Croatia",
    paths: croatiaPaths,
    meta: croatiaMeta,
    subjects: ["B-profile"],
    transform: t(),
  },
  {
    name: "Cyprus",
    paths: cyprusPaths,
    meta: cyprusMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Czechia",
    paths: czechiaPaths,
    meta: czechiaMeta,
    subjects: ["B-profile-thin"],
    transform: t(),
  },
  {
    name: "Denmark",
    paths: denmarkPaths,
    meta: denmarkMeta,
    subjects: ["B-profile"],
    transform: t(),
  },
  {
    name: "Estonia",
    paths: estoniaPaths,
    meta: estoniaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Finland",
    paths: finlandPaths,
    meta: finlandMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "France",
    paths: francePaths,
    meta: franceMeta,
    subjects: ["A-profile"],
    transform: t({ scale: 0.1 }),
  },
  {
    name: "Germany",
    paths: germanyPaths,
    meta: germanyMeta,
    subjects: ["A-profile", "B-profile"],
    transform: t(),
  },
  {
    name: "Greece",
    paths: greecePaths,
    meta: greeceMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Hungary",
    paths: hungaryPaths,
    meta: hungaryMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Iceland",
    paths: icelandPaths,
    meta: icelandMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Ireland",
    paths: irelandPaths,
    meta: irelandMeta,
    subjects: ["A-profile", "B-profile"],
    transform: t(),
  },
  {
    name: "Italy",
    paths: italyPaths,
    meta: italyMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Kosovo",
    paths: kosovoPaths,
    meta: kosovoMeta,
    subjects: ["B-profile"],
    transform: t(),
  },
  {
    name: "Latvia",
    paths: latviaPaths,
    meta: latviaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Liechtenstein",
    subjects: ["A-profile"],
    ...createTapTarget(liechtensteinMeta, { scale: 1.3 }),
  },
  {
    name: "Lithuania",
    paths: lithuaniaPaths,
    meta: lithuaniaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Luxembourg",
    paths: luxembourgPaths,
    meta: luxembourgMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Malta",
    subjects: ["A-profile"],
    ...createTapTarget(maltaMeta, { scale: 1.3 }),
  },
  {
    name: "Monaco",
    subjects: ["A-profile"],
    ...createTapTarget(monacoMeta, { scale: 1.3 }),
  },
  {
    name: "Montenegro",
    paths: montenegroPaths,
    meta: montenegroMeta,
    subjects: ["A-profile", "B-profile"],
    transform: t(),
  },
  {
    name: "Netherlands",
    paths: netherlandsPaths,
    meta: netherlandsMeta,
    subjects: ["A-profile"],
    transform: t({ scale: 0.2 }),
  },
  {
    name: "North Macedonia",
    paths: northMacedoniaPaths,
    meta: northMacedoniaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Norway",
    paths: norwayPaths,
    meta: norwayMeta,
    subjects: ["A-profile"],
    transform: t({ scale: 0.5 }),
  },
  {
    name: "Moldova",
    paths: moldovaPaths,
    meta: moldovaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Poland",
    paths: polandPaths,
    meta: polandMeta,
    subjects: ["B-profile"],
    transform: t(),
  },
  {
    name: "Portugal",
    paths: portugalPaths,
    meta: portugalMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Serbia",
    paths: republicOfSerbiaPaths,
    meta: republicOfSerbiaMeta,
    subjects: ["B-profile"],
    transform: t(),
  },
  {
    name: "Romania",
    paths: romaniaPaths,
    meta: romaniaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Russia",
    paths: russiaPaths,
    meta: russiaMeta,
    subjects: ["A-profile"],
    transform: t({ scale: 0.1 }),
  },
  {
    name: "San Marino",
    subjects: ["A-profile"],
    ...createTapTarget(sanMarinoMeta, { scale: 1.3 }),
  },
  {
    name: "Slovakia",
    paths: slovakiaPaths,
    meta: slovakiaMeta,
    subjects: ["B-profile-thin"],
    transform: t(),
  },
  {
    name: "Slovenia",
    paths: sloveniaPaths,
    meta: sloveniaMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Spain",
    paths: spainPaths,
    meta: spainMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Sweden",
    paths: swedenPaths,
    meta: swedenMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Switzerland",
    paths: switzerlandPaths,
    meta: switzerlandMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "Turkey",
    paths: turkeyPaths,
    meta: turkeyMeta,
    subjects: ["A-profile", "B-profile"],
    transform: t({ scale: 0.8 }),
  },
  {
    name: "Ukraine",
    paths: ukrainePaths,
    meta: ukraineMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
  {
    name: "United Kingdom",
    paths: unitedKingdomPaths,
    meta: unitedKingdomMeta,
    subjects: ["A-profile"],
    transform: t(),
  },
].sort((a, b) => (a.tiny === true ? 1 : b.tiny === true ? -1 : 0));

const subsets: QuizSubset[] = [
  {
    name: "all",
    label: "All",
    subjects: Object.keys(patterns).filter((n) => n !== "A-profile"),
  },
];

export const europeanGuardrails = { patterns, entries, subsets, size };
