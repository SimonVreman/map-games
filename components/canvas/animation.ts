import { CanvasAnimation } from "./types";
import { useMode as applyMode, modeOklch } from "culori/fn";
import { documentTime } from "@/lib/utils";

const oklch = applyMode(modeOklch);
const fallbackColor = oklch("oklch(0 0 0)")!;

export const fadeFill = ({
  subject,
  start = documentTime(),
  duration = 150,
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
    from: oklch(from) ?? fallbackColor,
    to: oklch(to) ?? fallbackColor,
  },
});
