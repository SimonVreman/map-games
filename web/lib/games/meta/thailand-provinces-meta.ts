import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  "TH-10": {
    label: "Bangkok Metropolis"
  },
  "TH-11": {
    label: "Samut Prakan"
  },
  "TH-12": {
    label: "Nonthaburi"
  },
  "TH-13": {
    label: "Pathum Thani"
  },
  "TH-14": {
    label: "Phra Nakhon Si Ayutthaya"
  },
  "TH-15": {
    label: "Ang Thong"
  },
  "TH-16": {
    label: "Lop Buri"
  },
  "TH-17": {
    label: "Sing Buri"
  },
  "TH-18": {
    label: "Chai Nat"
  },
  "TH-19": {
    label: "Saraburi"
  },
  "TH-20": {
    label: "Chon Buri"
  },
  "TH-21": {
    label: "Rayong"
  },
  "TH-22": {
    label: "Chanthaburi"
  },
  "TH-23": {
    label: "Trat"
  },
  "TH-24": {
    label: "Chachoengsao"
  },
  "TH-25": {
    label: "Prachin Buri"
  },
  "TH-26": {
    label: "Nakhon Nayok"
  },
  "TH-27": {
    label: "Sa Kaeo"
  },
  "TH-30": {
    label: "Nakhon Ratchasima"
  },
  "TH-31": {
    label: "Buri Ram"
  },
  "TH-32": {
    label: "Surin"
  },
  "TH-33": {
    label: "Si Sa Ket"
  },
  "TH-34": {
    label: "Ubon Ratchathani"
  },
  "TH-35": {
    label: "Yasothon"
  },
  "TH-36": {
    label: "Chaiyaphum"
  },
  "TH-37": {
    label: "Amnat Charoen"
  },
  "TH-38": {
    label: "Bueng Kan"
  },
  "TH-39": {
    label: "Nong Bua Lam Phu"
  },
  "TH-40": {
    label: "Khon Kaen"
  },
  "TH-41": {
    label: "Udon Thani"
  },
  "TH-42": {
    label: "Loei"
  },
  "TH-43": {
    label: "Nong Khai"
  },
  "TH-44": {
    label: "Maha Sarakham"
  },
  "TH-45": {
    label: "Roi Et"
  },
  "TH-46": {
    label: "Kalasin"
  },
  "TH-47": {
    label: "Sakon Nakhon"
  },
  "TH-48": {
    label: "Nakhon Phanom"
  },
  "TH-49": {
    label: "Mukdahan"
  },
  "TH-50": {
    label: "Chiang Mai"
  },
  "TH-51": {
    label: "Lamphun"
  },
  "TH-52": {
    label: "Lampang"
  },
  "TH-53": {
    label: "Uttaradit"
  },
  "TH-54": {
    label: "Phrae"
  },
  "TH-55": {
    label: "Nan"
  },
  "TH-56": {
    label: "Phayao"
  },
  "TH-57": {
    label: "Chiang Rai"
  },
  "TH-58": {
    label: "Mae Hong Son"
  },
  "TH-60": {
    label: "Nakhon Sawan"
  },
  "TH-61": {
    label: "Uthai Thani"
  },
  "TH-62": {
    label: "Kamphaeng Phet"
  },
  "TH-63": {
    label: "Tak"
  },
  "TH-64": {
    label: "Sukhothai"
  },
  "TH-65": {
    label: "Phitsanulok"
  },
  "TH-66": {
    label: "Phichit"
  },
  "TH-67": {
    label: "Phetchabun"
  },
  "TH-70": {
    label: "Ratchaburi"
  },
  "TH-71": {
    label: "Kanchanaburi"
  },
  "TH-72": {
    label: "Suphan Buri"
  },
  "TH-73": {
    label: "Nakhon Pathom"
  },
  "TH-74": {
    label: "Samut Sakhon"
  },
  "TH-75": {
    label: "Samut Songkhram"
  },
  "TH-76": {
    label: "Phetchaburi"
  },
  "TH-77": {
    label: "Prachuap Khiri Khan"
  },
  "TH-80": {
    label: "Nakhon Si Thammarat"
  },
  "TH-81": {
    label: "Krabi"
  },
  "TH-82": {
    label: "Phangnga"
  },
  "TH-83": {
    label: "Phuket"
  },
  "TH-84": {
    label: "Surat Thani"
  },
  "TH-85": {
    label: "Ranong"
  },
  "TH-86": {
    label: "Chumphon"
  },
  "TH-90": {
    label: "Songkhla"
  },
  "TH-91": {
    label: "Satun"
  },
  "TH-92": {
    label: "Trang"
  },
  "TH-93": {
    label: "Phatthalung"
  },
  "TH-94": {
    label: "Pattani"
  },
  "TH-95": {
    label: "Yala"
  },
  "TH-96": {
    label: "Narathiwat"
  }
};

const targets: QuizTarget[] = [
  {
    id: "TH-10",
    subjects: ["TH-10"],
  },
  {
    id: "TH-11",
    subjects: ["TH-11"],
  },
  {
    id: "TH-12",
    subjects: ["TH-12"],
  },
  {
    id: "TH-13",
    subjects: ["TH-13"],
  },
  {
    id: "TH-14",
    subjects: ["TH-14"],
  },
  {
    id: "TH-15",
    subjects: ["TH-15"],
  },
  {
    id: "TH-16",
    subjects: ["TH-16"],
  },
  {
    id: "TH-17",
    subjects: ["TH-17"],
  },
  {
    id: "TH-18",
    subjects: ["TH-18"],
  },
  {
    id: "TH-19",
    subjects: ["TH-19"],
  },
  {
    id: "TH-20",
    subjects: ["TH-20"],
  },
  {
    id: "TH-21",
    subjects: ["TH-21"],
  },
  {
    id: "TH-22",
    subjects: ["TH-22"],
  },
  {
    id: "TH-23",
    subjects: ["TH-23"],
  },
  {
    id: "TH-24",
    subjects: ["TH-24"],
  },
  {
    id: "TH-25",
    subjects: ["TH-25"],
  },
  {
    id: "TH-26",
    subjects: ["TH-26"],
  },
  {
    id: "TH-27",
    subjects: ["TH-27"],
  },
  {
    id: "TH-30",
    subjects: ["TH-30"],
  },
  {
    id: "TH-31",
    subjects: ["TH-31"],
  },
  {
    id: "TH-32",
    subjects: ["TH-32"],
  },
  {
    id: "TH-33",
    subjects: ["TH-33"],
  },
  {
    id: "TH-34",
    subjects: ["TH-34"],
  },
  {
    id: "TH-35",
    subjects: ["TH-35"],
  },
  {
    id: "TH-36",
    subjects: ["TH-36"],
  },
  {
    id: "TH-37",
    subjects: ["TH-37"],
  },
  {
    id: "TH-38",
    subjects: ["TH-38"],
  },
  {
    id: "TH-39",
    subjects: ["TH-39"],
  },
  {
    id: "TH-40",
    subjects: ["TH-40"],
  },
  {
    id: "TH-41",
    subjects: ["TH-41"],
  },
  {
    id: "TH-42",
    subjects: ["TH-42"],
  },
  {
    id: "TH-43",
    subjects: ["TH-43"],
  },
  {
    id: "TH-44",
    subjects: ["TH-44"],
  },
  {
    id: "TH-45",
    subjects: ["TH-45"],
  },
  {
    id: "TH-46",
    subjects: ["TH-46"],
  },
  {
    id: "TH-47",
    subjects: ["TH-47"],
  },
  {
    id: "TH-48",
    subjects: ["TH-48"],
  },
  {
    id: "TH-49",
    subjects: ["TH-49"],
  },
  {
    id: "TH-50",
    subjects: ["TH-50"],
  },
  {
    id: "TH-51",
    subjects: ["TH-51"],
  },
  {
    id: "TH-52",
    subjects: ["TH-52"],
  },
  {
    id: "TH-53",
    subjects: ["TH-53"],
  },
  {
    id: "TH-54",
    subjects: ["TH-54"],
  },
  {
    id: "TH-55",
    subjects: ["TH-55"],
  },
  {
    id: "TH-56",
    subjects: ["TH-56"],
  },
  {
    id: "TH-57",
    subjects: ["TH-57"],
  },
  {
    id: "TH-58",
    subjects: ["TH-58"],
  },
  {
    id: "TH-60",
    subjects: ["TH-60"],
  },
  {
    id: "TH-61",
    subjects: ["TH-61"],
  },
  {
    id: "TH-62",
    subjects: ["TH-62"],
  },
  {
    id: "TH-63",
    subjects: ["TH-63"],
  },
  {
    id: "TH-64",
    subjects: ["TH-64"],
  },
  {
    id: "TH-65",
    subjects: ["TH-65"],
  },
  {
    id: "TH-66",
    subjects: ["TH-66"],
  },
  {
    id: "TH-67",
    subjects: ["TH-67"],
  },
  {
    id: "TH-70",
    subjects: ["TH-70"],
  },
  {
    id: "TH-71",
    subjects: ["TH-71"],
  },
  {
    id: "TH-72",
    subjects: ["TH-72"],
  },
  {
    id: "TH-73",
    subjects: ["TH-73"],
  },
  {
    id: "TH-74",
    subjects: ["TH-74"],
  },
  {
    id: "TH-75",
    subjects: ["TH-75"],
  },
  {
    id: "TH-76",
    subjects: ["TH-76"],
  },
  {
    id: "TH-77",
    subjects: ["TH-77"],
  },
  {
    id: "TH-80",
    subjects: ["TH-80"],
  },
  {
    id: "TH-81",
    subjects: ["TH-81"],
  },
  {
    id: "TH-82",
    subjects: ["TH-82"],
  },
  {
    id: "TH-83",
    subjects: ["TH-83"],
  },
  {
    id: "TH-84",
    subjects: ["TH-84"],
  },
  {
    id: "TH-85",
    subjects: ["TH-85"],
  },
  {
    id: "TH-86",
    subjects: ["TH-86"],
  },
  {
    id: "TH-90",
    subjects: ["TH-90"],
  },
  {
    id: "TH-91",
    subjects: ["TH-91"],
  },
  {
    id: "TH-92",
    subjects: ["TH-92"],
  },
  {
    id: "TH-93",
    subjects: ["TH-93"],
  },
  {
    id: "TH-94",
    subjects: ["TH-94"],
  },
  {
    id: "TH-95",
    subjects: ["TH-95"],
  },
  {
    id: "TH-96",
    subjects: ["TH-96"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "north",
    label: "North",
    subjects: ["TH-57","TH-50","TH-58","TH-63","TH-56","TH-55","TH-53","TH-65","TH-42","TH-62","TH-52","TH-64","TH-66","TH-54","TH-51"],
  },
  {
    id: "east",
    label: "East",
    subjects: ["TH-32","TH-33","TH-34","TH-27","TH-31","TH-23","TH-22","TH-38","TH-43","TH-48","TH-49","TH-37","TH-40","TH-47","TH-30","TH-46","TH-45","TH-44","TH-39","TH-41","TH-67","TH-36","TH-35"],
  },
  {
    id: "central",
    label: "Central",
    subjects: ["TH-71","TH-70","TH-75","TH-74","TH-10","TH-11","TH-24","TH-20","TH-21","TH-72","TH-17","TH-18","TH-15","TH-19","TH-26","TH-13","TH-61","TH-16","TH-14","TH-12","TH-73","TH-60","TH-25"],
  },
  {
    id: "south",
    label: "South",
    subjects: ["TH-91","TH-90","TH-95","TH-96","TH-77","TH-76","TH-86","TH-85","TH-82","TH-81","TH-92","TH-94","TH-93","TH-80","TH-84","TH-83"],
  }
];

export const thailandProvinces = { subjects, targets, subsets };
