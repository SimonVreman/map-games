import { useAppStore } from "@/lib/store/provider";
import { PinControlsBase } from "../pin-controls-base";

export function BrazilTelephoneCodesControls() {
  const [guesses, code, reset, hints, toggleHints] = useAppStore((s) => [
    s.brazilTelephoneCodes.guesses,
    s.brazilTelephoneCodes.code,
    s.brazilTelephoneCodes.reset,
    s.brazilTelephoneCodes.hints,
    s.brazilTelephoneCodes.toggleHints,
  ]);

  const lastFailedIndex = guesses.lastIndexOf(false);
  const streak = guesses.length - lastFailedIndex - 1;
  const accuracy =
    guesses.length > 0 ? guesses.filter((x) => x).length / guesses.length : 0;

  return (
    <PinControlsBase
      hints={hints}
      onToggleHints={toggleHints}
      onReset={reset}
      stats={
        <>
          <div className="leading-tight border-r pr-3">
            <p className="text-sm font-medium">Streak</p>
            <p className="font-medium">
              {streak}
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
      <p className="text-muted-foreground">Area code:</p>
      <p className="font-semibold ml-2">({code})</p>
    </PinControlsBase>
  );
}
