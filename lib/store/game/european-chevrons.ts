import { ImmerStateCreator } from "../types";
import { chevronPatterns } from "@/lib/mapping/countries/chevrons";
import { europeanChevrons as countries } from "@/lib/mapping/countries/chevrons";

export type EuropeanChevronsSlice = {
  europeanChevrons: {
    guessed: string[];
    maximum: number;
    streak: number;
    pattern: (typeof chevronPatterns)[number] | null;
    highlighted: string[];
    highlightTimeout: NodeJS.Timeout | null;

    guess: (country: string) => void;
    reset: () => void;
  };
};

const randomPattern = () =>
  chevronPatterns[Math.floor(Math.random() * chevronPatterns.length)];

const newPattern = (oldPattern?: string) => {
  let pattern = randomPattern();

  // Ensure the new pattern is different from the old one
  while (newPattern.name === oldPattern) pattern = randomPattern();

  return {
    pattern,
    maximum: countries.filter((v) => v.colors.includes(pattern.name as never))
      .length,
  };
};

export const createEuropeanChevronsSlice: ImmerStateCreator<
  EuropeanChevronsSlice
> = (set) => {
  const createClearHighlightTimeout = () =>
    setTimeout(
      () =>
        set(({ europeanChevrons }) => {
          europeanChevrons.highlighted = [];
        }),
      3000
    );

  return {
    europeanChevrons: {
      // State
      guessed: [],
      maximum: 0,
      streak: 0,
      pattern: null,
      highlighted: [],
      highlightTimeout: null,

      // Actions
      guess: (guess) =>
        set(({ europeanChevrons: state }) => {
          if (state.guessed.includes(guess)) return;

          const isCorrect = !!countries
            .find((v) => v.name === guess)
            ?.colors.includes((state.pattern?.name || "") as never);

          // Add guess
          state.guessed.push(guess);
          if (state.highlightTimeout) clearTimeout(state.highlightTimeout);
          state.highlighted = [...state.guessed];

          // Check if the round is over
          if (state.guessed.length !== state.maximum && isCorrect) return;

          // Highlight all correct countries, and possibly the incorrect guess
          state.highlighted = [
            ...countries
              .filter((c) => c.colors.includes(state.pattern?.name as never))
              .map((v) => v.name),
            guess,
          ];

          // Set timeout to remove highlight
          state.highlightTimeout = createClearHighlightTimeout();

          // Prepare for next round
          state.guessed = [];
          const { pattern, maximum } = newPattern(state.pattern?.name);
          state.pattern = pattern;
          state.maximum = maximum;
          state.streak = isCorrect ? state.streak + 1 : 0;
        }),
      reset: () =>
        set(({ europeanChevrons: state }) => {
          state.guessed = [];
          state.highlighted = [];

          const { pattern, maximum } = newPattern(state.pattern?.name);
          state.pattern = pattern;
          state.maximum = maximum;
          state.streak = 0;
        }),
    },
  };
};
