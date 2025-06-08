import type { StateCreator } from "zustand";
import type { AppStore } from "./index";

export type ImmerStateCreator<T> = StateCreator<
  AppStore,
  [["zustand/immer", never], never],
  [],
  T
>;
