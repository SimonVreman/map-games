import { AppStore } from "..";
import { ImmerStateCreator } from "../types";
import { WritableDraft } from "immer";

export type SinglePinSlice = {
  guesses: boolean[];
  code: number | null;
  highlighted: { correctCode: number | null; incorrectKey: string | null };
  hints: boolean;

  guess: (codes: number[]) => void;
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
  ) =>
    ({
      [name]: {
        // State
        guesses: [],
        code: null,
        highlighted: { correctCode: null, incorrectKey: null },
        hints: false,

        // Actions
        guess: (codes) => {
          set((s) => {
            const isCorrect = !!s[name].code && codes.includes(s[name].code);

            // Make guess
            s[name].guesses.push(isCorrect);

            // Highlight the correct answer
            s[name].highlighted = {
              correctCode: s[name].code,
              incorrectKey: isCorrect ? null : codes.join(","),
            };

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
            s[name].highlighted = { correctCode: null, incorrectKey: null };
          }),
      } as SinglePinSlice,
    } as TSlice);
};
