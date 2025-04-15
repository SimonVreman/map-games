"use client";

import { useAppStore } from "@/lib/store/provider";
import { PinControlsBase } from "../pin-controls-base";
import { GroupPinSliceName } from "@/lib/store/slice/group-pin";
import { AppStore } from "@/lib/store";

export function GroupPinControls<TName extends GroupPinSliceName<AppStore>>({
  store,
  children,
}: {
  store: TName;
  children: React.ReactNode;
}) {
  const [streak, guessed, maximum, reset, hints, toggleHints] = useAppStore(
    (s) => [
      s[store].streak,
      s[store].guessed.length,
      s[store].maximum,
      s[store].reset,
      s[store].hints,
      s[store].toggleHints,
    ]
  );

  return (
    <PinControlsBase
      hints={hints}
      onToggleHints={toggleHints}
      onReset={reset}
      stats={
        <>
          <div className="leading-tight border-r pr-3">
            <p className="text-sm font-medium">Guessed</p>
            <p className="font-medium">
              {guessed}
              <span className="text-sm text-muted-foreground">/{maximum}</span>
            </p>
          </div>

          <div className="leading-tight pl-3">
            <p className="text-sm font-medium">Streak</p>
            <p className="font-medium">
              {streak}
              <span className="text-sm text-muted-foreground">x</span>
            </p>
          </div>
        </>
      }
    >
      {children}
    </PinControlsBase>
  );
}
