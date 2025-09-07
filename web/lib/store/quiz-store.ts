import { QuizSubset, QuizTarget } from "@/types/registry";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import merge from "deepmerge";

type QuizMode = "quiz" | "practice" | "infinite";

export type QuizStore<
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

type QuizStoreArgs = {
  subsets: QuizSubset[];
  targets: QuizTarget[];
};

export const createQuizStoreConstructor =
  (
    args: QuizStoreArgs,
    { name, version }: Pick<PersistOptions<QuizStore>, "version" | "name">
  ) =>
  () =>
    create<QuizStore>()(
      persist(immer(createQuizSlice(args)), {
        storage: createJSONStorage(() => localStorage),
        name,
        version,
        migrate: () => {},
        merge: (persisted, current) =>
          merge(
            current,
            typeof persisted === "object" ? (persisted as object) : {},
            { arrayMerge: (_, source) => source }
          ),
      })
    );

const practiceRetryRange = { min: 1, max: 10 };

const createQuizSlice = ({
  subsets,
  targets,
}: QuizStoreArgs): StateCreator<
  QuizStore,
  [["zustand/immer", never], never]
> => {
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
  }: Pick<QuizStore, "subsetsEnabled" | "nextSubjects">) => {
    const subject = nextSubjects[0];
    const enabled = subsets
      .flatMap((s) => (subsetsEnabled.includes(s.id) ? s.subjects : []))
      .filter((s) => subject == null || s !== subject);
    return enabled[Math.floor(Math.random() * enabled.length)];
  };

  const shuffledSubjects = (subsetsEnabled: QuizStore["subsetsEnabled"]) =>
    subsets
      .flatMap((s) => (subsetsEnabled.includes(s.id) ? s.subjects : []))
      .sort(() => Math.random() - 0.5);

  const getTargetCount = (nextSubjects: QuizStore["nextSubjects"]) =>
    nextSubjects[0] != null
      ? targets.filter((t) => t.subjects.includes(nextSubjects[0])).length
      : 0;

  return (set) => ({
    // State
    ...defaultState,

    // Actions
    guess: (target) => {
      let isCorrect: boolean | null = null;
      let remaining: string[] = [];

      set((s) => {
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

        s.targetCount = getTargetCount(s.nextSubjects);
        // Quiz just runs out.
      });

      return { isCorrect, remaining };
    },

    start: ({ mode, subsetsEnabled }) =>
      set((s) => {
        // Also reset for safety
        s = { ...s, ...defaultState, mode, subsetsEnabled };

        s.nextSubjects =
          mode === "infinite"
            ? [randomSubject(s)]
            : shuffledSubjects(subsetsEnabled);
        s.targetCount = getTargetCount(s.nextSubjects);

        return s;
      }),

    toggleHints: () =>
      set((s) => {
        s.hintsEnabled = !s.hintsEnabled;
        if (s.hintsEnabled) s.stats.usedHints = true;
      }),

    reset: () =>
      set((s) => {
        const mode = s.mode ?? defaultState.mode;
        const subsetsEnabled = s.subsetsEnabled;
        return { ...s, ...defaultState, mode, subsetsEnabled };
      }),
  });
};
