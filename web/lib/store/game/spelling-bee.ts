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
        maxScore?: null;
        options?: null;
      }
    | {
        words: string[];
        score: number;
        selection: string;
        maxScore: number;
        options: string;
      }
  );
};

const minAvailableWords = 10;
const maxAvailableWords = 80;
const minWordLength = 4;
const maxWordLength = 25;

export function wordScore({
  word,
  options,
}: {
  word: string;
  options: string;
}) {
  if (word.length < minWordLength || word.length > maxWordLength) return -1;
  if (!word.includes(options[0])) return -1;

  const wordArr = word.split("");
  if (!wordArr.every((l) => options.includes(l))) return -1;

  if (word.length === minWordLength) return 1;

  let score = word.length;
  const optionsArr = options.split("");
  if (optionsArr.every((l) => word.includes(l))) score += optionsArr.length;
  return score;
}

function totalScore({ words, options }: { words: string[]; options: string }) {
  return words.reduce((total, word) => {
    const score = wordScore({ word, options });
    return score < 0 ? total : total + score;
  }, 0);
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function letterMask(word: string): number {
  let mask = 0;
  for (const ch of word) {
    const pos = ch.charCodeAt(0) - "a".charCodeAt(0);
    if (pos >= 0 && pos < 26) {
      mask |= 1 << pos;
    }
  }
  return mask;
}

function subMasks(mask: number): number[] {
  const result: number[] = [];
  let sub = mask;
  while (sub) {
    result.push(sub);
    sub = (sub - 1) & mask;
  }
  result.push(0); // include empty mask if needed
  return result;
}

function randomSample<T>(arr: T[], k: number): T[] {
  const copy = arr.slice();
  const res: T[] = [];
  for (let i = 0; i < k; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    res.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return res;
}

function findOptions({ wordlist }: { wordlist: string[] }) {
  const maskToWords = new Map<number, string[]>();
  for (const w of wordlist) {
    const m = letterMask(w);
    if (!maskToWords.has(m)) maskToWords.set(m, []);
    maskToWords.get(m)!.push(w);
  }

  let options = "";
  let maxScore = 0;

  while (true) {
    options = randomSample(alphabet.split(""), 7).join("");
    const setMask = letterMask(options);
    const mandatory = options[0];
    const mandatoryMask = letterMask(mandatory);

    let matches: string[] = [];

    for (const sm of subMasks(setMask)) {
      if (sm & mandatoryMask) {
        const words = maskToWords.get(sm);
        if (words) matches = matches.concat(words);
      }
    }

    if (
      matches.length < minAvailableWords ||
      matches.length > maxAvailableWords
    )
      continue;

    maxScore = totalScore({ words: matches, options });
    break;
  }

  return { maxScore, options };
}

export const createSpellingBeeSlice: ImmerStateCreator<SpellingBeeSlice> = (
  set
) => ({
  spellingBee: {
    // State
    words: null,
    selection: null,
    options: null,

    // Actions
    start: ({ wordlist }) => {
      set(({ spellingBee: s }) => {
        const { options, maxScore } = findOptions({ wordlist });

        s.maxScore = maxScore;
        s.options = options;
        s.words = [];
        s.score = 0;
        s.selection = "";
      });
    },
    reset: () => {
      set(({ spellingBee: s }) => {
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
