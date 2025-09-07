"use client";

import { PinControlsBase } from "../pin-controls-base";
import { QuizSettings } from "./settings";
import { QuizResults } from "./results/results";
import { cn } from "@/lib/utils";
import { QuizSubject, QuizSubset } from "@/types/registry";
import { useQuizStore } from "@/lib/store/quiz-provider";

export function QuizControls({
  label,
  graphic,
  subjects,
  subsets,
}: {
  label: string;
  subjects: Record<string, QuizSubject>;
  subsets: QuizSubset[];
  graphic?: (props: { subject: string }) => React.ReactNode;
}) {
  const [
    stats,
    mode,
    reset,
    hints,
    toggleHints,
    nextSubjects,
    guessedCount,
    targetCount,
  ] = useQuizStore((s) => [
    s.stats,
    s.mode,
    s.reset,
    s.hintsEnabled,
    s.toggleHints,
    s.nextSubjects,
    s.guessed.length,
    s.targetCount,
  ]);

  const nextSubject = (nextSubjects[0] ?? null) as string | null;
  const completedCounting = mode === "practice" ? stats.correct : stats.total;
  const totalIncludingNext = completedCounting + nextSubjects.length;
  const progress =
    totalIncludingNext > 0 ? completedCounting / totalIncludingNext : 0;
  const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;
  const lastCorrect = stats.streak > 0;

  return (
    <>
      {nextSubjects.length > 0 && mode !== "infinite" && (
        <div className="absolute inset-x-0 top-0 z-10 px-6 py-2 max-sm:px-2 flex justify-center pointer-events-none">
          <div className="w-full h-2 max-w-screen-md relative">
            <div
              className={cn(
                "absolute inset-0 rounded-full shadow-sm transition-colors duration-500",
                {
                  "bg-red-100 dark:bg-red-950": !lastCorrect,
                  "bg-green-100 dark:bg-green-950": lastCorrect,
                  "bg-purple-100 dark:bg-purple-950": stats.streak >= 5,
                }
              )}
            />
            <div
              className={cn(
                "absolute top-0 left-0 h-full rounded-full transition-colors duration-500",
                {
                  "bg-red-300 dark:bg-red-700": !lastCorrect,
                  "bg-green-300 dark:bg-green-700": lastCorrect,
                  "bg-purple-300 dark:bg-purple-700": stats.streak >= 5,
                }
              )}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
      {nextSubject != null && (
        <PinControlsBase
          graphic={graphic && graphic({ subject: nextSubject })}
          hints={hints}
          onToggleHints={toggleHints}
          onReset={reset}
          stats={
            <>
              <div className="leading-tight border-r pr-3">
                <p className="text-sm font-medium">Streak</p>
                <p className="font-medium">
                  {stats.streak}
                  <span className="text-sm text-muted-foreground">x</span>
                </p>
              </div>

              <div className="leading-tight pl-3">
                <p className="text-sm font-medium">Accuracy</p>
                <p className="font-medium">
                  {(accuracy * 100).toFixed(2)}
                  <span className="text-sm text-muted-foreground">%</span>
                </p>
              </div>
            </>
          }
        >
          <p className="text-muted-foreground">
            {label}
            {!graphic && (
              <span className="font-semibold text-foreground ml-2">
                {"label" in subjects[nextSubject]
                  ? subjects[nextSubject].label
                  : nextSubject}
              </span>
            )}
          </p>
          {targetCount > 1 && (
            <p className="ml-auto text-sm">
              {guessedCount}/{targetCount}
            </p>
          )}
        </PinControlsBase>
      )}
      <QuizSettings subsets={subsets} />
      <QuizResults />
    </>
  );
}
