import { ImmerStateCreator } from "../types";

export type BrazilTelephoneCodesSlice = {
  brazilTelephoneCodes: {
    guesses: boolean[];
    reset: () => void;
  };
};

export const createBrazilTelephoneCodesSlice: ImmerStateCreator<
  BrazilTelephoneCodesSlice
> = (set) => ({
  brazilTelephoneCodes: {
    // State
    guesses: [],

    // Actions
    reset: () =>
      set(({ brazilTelephoneCodes }) => {
        brazilTelephoneCodes.guesses = [];
      }),
  },
});
