import { AppStore } from "..";
import { ImmerStateCreator } from "../types";
import { WritableDraft } from "immer";

export type GroupPinSlice<TSubject = { name: string }> = {
  guessed: string[];
  maximum: number;
  streak: number;
  subject: TSubject | null;
  highlighted: string[];
  highlightTimeout: NodeJS.Timeout | null;
  hints: boolean;

  guess: (country: string) => void;
  toggleHints: () => void;
  reset: () => void;
};

export type GroupPinSliceName<T extends object> = keyof {
  [Key in keyof T as T[Key] extends GroupPinSlice ? Key : never]: T[Key];
};

export const createGroupPinSlice = <
  T extends string,
  TSubject extends { name: string },
  TTarget extends { name: string; subjects: readonly string[] },
  TSlice = { [Key in T]: GroupPinSlice<TSubject> }
>({
  name,
  subjects,
  targets,
}: {
  name: T;
  subjects: readonly TSubject[];
  targets: readonly TTarget[];
}): ImmerStateCreator<TSlice> => {
  const randomSubject = () =>
    subjects[Math.floor(Math.random() * subjects.length)];

  const newSubject = (oldSubjectName?: string) => {
    let subject = randomSubject();

    // Ensure the new subject is different from the old one
    while (subject.name === oldSubjectName) subject = randomSubject();

    return {
      subject,
      maximum: targets.filter((v) => v.subjects.includes(subject.name)).length,
    };
  };

  return (
    set: (
      update: (
        state: WritableDraft<AppStore & { [Key in T]: GroupPinSlice }>
      ) => void
    ) => void
  ) => {
    const createClearHighlightTimeout = () =>
      setTimeout(
        () =>
          set((s) => {
            s[name].highlighted = [];
          }),
        3000
      );

    return {
      [name]: {
        // State
        guessed: [],
        maximum: 0,
        streak: 0,
        subject: null,
        highlighted: [],
        highlightTimeout: null,
        hints: false,

        // Actions
        guess: (guess) =>
          set((s) => {
            if (s[name].guessed.includes(guess)) return;

            const isCorrect = !!targets
              .find((v) => v.name === guess)
              ?.subjects.includes(s[name].subject?.name || "");

            // Add guess
            s[name].guessed.push(guess);
            if (s[name].highlightTimeout)
              clearTimeout(s[name].highlightTimeout);
            s[name].highlighted = [...s[name].guessed];

            // Check if the round is over
            if (s[name].guessed.length !== s[name].maximum && isCorrect) return;

            // Highlight all correct countries, and possibly the incorrect guess
            s[name].highlighted = [
              ...targets
                .filter((v) => v.subjects.includes(s[name].subject?.name ?? ""))
                .map((v) => v.name),
              guess,
            ];

            // Set timeout to remove highlight
            s[name].highlightTimeout = createClearHighlightTimeout();

            // Prepare for next round
            s[name].guessed = [];
            const { subject, maximum } = newSubject(s[name].subject?.name);
            s[name].subject = subject;
            s[name].maximum = maximum;
            s[name].streak = isCorrect ? s[name].streak + 1 : 0;
          }),
        toggleHints: () =>
          set((s) => {
            s[name].hints = !s[name].hints;
          }),
        reset: () =>
          set((s) => {
            s[name].guessed = [];
            s[name].highlighted = [];
            s[name].hints = false;

            const { subject, maximum } = newSubject(s[name].subject?.name);
            s[name].subject = subject;
            s[name].maximum = maximum;
            s[name].streak = 0;
          }),
      } as GroupPinSlice<TSubject>,
    } as TSlice;
  };
};
