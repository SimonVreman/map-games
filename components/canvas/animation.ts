import { CanvasAnimation } from "./types";
import { useMode as applyMode, modeOklch } from "culori/fn";
import { twColor } from "./utils";

const oklch = applyMode(modeOklch);
const fallbackColor = oklch("oklch(0 0 0)")!;

export const fadeFill = ({
  subject,
  start = (document.timeline.currentTime ?? performance.now()) as number,
  duration = 200,
  from,
  to,
}: {
  subject: string | number;
  start?: number;
  duration?: number;
  from: string;
  to: string;
}): CanvasAnimation => ({
  subject,
  timestamp: { start, end: start + duration },
  fill: {
    from: oklch(twColor(from)) ?? fallbackColor,
    to: oklch(twColor(to)) ?? fallbackColor,
  },
});
