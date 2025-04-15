import { AppStore } from "..";
import { ImmerStateCreator } from "../types";
import { WritableDraft } from "immer";

export type SinglePinSlice = {
  guesses: boolean[];
  code: number | null;
  highlighted: { positive: number | null; negative: number | null };
  highlightTimeout: NodeJS.Timeout | null;
  hints: boolean;

  guess: (code: number) => void;
  toggleHints: () => void;
  reset: () => void;
};

export type SinglePinSliceName<T extends object> = keyof {
  [Key in keyof T as T[Key] extends SinglePinSlice ? Key : never]: T[Key];
};

export const createSinglePinSlice = <
  T extends string,
  TSlice = { [Key in T]: SinglePinSlice }
>({
  name,
  codes,
}: {
  name: T;
  codes: number[];
}): ImmerStateCreator<TSlice> => {
  const randomCode = () => codes[Math.floor(Math.random() * codes.length)];

  return (
    set: (
      update: (
        state: WritableDraft<AppStore & { [Key in T]: SinglePinSlice }>
      ) => void
    ) => void
  ) => {
    const createClearHighlightTimeout = () =>
      setTimeout(
        () =>
          set((s) => {
            s[name].highlighted = { positive: null, negative: null };
          }),
        2000
      );

    return {
      [name]: {
        // State
        guesses: [],
        code: null,
        highlighted: { positive: null, negative: null },
        highlightTimeout: null,
        hints: false,

        // Actions
        guess: (code) => {
          set((s) => {
            const isCorrect = code === s[name].code;

            // Make guess
            s[name].guesses.push(code == s[name].code);

            // Highlight the correct answer
            s[name].highlighted = {
              positive: isCorrect ? code : s[name].code,
              negative: isCorrect ? null : code,
            };

            // Set timeout to remove highlight
            if (s[name].highlightTimeout)
              clearTimeout(s[name].highlightTimeout);
            s[name].highlightTimeout = createClearHighlightTimeout();

            // Set new code
            s[name].code = randomCode();
          });
        },
        toggleHints: () =>
          set((s) => {
            s[name].hints = !s[name].hints;
          }),
        reset: () =>
          set((s) => {
            s[name].guesses = [];
            s[name].code = randomCode();
          }),
      } as SinglePinSlice,
    } as TSlice;
  };
};
