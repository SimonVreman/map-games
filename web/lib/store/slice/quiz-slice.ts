import { QuizSubset, QuizTarget } from "@/types/registry";
import { AppStore } from "..";
import { ImmerStateCreator } from "../types";
import { WritableDraft } from "immer";

type QuizMode = "quiz" | "practice" | "infinite";

export type QuizSlice<
  SubjectKey extends string = string,
  TargetKey extends string = string
> = {
  mode: QuizMode | null;

  // Together, these define the state:
  // - nextSubjects not empty: ongoing quiz
  // - nextSubjects empty, total > 0: quiz finished
  // - nextSubjects empty, total = 0: quiz not started
  nextSubjects: SubjectKey[];
  guessed: TargetKey[];
  targetCount: number;
  stats: {
    correct: number;
    incorrect: number;
    streak: number;
    maxStreak: number;
    usedHints: boolean;
    total: number;
  };

  highlight: { positive: SubjectKey[]; negative: SubjectKey[] };
  hintsEnabled: boolean;
  subsetsEnabled: string[];

  start: (options: { mode: QuizMode; subsetsEnabled: string[] }) => void;
  guess: (target: TargetKey) => {
    isCorrect: boolean | null;
    remaining: string[];
  };
  toggleHints: () => void;
  reset: () => void;
};

export type QuizSliceName<T extends object> = keyof {
  [Key in keyof T as T[Key] extends QuizSlice ? Key : never]: T[Key];
};

const practiceRetryRange = {
  min: 1,
  max: 10,
};

export const createQuizSlice = <
  T extends string,
  TTarget extends QuizTarget,
  TSlice = { [Key in T]: QuizSlice }
>({
  name,
  subsets,
  targets,
}: {
  name: T;
  subsets: QuizSubset[];
  targets: readonly TTarget[];
}): ImmerStateCreator<TSlice> => {
  const defaultState = {
    mode: null,
    nextSubjects: [],
    guessed: [],
    targetCount: 0,
    stats: {
      correct: 0,
      incorrect: 0,
      total: 0,
      streak: 0,
      maxStreak: 0,
      usedHints: false,
    },
    highlight: { positive: [], negative: [] },
    hintsEnabled: false,
    subsetsEnabled: subsets?.map((s) => s.id),
  };

  const randomSubject = ({
    subsetsEnabled,
    nextSubjects,
  }: Pick<QuizSlice, "subsetsEnabled" | "nextSubjects">) => {
    const subject = nextSubjects[0];
    const enabled = subsets
      .flatMap((s) => (subsetsEnabled.includes(s.id) ? s.subjects : []))
      .filter((s) => subject == null || s !== subject);
    return enabled[Math.floor(Math.random() * enabled.length)];
  };

  const shuffledSubjects = (subsetsEnabled: QuizSlice["subsetsEnabled"]) =>
    subsets
      .flatMap((s) => (subsetsEnabled.includes(s.id) ? s.subjects : []))
      .sort(() => Math.random() - 0.5);

  const getTargetCount = (nextSubjects: QuizSlice["nextSubjects"]) =>
    nextSubjects[0] != null
      ? targets.filter((t) => t.subjects.includes(nextSubjects[0])).length
      : 0;

  return (
    set: (
      update: (
        state: WritableDraft<AppStore & { [Key in T]: QuizSlice }>
      ) => void
    ) => void
  ) =>
    ({
      [name]: {
        // State
        ...defaultState,

        // Actions
        guess: (target) => {
          let isCorrect: boolean | null = null;
          let remaining: string[] = [];

          set((store) => {
            const s = store[name];
            const subject = s.nextSubjects[0];

            if (subject == null || s.hintsEnabled || s.guessed.includes(target))
              return;

            isCorrect = !!targets
              .find((t) => t.id === target)
              ?.subjects.includes(subject);

            // Update highlight, first reset if it is a new round
            if (s.guessed.length === 0)
              s.highlight = { positive: [], negative: [] };
            s.highlight[isCorrect ? "positive" : "negative"].push(target);

            // Add guess
            s.guessed.push(target);

            // If the round is not finished, stop here.
            const correct = targets.filter((t) => t.subjects.includes(subject));
            remaining = correct
              .map((t) => t.id)
              .filter((t) => !s.guessed.includes(t));
            if (isCorrect && remaining.length > 0) return;

            // Highlight all missed targets
            if (!isCorrect) s.highlight.positive = correct.map((t) => t.id);

            // Update stats and clear guessed
            s.guessed = [];
            s.stats.total += 1;
            s.stats.streak = isCorrect ? s.stats.streak + 1 : 0;
            s.stats.maxStreak = Math.max(s.stats.streak, s.stats.maxStreak);
            s.stats[isCorrect ? "correct" : "incorrect"] += 1;

            // Update next subjects
            if (s.mode === "infinite") s.nextSubjects = [randomSubject(s)];
            else if (s.mode === "practice" && !isCorrect) {
              s.nextSubjects.shift();
              const next = s.nextSubjects;
              // Random position that is not the next one, but also not further than X ahead.
              const after = practiceRetryRange.min;
              const before = Math.min(practiceRetryRange.max, next.length);
              const idx = Math.max(after, Math.floor(Math.random() * before));
              const head = next.slice(0, idx);
              const tail = next.slice(idx);
              s.nextSubjects = [...head, subject, ...tail];
            } else {
              s.nextSubjects.shift();
            }
            store[name].targetCount = getTargetCount(store[name].nextSubjects);
            // Quiz just runs out.

            return;
          });

          return { isCorrect, remaining };
        },

        start: ({ mode, subsetsEnabled }) =>
          set((store) => {
            // Also reset for safety
            store[name] = {
              ...store[name],
              ...defaultState,
              mode,
              subsetsEnabled,
            };

            store[name].nextSubjects =
              mode === "infinite"
                ? [randomSubject(store[name])]
                : shuffledSubjects(subsetsEnabled);
            store[name].targetCount = getTargetCount(store[name].nextSubjects);
          }),

        toggleHints: () =>
          set((s) => {
            s[name].hintsEnabled = !s[name].hintsEnabled;
            if (s[name].hintsEnabled) s[name].stats.usedHints = true;
          }),

        reset: () =>
          set((s) => {
            const mode = s[name].mode ?? defaultState.mode;
            const subsetsEnabled = s[name].subsetsEnabled;
            s[name] = { ...s[name], ...defaultState, mode, subsetsEnabled };
          }),
      } as QuizSlice,
    } as TSlice);
};
