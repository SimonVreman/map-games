import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  "PH-ABR": {
    label: "Abra"
  },
  "PH-AGN": {
    label: "Agusan del Norte"
  },
  "PH-AGS": {
    label: "Agusan del Sur"
  },
  "PH-AKL": {
    label: "Aklan"
  },
  "PH-ALB": {
    label: "Albay"
  },
  "PH-ANT": {
    label: "Antique"
  },
  "PH-APA": {
    label: "Apayao"
  },
  "PH-AUR": {
    label: "Aurora"
  },
  "PH-BAN": {
    label: "Bataan"
  },
  "PH-BAS": {
    label: "Basilan"
  },
  "PH-BEN": {
    label: "Benguet"
  },
  "PH-BIL": {
    label: "Biliran"
  },
  "PH-BOH": {
    label: "Bohol"
  },
  "PH-BTG": {
    label: "Batangas"
  },
  "PH-BTN": {
    label: "Batanes"
  },
  "PH-BUK": {
    label: "Bukidnon"
  },
  "PH-BUL": {
    label: "Bulacan"
  },
  "PH-CAG": {
    label: "Cagayan"
  },
  "PH-CAM": {
    label: "Camiguin"
  },
  "PH-CAN": {
    label: "Camarines Norte"
  },
  "PH-CAP": {
    label: "Capiz"
  },
  "PH-CAS": {
    label: "Camarines Sur"
  },
  "PH-CAT": {
    label: "Catanduanes"
  },
  "PH-CAV": {
    label: "Cavite"
  },
  "PH-CEB": {
    label: "Cebu"
  },
  "PH-COM": {
    label: "Compostela Valley"
  },
  "PH-DAO": {
    label: "Davao Oriental"
  },
  "PH-DAS": {
    label: "Davao del Sur"
  },
  "PH-DAV": {
    label: "Davao del Norte"
  },
  "PH-EAS": {
    label: "Eastern Samar"
  },
  "PH-GUI": {
    label: "Guimaras"
  },
  "PH-IFU": {
    label: "Ifugao"
  },
  "PH-ILI": {
    label: "Iloilo"
  },
  "PH-ILN": {
    label: "Ilocos Norte"
  },
  "PH-ILS": {
    label: "Ilocos Sur"
  },
  "PH-ISA": {
    label: "Isabela"
  },
  "PH-KAL": {
    label: "Kalinga"
  },
  "PH-LAG": {
    label: "Laguna"
  },
  "PH-LAN": {
    label: "Lanao del Norte"
  },
  "PH-LAS": {
    label: "Lanao del Sur"
  },
  "PH-LEY": {
    label: "Leyte"
  },
  "PH-LUN": {
    label: "La Union"
  },
  "PH-MAD": {
    label: "Marinduque"
  },
  "PH-MAG": {
    label: "Maguindanao"
  },
  "PH-MAS": {
    label: "Masbate"
  },
  "PH-MDC": {
    label: "Mindoro Occidental"
  },
  "PH-MDR": {
    label: "Mindoro Oriental"
  },
  "PH-MNL": {
    label: "Mandaluyong City"
  },
  "PH-MOU": {
    label: "Mountain Province"
  },
  "PH-MSC": {
    label: "Misamis Occidental"
  },
  "PH-MSR": {
    label: "Misamis Oriental"
  },
  "PH-NCO": {
    label: "Cotabato"
  },
  "PH-NEC": {
    label: "Negros Occidental"
  },
  "PH-NER": {
    label: "Negros Oriental"
  },
  "PH-NSA": {
    label: "Northern Samar"
  },
  "PH-NUE": {
    label: "Nueva Ecija"
  },
  "PH-NUV": {
    label: "Nueva Vizcaya"
  },
  "PH-PAM": {
    label: "Pampanga"
  },
  "PH-PAN": {
    label: "Pangasinan"
  },
  "PH-PLW": {
    label: "Palawan"
  },
  "PH-QUE": {
    label: "Quezon"
  },
  "PH-QUI": {
    label: "Quirino"
  },
  "PH-RIZ": {
    label: "Rizal"
  },
  "PH-ROM": {
    label: "Romblon"
  },
  "PH-SAR": {
    label: "Sarangani"
  },
  "PH-SCO": {
    label: "South Cotabato"
  },
  "PH-SIG": {
    label: "Siquijor"
  },
  "PH-SLE": {
    label: "Southern Leyte"
  },
  "PH-SLU": {
    label: "Sulu"
  },
  "PH-SOR": {
    label: "Sorsogon"
  },
  "PH-SUK": {
    label: "Sultan Kudarat"
  },
  "PH-SUN": {
    label: "Surigao del Norte"
  },
  "PH-SUR": {
    label: "Surigao del Sur"
  },
  "PH-TAR": {
    label: "Tarlac"
  },
  "PH-TAW": {
    label: "Tawi-Tawi"
  },
  "PH-WSA": {
    label: "Samar"
  },
  "PH-ZAN": {
    label: "Zamboanga del Norte"
  },
  "PH-ZAS": {
    label: "Zamboanga del Sur"
  },
  "PH-ZMB": {
    label: "Zambales"
  },
  "PH-ZSI": {
    label: "Zamboanga Sibugay"
  }
};

const targets: QuizTarget[] = [
  {
    id: "PH-ABR",
    subjects: ["PH-ABR"],
  },
  {
    id: "PH-AGN",
    subjects: ["PH-AGN"],
  },
  {
    id: "PH-AGS",
    subjects: ["PH-AGS"],
  },
  {
    id: "PH-AKL",
    subjects: ["PH-AKL"],
  },
  {
    id: "PH-ALB",
    subjects: ["PH-ALB"],
  },
  {
    id: "PH-ANT",
    subjects: ["PH-ANT"],
  },
  {
    id: "PH-APA",
    subjects: ["PH-APA"],
  },
  {
    id: "PH-AUR",
    subjects: ["PH-AUR"],
  },
  {
    id: "PH-BAN",
    subjects: ["PH-BAN"],
  },
  {
    id: "PH-BAS",
    subjects: ["PH-BAS"],
  },
  {
    id: "PH-BEN",
    subjects: ["PH-BEN"],
  },
  {
    id: "PH-BIL",
    subjects: ["PH-BIL"],
  },
  {
    id: "PH-BOH",
    subjects: ["PH-BOH"],
  },
  {
    id: "PH-BTG",
    subjects: ["PH-BTG"],
  },
  {
    id: "PH-BTN",
    subjects: ["PH-BTN"],
  },
  {
    id: "PH-BUK",
    subjects: ["PH-BUK"],
  },
  {
    id: "PH-BUL",
    subjects: ["PH-BUL"],
  },
  {
    id: "PH-CAG",
    subjects: ["PH-CAG"],
  },
  {
    id: "PH-CAM",
    subjects: ["PH-CAM"],
  },
  {
    id: "PH-CAN",
    subjects: ["PH-CAN"],
  },
  {
    id: "PH-CAP",
    subjects: ["PH-CAP"],
  },
  {
    id: "PH-CAS",
    subjects: ["PH-CAS"],
  },
  {
    id: "PH-CAT",
    subjects: ["PH-CAT"],
  },
  {
    id: "PH-CAV",
    subjects: ["PH-CAV"],
  },
  {
    id: "PH-CEB",
    subjects: ["PH-CEB"],
  },
  {
    id: "PH-COM",
    subjects: ["PH-COM"],
  },
  {
    id: "PH-DAO",
    subjects: ["PH-DAO"],
  },
  {
    id: "PH-DAS",
    subjects: ["PH-DAS"],
  },
  {
    id: "PH-DAV",
    subjects: ["PH-DAV"],
  },
  {
    id: "PH-EAS",
    subjects: ["PH-EAS"],
  },
  {
    id: "PH-GUI",
    subjects: ["PH-GUI"],
  },
  {
    id: "PH-IFU",
    subjects: ["PH-IFU"],
  },
  {
    id: "PH-ILI",
    subjects: ["PH-ILI"],
  },
  {
    id: "PH-ILN",
    subjects: ["PH-ILN"],
  },
  {
    id: "PH-ILS",
    subjects: ["PH-ILS"],
  },
  {
    id: "PH-ISA",
    subjects: ["PH-ISA"],
  },
  {
    id: "PH-KAL",
    subjects: ["PH-KAL"],
  },
  {
    id: "PH-LAG",
    subjects: ["PH-LAG"],
  },
  {
    id: "PH-LAN",
    subjects: ["PH-LAN"],
  },
  {
    id: "PH-LAS",
    subjects: ["PH-LAS"],
  },
  {
    id: "PH-LEY",
    subjects: ["PH-LEY"],
  },
  {
    id: "PH-LUN",
    subjects: ["PH-LUN"],
  },
  {
    id: "PH-MAD",
    subjects: ["PH-MAD"],
  },
  {
    id: "PH-MAG",
    subjects: ["PH-MAG"],
  },
  {
    id: "PH-MAS",
    subjects: ["PH-MAS"],
  },
  {
    id: "PH-MDC",
    subjects: ["PH-MDC"],
  },
  {
    id: "PH-MDR",
    subjects: ["PH-MDR"],
  },
  {
    id: "PH-MNL",
    subjects: ["PH-MNL"],
  },
  {
    id: "PH-MOU",
    subjects: ["PH-MOU"],
  },
  {
    id: "PH-MSC",
    subjects: ["PH-MSC"],
  },
  {
    id: "PH-MSR",
    subjects: ["PH-MSR"],
  },
  {
    id: "PH-NCO",
    subjects: ["PH-NCO"],
  },
  {
    id: "PH-NEC",
    subjects: ["PH-NEC"],
  },
  {
    id: "PH-NER",
    subjects: ["PH-NER"],
  },
  {
    id: "PH-NSA",
    subjects: ["PH-NSA"],
  },
  {
    id: "PH-NUE",
    subjects: ["PH-NUE"],
  },
  {
    id: "PH-NUV",
    subjects: ["PH-NUV"],
  },
  {
    id: "PH-PAM",
    subjects: ["PH-PAM"],
  },
  {
    id: "PH-PAN",
    subjects: ["PH-PAN"],
  },
  {
    id: "PH-PLW",
    subjects: ["PH-PLW"],
  },
  {
    id: "PH-QUE",
    subjects: ["PH-QUE"],
  },
  {
    id: "PH-QUI",
    subjects: ["PH-QUI"],
  },
  {
    id: "PH-RIZ",
    subjects: ["PH-RIZ"],
  },
  {
    id: "PH-ROM",
    subjects: ["PH-ROM"],
  },
  {
    id: "PH-SAR",
    subjects: ["PH-SAR"],
  },
  {
    id: "PH-SCO",
    subjects: ["PH-SCO"],
  },
  {
    id: "PH-SIG",
    subjects: ["PH-SIG"],
  },
  {
    id: "PH-SLE",
    subjects: ["PH-SLE"],
  },
  {
    id: "PH-SLU",
    subjects: ["PH-SLU"],
  },
  {
    id: "PH-SOR",
    subjects: ["PH-SOR"],
  },
  {
    id: "PH-SUK",
    subjects: ["PH-SUK"],
  },
  {
    id: "PH-SUN",
    subjects: ["PH-SUN"],
  },
  {
    id: "PH-SUR",
    subjects: ["PH-SUR"],
  },
  {
    id: "PH-TAR",
    subjects: ["PH-TAR"],
  },
  {
    id: "PH-TAW",
    subjects: ["PH-TAW"],
  },
  {
    id: "PH-WSA",
    subjects: ["PH-WSA"],
  },
  {
    id: "PH-ZAN",
    subjects: ["PH-ZAN"],
  },
  {
    id: "PH-ZAS",
    subjects: ["PH-ZAS"],
  },
  {
    id: "PH-ZMB",
    subjects: ["PH-ZMB"],
  },
  {
    id: "PH-ZSI",
    subjects: ["PH-ZSI"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "north",
    label: "North",
    subjects: ["PH-AUR","PH-BUL","PH-PAM","PH-BAN","PH-ZMB","PH-PAN","PH-LUN","PH-ILS","PH-ILN","PH-CAG","PH-ISA","PH-BTN","PH-NUE","PH-RIZ","PH-QUI","PH-NUV","PH-BEN","PH-IFU","PH-MOU","PH-TAR","PH-APA","PH-KAL","PH-ABR","PH-MNL"],
  },
  {
    id: "east",
    label: "East",
    subjects: ["PH-SUN","PH-SUR","PH-SLE","PH-LEY","PH-EAS","PH-BIL","PH-WSA","PH-QUE","PH-CAN","PH-CAS","PH-ALB","PH-SOR","PH-BTG","PH-CAV","PH-NSA","PH-MAS","PH-MAD","PH-CAT","PH-LAG"],
  },
  {
    id: "west",
    label: "West",
    subjects: ["PH-PLW","PH-CAM","PH-SIG","PH-BOH","PH-GUI","PH-NEC","PH-NER","PH-CEB","PH-AKL","PH-ANT","PH-ILI","PH-CAP","PH-ROM","PH-MDR","PH-MDC"],
  },
  {
    id: "south",
    label: "South",
    subjects: ["PH-SLU","PH-DAV","PH-ZSI","PH-AGN","PH-MSR","PH-LAN","PH-ZAS","PH-MSC","PH-ZAN","PH-LAS","PH-MAG","PH-SUK","PH-SAR","PH-DAS","PH-COM","PH-DAO","PH-TAW","PH-BAS","PH-AGS","PH-BUK","PH-NCO","PH-SCO"],
  }
];

export const philippinesProvinces = { subjects, targets, subsets };
