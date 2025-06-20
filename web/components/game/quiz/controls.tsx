"use client";

import { useAppStore } from "@/lib/store/provider";
import { PinControlsBase } from "../pin-controls-base";
import { AppStore } from "@/lib/store";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";

export function QuizControls<TName extends QuizSliceName<AppStore>>({
  label,
  store,
  graphic,
}: {
  label: string;
  store: TName;
  graphic?: (props: { subject: string }) => React.ReactNode;
}) {
  const [stats, reset, hints, toggleHints, nextSubject] = useAppStore((s) => [
    s[store].stats,
    s[store].reset,
    s[store].hintsEnabled,
    s[store].toggleHints,
    s[store].nextSubjects[0] ?? "none",
  ]);

  const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;

  return (
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
              {20}td
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
      <p className="text-muted-foreground">{label}</p>
      {!graphic && <p className="font-semibold ml-2">{nextSubject}</p>}
    </PinControlsBase>
  );
}
