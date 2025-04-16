import { AppStore } from "..";
import { ImmerStateCreator } from "../types";
import { WritableDraft } from "immer";

export type GroupPinSlice<TSubject = { name: string }> = {
  guessed: string[];
  maximum: number;
  streak: number;
  subject: TSubject | null;
  highlighted: string[];
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
  TSubject extends { name: string; selectable?: boolean },
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
  const selectableSubjects = subjects.filter((s) => s.selectable !== false);

  const randomSubject = () =>
    selectableSubjects[Math.floor(Math.random() * selectableSubjects.length)];

  const newSubject = (oldSubjectName?: string) => {
    let subject = randomSubject();

    // Ensure the new subject is different from the old one
    while (subject.name === oldSubjectName) subject = randomSubject();

    return {
      subject,
      maximum: targets.filter((t) => t.subjects.includes(subject.name)).length,
    };
  };

  return (
    set: (
      update: (
        state: WritableDraft<AppStore & { [Key in T]: GroupPinSlice }>
      ) => void
    ) => void
  ) =>
    ({
      [name]: {
        // State
        guessed: [],
        maximum: 0,
        streak: 0,
        subject: null,
        highlighted: [],
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
    } as TSlice);
};
