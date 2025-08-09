import { z } from "zod";
import { ImmerStateCreator } from "../types";

export type SpellingBeeSlice = {
  spellingBee: {
    start: (o: { wordlist: string[] }) => void;
    reset: () => void;

    select: (letter: string) => void;
    remove: () => void;
    submit: (o: { wordlist: string[] }) => string | null;
    shuffle: () => void;
  } & (
    | {
        words?: null;
        score?: null;
        selection?: null;
        maxWords?: null;
        maxScore?: null;
        options?: null;
      }
    | {
        words: string[];
        score: number;
        selection: string;
        maxWords: number;
        maxScore: number;
        options: string;
      }
  );
};

const minAvailableWords = 10;
const maxAvailableWords = 200;
const minWordLength = 4;
const maxWordLength = 25;

export function wordScore({
  word,
  options,
}: {
  word: string;
  options: string;
}) {
  if (
    !word.includes(options[0]) ||
    word.length < minWordLength ||
    !word.split("").every((l) => options.includes(l))
  )
    return -1;

  if (word.length === minWordLength) return 1;

  return (
    word.length +
    (options.split("").every((l) => word.includes(l)) ? options.length : 0)
  );
}

function totalScore({ words, options }: { words: string[]; options: string }) {
  return words.reduce((total, word) => {
    const score = wordScore({ word, options });
    return score < 0 ? total : total + score;
  }, 0);
}

function usesAllLetters({ word, options }: { word: string; options: string }) {
  const lowercase = word.toLowerCase();
  return options.split("").every((l) => lowercase.includes(l));
}

function findOptions({ wordlist }: { wordlist: string[] }) {
  // Generate a string of 7 distinct random letters from the alphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let maxWords = 0;
  let maxScore = 0;
  let options = "";
  let allUsed = false;

  // There must be at least 10 valid words with these letters, not more than 200
  while (
    maxWords < minAvailableWords ||
    maxWords > maxAvailableWords ||
    !allUsed
  ) {
    maxWords = 0;
    maxScore = 0;
    options = "";
    allUsed = false;

    while (options.length < 7) {
      const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!options.includes(letter)) options += letter;
    }

    for (const word of wordlist) {
      const score = wordScore({ word, options });
      if (score < 0) continue;
      if (usesAllLetters({ word, options })) allUsed = true;
      maxWords++;
      maxScore += score;
      if (maxWords > maxAvailableWords) break;
    }
  }

  return { maxWords, maxScore, options };
}

export const createSpellingBeeSlice: ImmerStateCreator<SpellingBeeSlice> = (
  set
) => ({
  spellingBee: {
    // State
    words: null,
    selection: null,
    maxWords: null,
    options: null,

    // Actions
    start: ({ wordlist }) => {
      set(({ spellingBee: s }) => {
        const { maxWords, options, maxScore } = findOptions({ wordlist });

        s.maxWords = maxWords;
        s.maxScore = maxScore;
        s.options = options;
        s.words = [];
        s.score = 0;
        s.selection = "";
      });
    },
    reset: () => {
      set(({ spellingBee: s }) => {
        s.maxWords = null;
        s.maxScore = null;
        s.options = null;
        s.words = null;
        s.score = null;
        s.selection = null;
      });
    },
    select: (letter) => {
      set(({ spellingBee: s }) => {
        if (
          !s.options ||
          !s.options.includes(letter) ||
          s.selection.length > maxWordLength
        )
          return;
        s.selection += letter;
      });
    },
    remove: () => {
      set(({ spellingBee: s }) => {
        s.selection = (s.selection || " ").slice(0, -1);
      });
    },
    shuffle: () => {
      set(({ spellingBee: s }) => {
        if (!s.options) return;
        const [first, ...optionsArray] = s.options.split("");

        for (let i = optionsArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [optionsArray[i], optionsArray[j]] = [
            optionsArray[j],
            optionsArray[i],
          ];
        }

        s.options = first + optionsArray.join("");
      });
    },
    submit: ({ wordlist }) => {
      let message = "";

      set(({ spellingBee: s }) => {
        const { error, data: guess } = z
          .string()
          .min(minWordLength, "Minimaal 4 letters")
          .max(maxWordLength, "Kalm aan, niet zo lang")
          .refine((w) => wordlist.includes(w), "Deze ken ik niet")
          .refine(
            (w) => w.includes(s.options?.[0] ?? "?"),
            "Middelste letter mist"
          )
          .refine((w) => !s.words?.includes(w), "Al gevonden")
          .safeParse(s.selection ?? "");

        s.selection = "";

        if (error) {
          message = error.issues[0].message;
          return;
        }

        s.words = [...(s.words || []), guess];
        s.score = totalScore({ words: s.words, options: s.options ?? "" });
      });

      return message || null;
    },
  },
});
