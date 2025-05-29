import { cachedPath } from "@/lib/mapping/cache";

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
