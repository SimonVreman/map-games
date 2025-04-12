import { create } from "zustand";
import { CityCoverSlice, createCityCoverSlice } from "./game/city-cover";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import merge from "deepmerge";
import { CityBlocksSlice, createCityBlocksSlice } from "./game/city-blocks";
import {
  BrazilTelephoneCodesSlice,
  createBrazilTelephoneCodesSlice,
} from "./game/brazil-telephone-codes";

export type AppStore = CityCoverSlice &
  CityBlocksSlice &
  BrazilTelephoneCodesSlice;

export const createAppStore = () =>
  create<AppStore>()(
    persist(
      immer((...a) => ({
        ...createCityCoverSlice(...a),
        ...createCityBlocksSlice(...a),
        ...createBrazilTelephoneCodesSlice(...a),
      })),
      {
        storage: createJSONStorage(() => localStorage),
        name: "app-store",
        merge: (persisted, current) =>
          merge(
            current,
            typeof persisted === "object" ? (persisted as object) : {}
          ),
      }
    )
  );
