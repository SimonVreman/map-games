import { create } from "zustand";
import { CityCoverSlice, createCityCoverSlice } from "./game/city-cover";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import merge from "deepmerge";
import { CityBlocksSlice, createCityBlocksSlice } from "./game/city-blocks";
import {
  BrazilDialingCodesSlice,
  createBrazilDialingCodesSlice,
} from "./game/brazil-dialing-codes";
import {
  createEuropeanChevronsSlice,
  EuropeanChevronsSlice,
} from "./game/european-chevrons";
import {
  createSpainDialingCodesSlice,
  SpainDialingCodesSlice,
} from "./game/spain-dialing-codes";
import {
  createEuropeanGuardrailsSlice,
  EuropeanGuardrailsSlice,
} from "./game/european-guardrails";
import {
  createEuropeanPedestriansSlice,
  EuropeanPedestriansSlice,
} from "./game/european-pedestrians";
import {
  createEuropeanBollardsSlice,
  EuropeanBollardsSlice,
} from "./game/european-bollards";

export type AppStore = CityCoverSlice &
  CityBlocksSlice &
  BrazilDialingCodesSlice &
  EuropeanChevronsSlice &
  SpainDialingCodesSlice &
  EuropeanGuardrailsSlice &
  EuropeanPedestriansSlice &
  EuropeanBollardsSlice;

export const createAppStore = () =>
  create<AppStore>()(
    persist(
      immer((...a) => ({
        ...createCityCoverSlice(...a),
        ...createCityBlocksSlice(...a),
        ...createBrazilDialingCodesSlice(...a),
        ...createEuropeanChevronsSlice(...a),
        ...createSpainDialingCodesSlice(...a),
        ...createEuropeanGuardrailsSlice(...a),
        ...createEuropeanPedestriansSlice(...a),
        ...createEuropeanBollardsSlice(...a),
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
