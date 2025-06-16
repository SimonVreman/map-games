import { RegionSubset } from "@/lib/mapping/subsets";
import { AppStore } from "..";
import { ImmerStateCreator } from "../types";
import { WritableDraft } from "immer";

export type SinglePinSlice = {
  guesses: boolean[];
  code: number | null;
  highlighted: { correctCode: number | null; incorrectKey: string | null };
  hints: boolean;
  enabledSubsets: string[];

  guess: (codes: number[]) => void;
  toggleSubset: (key: string) => void;
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
  subsets,
}: {
  name: T;
  subsets: RegionSubset[];
}): ImmerStateCreator<TSlice> => {
  const randomCode = ({
    enabledSubsets,
    code,
  }: Pick<SinglePinSlice, "enabledSubsets" | "code">) => {
    const enabled = subsets
      .flatMap((s) => (enabledSubsets.includes(s.key) ? s.codes : []))
      .filter((c) => code == null || c !== code);
    return enabled[Math.floor(Math.random() * enabled.length)];
  };

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
        enabledSubsets: subsets?.map((s) => s.key),

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
            s[name].code = randomCode(s[name]);
          });
        },
        toggleSubset: (key) => {
          set((s) => {
            const enabled = s[name].enabledSubsets;

            if (enabled.includes(key)) {
              s[name].enabledSubsets = enabled.filter((k) => k !== key);

              // If the subset is disabled, we need to change the code
              if (
                s[name].code != null &&
                subsets.find((s) => s.key === key)?.codes.includes(s[name].code)
              )
                s[name].code = randomCode(s[name]);
            } else {
              s[name].enabledSubsets.push(key);

              // Code might be null because there were no enabled subsets before
              if (s[name].code == null) s[name].code = randomCode(s[name]);
            }
          });
        },
        toggleHints: () =>
          set((s) => {
            s[name].hints = !s[name].hints;
          }),
        reset: () =>
          set((s) => {
            s[name].enabledSubsets = subsets.map((s) => s.key);
            s[name].guesses = [];
            s[name].code = randomCode(s[name]);
            s[name].highlighted = { correctCode: null, incorrectKey: null };
            s[name].hints = false;
          }),
      } as SinglePinSlice,
    } as TSlice);
};
