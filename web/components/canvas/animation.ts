import { CanvasAnimation } from "./types";
import { useMode as applyMode, modeOklch, interpolate } from "culori/fn";
import { documentTime, oklchEqual } from "@/lib/utils";

const oklch = applyMode(modeOklch);
const fallbackColor = oklch("oklch(0 0 0)")!;

export const fadeFill = ({
  index,
  from: fromString,
  to: toString,
  start = documentTime(),
  duration = 150,
}: {
  index: number;
  from: string;
  to: string;
  start?: number;
  duration?: number;
}): CanvasAnimation => {
  const from = oklch(fromString) ?? fallbackColor;
  const to = oklch(toString) ?? fallbackColor;
  const interpolator = interpolate([from, to], "oklch");

  return {
    index,
    timestamp: { start, end: start + duration },
    fill: { from, to, interpolator },
  };
};

export function mergeAnimations(
  current: CanvasAnimation | null,
  next: CanvasAnimation
): CanvasAnimation {
  if (!current) return next;

  const elapsed = documentTime() - current.timestamp.start;
  const currentDuration = current.timestamp.end - current.timestamp.start;
  const nextDuration = next.timestamp.end - next.timestamp.start;
  const progress = Math.min(elapsed / currentDuration, 1);

  if (next.fill && current.fill) {
    // If reverse, correct progress
    if (
      oklchEqual(next.fill.from, current.fill.to) &&
      oklchEqual(next.fill.to, current.fill.from)
    )
      next.timestamp.end = next.timestamp.start + progress * nextDuration;

    // Interpolate the fill color
    next.fill.from = current.fill.interpolator(progress);
    next.fill.interpolator = interpolate(
      [next.fill.from, next.fill.to],
      "oklch"
    );
  }

  return next;
}
