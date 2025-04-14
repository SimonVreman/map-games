import { useAppStore } from "@/lib/store/provider";
import { PinControlsBase } from "../pin-controls-base";
import { svgChevronPatterns } from "./chevron-patterns";

export function EuropeanChevronsControls() {
  const [streak, pattern, guessed, maximum, reset, hints, toggleHints] =
    useAppStore((s) => [
      s.europeanChevrons.streak,
      s.europeanChevrons.pattern,
      s.europeanChevrons.guessed.length,
      s.europeanChevrons.maximum,
      s.europeanChevrons.reset,
      s.europeanChevrons.hints,
      s.europeanChevrons.toggleHints,
    ]);

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
      <p>Where is this chevron seen?</p>

      <svg
        viewBox="0 0 10 10"
        className="absolute top-0 right-0 h-full"
        preserveAspectRatio="xMinYMin"
      >
        <defs>{svgChevronPatterns}</defs>
        <rect
          x={0}
          y={0}
          width="100%"
          height="100%"
          strokeWidth={0}
          fill={`url(#${pattern?.name}-base)`}
        />
      </svg>
    </PinControlsBase>
  );
}
