import { create } from "zustand";
import { CityCoverSlice, createCityCoverSlice } from "./game/city-cover";
import { immer } from "zustand/middleware/immer";

export type AppStore = CityCoverSlice;

export const createAppStore = () =>
  create<AppStore>()(
    immer((...a) => ({
      ...createCityCoverSlice(...a),
    }))
  );
