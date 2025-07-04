import { expressions } from "./expressions";

export const map = {
  sources: { tiles: "tiles" },
  fonts: { regular: "figtree-regular", bold: "figtree-bold" },
  icons: { placeMajor: "place-major", placeMinor: "place-minor" },
  colors: {
    land: expressions.theme("hsl(210 40% 98%)", "hsl(217.2 32.6% 17.5%)"),
    water: expressions.theme("hsl(204 93.8% 93.7%)", "hsl(222.2 84% 4.9%)"),
  },
};
