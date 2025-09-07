import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

const subjects: Record<string, QuizSubject> = {
  "VN-01": {
    label: "Lai Chau"
  },
  "VN-02": {
    label: "Lào Cai"
  },
  "VN-04": {
    label: "Cao Bằng"
  },
  "VN-05": {
    label: "Son La"
  },
  "VN-07": {
    label: "Tuyên Quang"
  },
  "VN-09": {
    label: "Lạng Sơn"
  },
  "VN-13": {
    label: "Quảng Ninh"
  },
  "VN-18": {
    label: "Ninh Bình"
  },
  "VN-21": {
    label: "Thanh Hóa"
  },
  "VN-22": {
    label: "Nghệ An"
  },
  "VN-23": {
    label: "Ha Tinh"
  },
  "VN-25": {
    label: "Quảng Trị"
  },
  "VN-26": {
    label: "Thừa Thiên - Huế"
  },
  "VN-29": {
    label: "Quảng Ngãi"
  },
  "VN-30": {
    label: "Gia Lai"
  },
  "VN-33": {
    label: "Đắk Lắk"
  },
  "VN-34": {
    label: "Khánh Hòa"
  },
  "VN-35": {
    label: "Lâm Đồng"
  },
  "VN-37": {
    label: "Tây Ninh"
  },
  "VN-39": {
    label: "Đông Nam Bộ"
  },
  "VN-44": {
    label: "An Giang"
  },
  "VN-45": {
    label: "Ðong Tháp"
  },
  "VN-49": {
    label: "Vĩnh Long"
  },
  "VN-56": {
    label: "Bắc Ninh"
  },
  "VN-59": {
    label: "Cà Mau"
  },
  "VN-66": {
    label: "Đồng Bằng Sông Hồng"
  },
  "VN-68": {
    label: "Phú Thọ"
  },
  "VN-69": {
    label: "Thái Nguyên"
  },
  "VN-71": {
    label: "Điện Biên"
  },
  "VN-CT": {
    label: "Can Tho"
  },
  "VN-DN": {
    label: "Đà Nẵng"
  },
  "VN-HN": {
    label: "Ha Noi"
  },
  "VN-HP": {
    label: "Hải Phòng"
  },
  "VN-SG": {
    label: "Hồ Chí Minh city"
  }
};

const targets: QuizTarget[] = [
  {
    id: "VN-01",
    subjects: ["VN-01"],
  },
  {
    id: "VN-02",
    subjects: ["VN-02"],
  },
  {
    id: "VN-04",
    subjects: ["VN-04"],
  },
  {
    id: "VN-05",
    subjects: ["VN-05"],
  },
  {
    id: "VN-07",
    subjects: ["VN-07"],
  },
  {
    id: "VN-09",
    subjects: ["VN-09"],
  },
  {
    id: "VN-13",
    subjects: ["VN-13"],
  },
  {
    id: "VN-18",
    subjects: ["VN-18"],
  },
  {
    id: "VN-21",
    subjects: ["VN-21"],
  },
  {
    id: "VN-22",
    subjects: ["VN-22"],
  },
  {
    id: "VN-23",
    subjects: ["VN-23"],
  },
  {
    id: "VN-25",
    subjects: ["VN-25"],
  },
  {
    id: "VN-26",
    subjects: ["VN-26"],
  },
  {
    id: "VN-29",
    subjects: ["VN-29"],
  },
  {
    id: "VN-30",
    subjects: ["VN-30"],
  },
  {
    id: "VN-33",
    subjects: ["VN-33"],
  },
  {
    id: "VN-34",
    subjects: ["VN-34"],
  },
  {
    id: "VN-35",
    subjects: ["VN-35"],
  },
  {
    id: "VN-37",
    subjects: ["VN-37"],
  },
  {
    id: "VN-39",
    subjects: ["VN-39"],
  },
  {
    id: "VN-44",
    subjects: ["VN-44"],
  },
  {
    id: "VN-45",
    subjects: ["VN-45"],
  },
  {
    id: "VN-49",
    subjects: ["VN-49"],
  },
  {
    id: "VN-56",
    subjects: ["VN-56"],
  },
  {
    id: "VN-59",
    subjects: ["VN-59"],
  },
  {
    id: "VN-66",
    subjects: ["VN-66"],
  },
  {
    id: "VN-68",
    subjects: ["VN-68"],
  },
  {
    id: "VN-69",
    subjects: ["VN-69"],
  },
  {
    id: "VN-71",
    subjects: ["VN-71"],
  },
  {
    id: "VN-CT",
    subjects: ["VN-CT"],
  },
  {
    id: "VN-DN",
    subjects: ["VN-DN"],
  },
  {
    id: "VN-HN",
    subjects: ["VN-HN"],
  },
  {
    id: "VN-HP",
    subjects: ["VN-HP"],
  },
  {
    id: "VN-SG",
    subjects: ["VN-SG"],
  }
];

const subsets: QuizSubset[] = [
  {
    id: "north",
    label: "North",
    subjects: ["VN-71","VN-05","VN-21","VN-22","VN-04","VN-02","VN-01","VN-09","VN-13","VN-18","VN-HP","VN-07","VN-68","VN-HN","VN-66","VN-56","VN-69"],
  },
  {
    id: "middle",
    label: "Middle",
    subjects: ["VN-33","VN-30","VN-23","VN-25","VN-26","VN-34","VN-29","VN-DN","VN-35"],
  },
  {
    id: "south",
    label: "South",
    subjects: ["VN-37","VN-45","VN-44","VN-SG","VN-59","VN-49","VN-39","VN-CT"],
  }
];

export const vietnamProvinces = { subjects, targets, subsets };
