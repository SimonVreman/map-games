import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  11: {
    label: "11"
  },
  12: {
    label: "12"
  },
  13: {
    label: "13"
  },
  14: {
    label: "14"
  },
  15: {
    label: "15"
  },
  16: {
    label: "16"
  },
  17: {
    label: "17"
  },
  18: {
    label: "18"
  },
  19: {
    label: "19"
  },
  21: {
    label: "21"
  },
  22: {
    label: "22"
  },
  24: {
    label: "24"
  },
  27: {
    label: "27"
  },
  28: {
    label: "28"
  },
  31: {
    label: "31"
  },
  32: {
    label: "32"
  },
  33: {
    label: "33"
  },
  34: {
    label: "34"
  },
  35: {
    label: "35"
  },
  37: {
    label: "37"
  },
  38: {
    label: "38"
  },
  41: {
    label: "41"
  },
  42: {
    label: "42"
  },
  43: {
    label: "43"
  },
  44: {
    label: "44"
  },
  45: {
    label: "45"
  },
  46: {
    label: "46"
  },
  47: {
    label: "47"
  },
  48: {
    label: "48"
  },
  49: {
    label: "49"
  },
  51: {
    label: "51"
  },
  53: {
    label: "53"
  },
  54: {
    label: "54"
  },
  55: {
    label: "55"
  },
  61: {
    label: "61"
  },
  62: {
    label: "62"
  },
  63: {
    label: "63"
  },
  64: {
    label: "64"
  },
  65: {
    label: "65"
  },
  66: {
    label: "66"
  },
  67: {
    label: "67"
  },
  68: {
    label: "68"
  },
  69: {
    label: "69"
  },
  71: {
    label: "71"
  },
  73: {
    label: "73"
  },
  74: {
    label: "74"
  },
  75: {
    label: "75"
  },
  77: {
    label: "77"
  },
  79: {
    label: "79"
  },
  81: {
    label: "81"
  },
  82: {
    label: "82"
  },
  83: {
    label: "83"
  },
  84: {
    label: "84"
  },
  85: {
    label: "85"
  },
  86: {
    label: "86"
  },
  87: {
    label: "87"
  },
  88: {
    label: "88"
  },
  89: {
    label: "89"
  },
  91: {
    label: "91"
  },
  92: {
    label: "92"
  },
  93: {
    label: "93"
  },
  94: {
    label: "94"
  },
  95: {
    label: "95"
  },
  96: {
    label: "96"
  },
  97: {
    label: "97"
  },
  98: {
    label: "98"
  },
  99: {
    label: "99"
  }
};

const targets: QuizTarget[] = [
  {
    id: "11",
    subjects: ["11"],
  },
  {
    id: "12",
    subjects: ["12"],
  },
  {
    id: "13",
    subjects: ["13"],
  },
  {
    id: "14",
    subjects: ["14"],
  },
  {
    id: "15",
    subjects: ["15"],
  },
  {
    id: "16",
    subjects: ["16"],
  },
  {
    id: "17",
    subjects: ["17"],
  },
  {
    id: "18",
    subjects: ["18"],
  },
  {
    id: "19",
    subjects: ["19"],
  },
  {
    id: "21",
    subjects: ["21"],
  },
  {
    id: "22",
    subjects: ["22"],
  },
  {
    id: "24",
    subjects: ["24"],
  },
  {
    id: "27",
    subjects: ["27"],
  },
  {
    id: "28",
    subjects: ["28"],
  },
  {
    id: "31",
    subjects: ["31"],
  },
  {
    id: "32",
    subjects: ["32"],
  },
  {
    id: "33",
    subjects: ["33"],
  },
  {
    id: "34",
    subjects: ["34"],
  },
  {
    id: "35",
    subjects: ["35"],
  },
  {
    id: "37",
    subjects: ["37"],
  },
  {
    id: "38",
    subjects: ["38"],
  },
  {
    id: "41",
    subjects: ["41"],
  },
  {
    id: "42",
    subjects: ["42"],
  },
  {
    id: "43",
    subjects: ["43"],
  },
  {
    id: "44",
    subjects: ["44"],
  },
  {
    id: "45",
    subjects: ["45"],
  },
  {
    id: "46",
    subjects: ["46"],
  },
  {
    id: "47",
    subjects: ["47"],
  },
  {
    id: "48",
    subjects: ["48"],
  },
  {
    id: "49",
    subjects: ["49"],
  },
  {
    id: "51",
    subjects: ["51"],
  },
  {
    id: "53",
    subjects: ["53"],
  },
  {
    id: "54",
    subjects: ["54"],
  },
  {
    id: "55",
    subjects: ["55"],
  },
  {
    id: "61",
    subjects: ["61"],
  },
  {
    id: "62",
    subjects: ["62"],
  },
  {
    id: "63",
    subjects: ["63"],
  },
  {
    id: "64",
    subjects: ["64"],
  },
  {
    id: "65",
    subjects: ["65"],
  },
  {
    id: "66",
    subjects: ["66"],
  },
  {
    id: "67",
    subjects: ["67"],
  },
  {
    id: "68",
    subjects: ["68"],
  },
  {
    id: "69",
    subjects: ["69"],
  },
  {
    id: "71",
    subjects: ["71"],
  },
  {
    id: "73",
    subjects: ["73"],
  },
  {
    id: "74",
    subjects: ["74"],
  },
  {
    id: "75",
    subjects: ["75"],
  },
  {
    id: "77",
    subjects: ["77"],
  },
  {
    id: "79",
    subjects: ["79"],
  },
  {
    id: "81",
    subjects: ["81"],
  },
  {
    id: "82",
    subjects: ["82"],
  },
  {
    id: "83",
    subjects: ["83"],
  },
  {
    id: "84",
    subjects: ["84"],
  },
  {
    id: "85",
    subjects: ["85"],
  },
  {
    id: "86",
    subjects: ["86"],
  },
  {
    id: "87",
    subjects: ["87"],
  },
  {
    id: "88",
    subjects: ["88"],
  },
  {
    id: "89",
    subjects: ["89"],
  },
  {
    id: "91",
    subjects: ["91"],
  },
  {
    id: "92",
    subjects: ["92"],
  },
  {
    id: "93",
    subjects: ["93"],
  },
  {
    id: "94",
    subjects: ["94"],
  },
  {
    id: "95",
    subjects: ["95"],
  },
  {
    id: "96",
    subjects: ["96"],
  },
  {
    id: "97",
    subjects: ["97"],
  },
  {
    id: "98",
    subjects: ["98"],
  },
  {
    id: "99",
    subjects: ["99"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "1x",
    label: "1x",
    subjects: ["11","12","13","14","15","16","17","18","19"],
  },
  {
    id: "2x",
    label: "2x",
    subjects: ["21","22","24","27","28"],
  },
  {
    id: "3x",
    label: "3x",
    subjects: ["31","32","33","34","35","37","38"],
  },
  {
    id: "4x",
    label: "4x",
    subjects: ["41","42","43","44","45","46","47","48","49"],
  },
  {
    id: "5x",
    label: "5x",
    subjects: ["51","53","54","55"],
  },
  {
    id: "6x",
    label: "6x",
    subjects: ["61","62","63","64","65","66","67","68","69"],
  },
  {
    id: "7x",
    label: "7x",
    subjects: ["71","73","74","75","77","79"],
  },
  {
    id: "8x",
    label: "8x",
    subjects: ["81","82","83","84","85","86","87","88","89"],
  },
  {
    id: "9x",
    label: "9x",
    subjects: ["91","92","93","94","95","96","97","98","99"],
  }
];

export const brazilDialingCodes = { subjects, targets, subsets };
