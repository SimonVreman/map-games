import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  95: {
    label: "95"
  },
  959: {
    label: "959"
  },
  956: {
    label: "956"
  },
  957: {
    label: "957"
  },
  953: {
    label: "953"
  },
  958: {
    label: "958"
  },
  950: {
    label: "950"
  },
  926: {
    label: "926"
  },
  924: {
    label: "924"
  },
  920: {
    label: "920"
  },
  927: {
    label: "927"
  },
  925: {
    label: "925"
  },
  923: {
    label: "923"
  },
  921: {
    label: "921"
  },
  922: {
    label: "922"
  },
  928: {
    label: "928"
  },
  91: {
    label: "91"
  },
  969: {
    label: "969"
  },
  967: {
    label: "967"
  },
  968: {
    label: "968"
  },
  96: {
    label: "96"
  },
  964: {
    label: "964"
  },
  978: {
    label: "978"
  },
  976: {
    label: "976"
  },
  975: {
    label: "975"
  },
  974: {
    label: "974"
  },
  979: {
    label: "979"
  },
  973: {
    label: "973"
  },
  977: {
    label: "977"
  },
  972: {
    label: "972"
  },
  971: {
    label: "971"
  },
  93: {
    label: "93"
  },
  949: {
    label: "949"
  },
  947: {
    label: "947"
  },
  941: {
    label: "941"
  },
  948: {
    label: "948"
  },
  945: {
    label: "945"
  },
  943: {
    label: "943"
  },
  94: {
    label: "94"
  },
  942: {
    label: "942"
  },
  98: {
    label: "98"
  },
  987: {
    label: "987"
  },
  983: {
    label: "983"
  },
  980: {
    label: "980"
  },
  988: {
    label: "988"
  },
  982: {
    label: "982"
  },
  981: {
    label: "981"
  },
  986: {
    label: "986"
  }
};

const targets: QuizTarget[] = [
  {
    id: "95",
    subjects: ["95"],
  },
  {
    id: "959",
    subjects: ["959"],
  },
  {
    id: "956",
    subjects: ["956"],
  },
  {
    id: "957",
    subjects: ["957"],
  },
  {
    id: "953",
    subjects: ["953"],
  },
  {
    id: "958",
    subjects: ["958"],
  },
  {
    id: "950",
    subjects: ["950"],
  },
  {
    id: "926",
    subjects: ["926"],
  },
  {
    id: "924",
    subjects: ["924"],
  },
  {
    id: "920",
    subjects: ["920"],
  },
  {
    id: "927",
    subjects: ["927"],
  },
  {
    id: "925",
    subjects: ["925"],
  },
  {
    id: "923",
    subjects: ["923"],
  },
  {
    id: "921",
    subjects: ["921"],
  },
  {
    id: "922",
    subjects: ["922"],
  },
  {
    id: "928",
    subjects: ["928"],
  },
  {
    id: "91",
    subjects: ["91"],
  },
  {
    id: "969",
    subjects: ["969"],
  },
  {
    id: "967",
    subjects: ["967"],
  },
  {
    id: "968",
    subjects: ["968"],
  },
  {
    id: "96",
    subjects: ["96"],
  },
  {
    id: "964",
    subjects: ["964"],
  },
  {
    id: "978",
    subjects: ["978"],
  },
  {
    id: "976",
    subjects: ["976"],
  },
  {
    id: "975",
    subjects: ["975"],
  },
  {
    id: "974",
    subjects: ["974"],
  },
  {
    id: "979",
    subjects: ["979"],
  },
  {
    id: "973",
    subjects: ["973"],
  },
  {
    id: "977",
    subjects: ["977"],
  },
  {
    id: "972",
    subjects: ["972"],
  },
  {
    id: "971",
    subjects: ["971"],
  },
  {
    id: "93",
    subjects: ["93"],
  },
  {
    id: "949",
    subjects: ["949"],
  },
  {
    id: "947",
    subjects: ["947"],
  },
  {
    id: "941",
    subjects: ["941"],
  },
  {
    id: "948",
    subjects: ["948"],
  },
  {
    id: "945",
    subjects: ["945"],
  },
  {
    id: "943",
    subjects: ["943"],
  },
  {
    id: "94",
    subjects: ["94"],
  },
  {
    id: "942",
    subjects: ["942"],
  },
  {
    id: "98",
    subjects: ["98"],
  },
  {
    id: "987",
    subjects: ["987"],
  },
  {
    id: "983",
    subjects: ["983"],
  },
  {
    id: "980",
    subjects: ["980"],
  },
  {
    id: "988",
    subjects: ["988"],
  },
  {
    id: "982",
    subjects: ["982"],
  },
  {
    id: "981",
    subjects: ["981"],
  },
  {
    id: "986",
    subjects: ["986"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "nw",
    label: "North West",
    subjects: ["949","947","941","948","945","943","94","942","98","987","983","980","988","982","981","986"],
  },
  {
    id: "ne",
    label: "North East",
    subjects: ["978","976","975","974","979","973","977","972","971","93"],
  },
  {
    id: "se",
    label: "South East",
    subjects: ["95","959","956","957","953","958","950","969","967","968","96","964"],
  },
  {
    id: "sw",
    label: "West",
    subjects: ["926","924","920","927","925","923","921","922","928","91"],
  }
];

export const spainDialingCodes = { subjects, targets, subsets };
