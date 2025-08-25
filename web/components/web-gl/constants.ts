import { expressions } from "./expressions";

export const map = {
  sources: { tiles: "tiles", landcover: "landcover" },
  fonts: { regular: "figtree-regular", bold: "figtree-bold" },
  icons: { placeMajor: "place-major", placeMinor: "place-minor" },
  colors: {
    grid: expressions.theme("hsl(204 80% 90%)", "hsl(222.2 71% 8%)"),
    water: expressions.theme("hsl(190 75% 71%)", "hsl(222 84% 8%)"),
    land: {
      shrubland: expressions.theme("hsl(148 41% 85%)", "hsl(148 41% 23%)"),
      herbaceous: expressions.theme("hsl(105 38% 89%)", "hsl(105 18% 21%)"),
      agriculture: expressions.theme("hsl(150 46% 84%)", "hsl(150 46% 22%)"),
      urban: expressions.theme("hsl(0 0% 90%)", "hsl(0 0% 33%)"),
      bare: expressions.theme("hsl(46 38% 95%)", "hsl(46 28% 17%)"),
      snow: expressions.theme("hsl(0 0% 98%)", "hsl(0 0% 41%)"),
      wetlands: expressions.theme("hsl(152 52% 78%)", "hsl(152 52% 16%)"),
      moss: expressions.theme("hsl(154 21% 82%)", "hsl(154 21% 20%)"),
      forestClosed: expressions.theme("hsl(154 52% 72%)", "hsl(154 46% 10%)"),
      forestOpen: expressions.theme("hsl(154 54% 77%)", "hsl(154 54% 15%)"),
      forest: {
        closed: {
          needle: expressions.theme("hsl(164 44% 68%)", "hsl(164 44% 8%)"),
          broadleaf: expressions.theme("hsl(154 52% 72%)", "hsl(154 48% 12%)"),
          mixed: expressions.theme("hsl(159 48% 70%)", "hsl(159 46% 10%)"),
        },
        open: {
          needle: expressions.theme("hsl(164 44% 75%)", "hsl(164 52% 13%)"),
          broadleaf: expressions.theme("hsl(154 52% 79%)", "hsl(154 56% 17%)"),
          mixed: expressions.theme("hsl(159 48% 77%)", "hsl(159 54% 15%)"),
        },
      },
    },
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
