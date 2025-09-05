import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  "91": {
    label: "91"
  },
  "920": {
    label: "920"
  },
  "921": {
    label: "921"
  },
  "922": {
    label: "922"
  },
  "923": {
    label: "923"
  },
  "924": {
    label: "924"
  },
  "925": {
    label: "925"
  },
  "926": {
    label: "926"
  },
  "927": {
    label: "927"
  },
  "928": {
    label: "928"
  },
  "93": {
    label: "93"
  },
  "94": {
    label: "94"
  },
  "941": {
    label: "941"
  },
  "942": {
    label: "942"
  },
  "943": {
    label: "943"
  },
  "945": {
    label: "945"
  },
  "947": {
    label: "947"
  },
  "948": {
    label: "948"
  },
  "949": {
    label: "949"
  },
  "95": {
    label: "95"
  },
  "950": {
    label: "950"
  },
  "953": {
    label: "953"
  },
  "956": {
    label: "956"
  },
  "957": {
    label: "957"
  },
  "958": {
    label: "958"
  },
  "959": {
    label: "959"
  },
  "96": {
    label: "96"
  },
  "964": {
    label: "964"
  },
  "967": {
    label: "967"
  },
  "968": {
    label: "968"
  },
  "969": {
    label: "969"
  },
  "971": {
    label: "971"
  },
  "972": {
    label: "972"
  },
  "973": {
    label: "973"
  },
  "974": {
    label: "974"
  },
  "975": {
    label: "975"
  },
  "976": {
    label: "976"
  },
  "977": {
    label: "977"
  },
  "978": {
    label: "978"
  },
  "979": {
    label: "979"
  },
  "98": {
    label: "98"
  },
  "980": {
    label: "980"
  },
  "981": {
    label: "981"
  },
  "982": {
    label: "982"
  },
  "983": {
    label: "983"
  },
  "986": {
    label: "986"
  },
  "987": {
    label: "987"
  },
  "988": {
    label: "988"
  }
};

const targets: QuizTarget[] = [
  {
    id: "91",
    subjects: ["91"],
  },
  {
    id: "920",
    subjects: ["920"],
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
    id: "923",
    subjects: ["923"],
  },
  {
    id: "924",
    subjects: ["924"],
  },
  {
    id: "925",
    subjects: ["925"],
  },
  {
    id: "926",
    subjects: ["926"],
  },
  {
    id: "927",
    subjects: ["927"],
  },
  {
    id: "928",
    subjects: ["928"],
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
    id: "941",
    subjects: ["941"],
  },
  {
    id: "942",
    subjects: ["942"],
  },
  {
    id: "943",
    subjects: ["943"],
  },
  {
    id: "945",
    subjects: ["945"],
  },
  {
    id: "947",
    subjects: ["947"],
  },
  {
    id: "948",
    subjects: ["948"],
  },
  {
    id: "949",
    subjects: ["949"],
  },
  {
    id: "95",
    subjects: ["95"],
  },
  {
    id: "950",
    subjects: ["950"],
  },
  {
    id: "953",
    subjects: ["953"],
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
    id: "958",
    subjects: ["958"],
  },
  {
    id: "959",
    subjects: ["959"],
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
    id: "967",
    subjects: ["967"],
  },
  {
    id: "968",
    subjects: ["968"],
  },
  {
    id: "969",
    subjects: ["969"],
  },
  {
    id: "971",
    subjects: ["971"],
  },
  {
    id: "972",
    subjects: ["972"],
  },
  {
    id: "973",
    subjects: ["973"],
  },
  {
    id: "974",
    subjects: ["974"],
  },
  {
    id: "975",
    subjects: ["975"],
  },
  {
    id: "976",
    subjects: ["976"],
  },
  {
    id: "977",
    subjects: ["977"],
  },
  {
    id: "978",
    subjects: ["978"],
  },
  {
    id: "979",
    subjects: ["979"],
  },
  {
    id: "98",
    subjects: ["98"],
  },
  {
    id: "980",
    subjects: ["980"],
  },
  {
    id: "981",
    subjects: ["981"],
  },
  {
    id: "982",
    subjects: ["982"],
  },
  {
    id: "983",
    subjects: ["983"],
  },
  {
    id: "986",
    subjects: ["986"],
  },
  {
    id: "987",
    subjects: ["987"],
  },
  {
    id: "988",
    subjects: ["988"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "nw",
    label: "North West",
    subjects: ["94","941","942","943","945","947","948","949","98","980","981","982","983","986","987","988"],
  },
  {
    id: "ne",
    label: "North East",
    subjects: ["93","971","972","973","974","975","976","977","978","979"],
  },
  {
    id: "se",
    label: "South East",
    subjects: ["95","950","953","956","957","958","959","96","964","967","968","969"],
  },
  {
    id: "sw",
    label: "West",
    subjects: ["91","920","921","922","923","924","925","926","927","928"],
  }
];

export const spainDialingCodes = { subjects, targets, subsets };
