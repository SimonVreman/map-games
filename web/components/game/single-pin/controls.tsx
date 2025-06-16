"use client";

import { useAppStore } from "@/lib/store/provider";
import { PinControlsBase } from "../pin-controls-base";
import { SinglePinSliceName } from "@/lib/store/slice/single-pin";
import { AppStore } from "@/lib/store";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { RegionSubset } from "@/lib/mapping/subsets";

export function SinglePinControls<TName extends SinglePinSliceName<AppStore>>({
  store,
  subsets,
}: {
  store: TName;
  subsets: RegionSubset[];
}) {
  const [
    guesses,
    code,
    reset,
    hints,
    toggleHints,
    enabledSubsets,
    toggleSubset,
  ] = useAppStore((s) => [
    s[store].guesses,
    s[store].code,
    s[store].reset,
    s[store].hints,
    s[store].toggleHints,
    s[store].enabledSubsets,
    s[store].toggleSubset,
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
      dropdownContent={
        <>
          <DropdownMenuLabel>Enabled</DropdownMenuLabel>
          {subsets.map((s) => (
            <DropdownMenuCheckboxItem
              key={s.key}
              checked={enabledSubsets.includes(s.key)}
              onCheckedChange={() => toggleSubset(s.key)}
              onSelect={(e) => e.preventDefault()}
            >
              {s.name}
            </DropdownMenuCheckboxItem>
          ))}
        </>
      }
    >
      {code != null ? (
        <>
          <p className="text-muted-foreground">Area code:</p>
          <p className="font-semibold ml-2">({code})</p>
        </>
      ) : (
        <p className="text-muted-foreground text-base">
          Enable at least one subset from the menu
        </p>
      )}
    </PinControlsBase>
  );
}
