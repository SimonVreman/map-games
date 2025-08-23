import { expressions } from "./expressions";

export const map = {
  sources: { tiles: "tiles" },
  fonts: { regular: "figtree-regular", bold: "figtree-bold" },
  icons: { placeMajor: "place-major", placeMinor: "place-minor" },
  colors: {
    land: expressions.theme("hsl(210 40% 98%)", "hsl(217.2 32.6% 17.5%)"),
    water: expressions.theme("hsl(204 93.8% 93.7%)", "hsl(222.2 84% 4.9%)"),
    grid: expressions.theme("hsl(204 80% 90%)", "hsl(222.2 71% 8%)"),
    boundary: {
      country: expressions.theme("hsl(0 0% 30%)", "hsl(0 0% 70%)"),
      state: expressions.theme("hsl(0 0% 45%)", "hsl(0 0% 55%)"),
    },
    text: {
      primary: expressions.theme("hsl(0 0% 13.7%)", "hsl(0 0% 86.3%)"),
      secondary: expressions.theme("hsl(0 0% 30%)", "hsl(0 0% 70%)"),
      halo: expressions.theme("hsl(0 0% 100% / 90%)", "hsl(0 0% 0% / 90%)"),
    },
  },
};
