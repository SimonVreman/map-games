import { cachedPath } from "@/lib/mapping/cache";
import { PatternFill } from "@/types/registry";

export function pathsHovered({
  paths,
  ctx,
  clientX,
  clientY,
}: {
  paths: string[];
  ctx: CanvasRenderingContext2D;
  clientX: number;
  clientY: number;
}): boolean {
  const x = clientX * window.devicePixelRatio;
  const y = clientY * window.devicePixelRatio;
  return paths.some((p) => ctx.isPointInPath(cachedPath(p), x, y, "evenodd"));
}

export function resolveFill({
  fill,
  ctx,
}: {
  fill: PatternFill;
  ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
}): string | CanvasGradient {
  if (typeof fill === "string") return fill;

  const gradient = ctx.createLinearGradient(
    fill.start.x,
    fill.start.y,
    fill.end.x,
    fill.end.y
  );

  for (const stop of fill.stops) gradient.addColorStop(stop.offset, stop.color);

  return gradient;
}
