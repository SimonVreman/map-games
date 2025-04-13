import { brazilPhoneCodes } from "@/lib/mapping/brazil/registry/phone-codes";
import { ImmerStateCreator } from "../types";

export type BrazilTelephoneCodesSlice = {
  brazilTelephoneCodes: {
    guesses: boolean[];
    code: number | null;
    highlighted: { positive: number | null; negative: number | null };
    highlightTimeout: NodeJS.Timeout | null;

    guess: (code: number) => void;
    reset: () => void;
  };
};

const randomCode = () =>
  brazilPhoneCodes[Math.floor(Math.random() * brazilPhoneCodes.length)];

export const createBrazilTelephoneCodesSlice: ImmerStateCreator<
  BrazilTelephoneCodesSlice
> = (set) => ({
  brazilTelephoneCodes: {
    // State
    guesses: [],
    code: null,
    highlighted: { positive: null, negative: null },
    highlightTimeout: null,

    // Actions
    guess: (code) => {
      const clearHighlightTimeout = setTimeout(
        () =>
          set(({ brazilTelephoneCodes }) => {
            brazilTelephoneCodes.highlighted = {
              positive: null,
              negative: null,
            };
          }),
        2000
      );

      set(({ brazilTelephoneCodes }) => {
        const isCorrect = code === brazilTelephoneCodes.code;

        // Make guess
        brazilTelephoneCodes.guesses.push(code == brazilTelephoneCodes.code);

        // Highlight the correct answer
        brazilTelephoneCodes.highlighted = {
          positive: isCorrect ? code : brazilTelephoneCodes.code,
          negative: isCorrect ? null : code,
        };

        // Set timeout to remove highlight
        if (brazilTelephoneCodes.highlightTimeout)
          clearTimeout(brazilTelephoneCodes.highlightTimeout);
        brazilTelephoneCodes.highlightTimeout = clearHighlightTimeout;

        // Set new code
        brazilTelephoneCodes.code = randomCode();
      });
    },
    reset: () =>
      set(({ brazilTelephoneCodes }) => {
        brazilTelephoneCodes.guesses = [];
        brazilTelephoneCodes.code = randomCode();
      }),
  },
});
