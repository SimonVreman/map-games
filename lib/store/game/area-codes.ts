/* eslint-disable @typescript-eslint/no-explicit-any */

import { ImmerStateCreator } from "../types";

export type AreaCodesSliceState = {
  guesses: boolean[];
  code: number | null;
  highlighted: { positive: number | null; negative: number | null };
  highlightTimeout: NodeJS.Timeout | null;
  hints: boolean;

  guess: (code: number) => void;
  toggleHints: () => void;
  reset: () => void;
};

export type AreaCodesSliceName<T extends object> = keyof {
  [Key in keyof T as T[Key] extends AreaCodesSliceState ? Key : never]: T[Key];
};

export const createAreaCodesSlice = <
  T extends string,
  TSlice extends { [key in T]: AreaCodesSliceState }
>({
  name,
  codes,
}: {
  name: T;
  codes: number[];
}) => {
  const randomCode = () => codes[Math.floor(Math.random() * codes.length)];

  return ((set: (state: any) => void) => {
    const createClearHighlightTimeout = () =>
      setTimeout(
        () =>
          set((s: any) => {
            s[name].highlighted = {
              positive: null,
              negative: null,
            };
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
          set((s: any) => {
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
          set((s: any) => {
            s[name].hints = !s[name].hints;
          }),
        reset: () =>
          set((s: any) => {
            s[name].guesses = [];
            s[name].code = randomCode();
          }),
      } satisfies AreaCodesSliceState,
    };
  }) as unknown as ImmerStateCreator<TSlice>;
};
