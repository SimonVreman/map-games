export const twColor = (name: string, dark?: string) =>
  getComputedStyle(document.body).getPropertyValue(
    "--color-" +
      (dark != null && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? dark
        : name)
  );

export const twFont = (type: "sans" | "mono") =>
  getComputedStyle(document.body).getPropertyValue(
    type === "sans" ? "--font-figtree" : "--font-geist-mono"
  );

export function pathsHovered({
  paths,
  ctx,
  clientX,
  clientY,
}: {
  paths: Path2D[];
  ctx: CanvasRenderingContext2D;
  clientX: number;
  clientY: number;
}): boolean {
  const x = clientX * window.devicePixelRatio;
  const y = clientY * window.devicePixelRatio;
  return paths.some((p) => ctx.isPointInPath(p, x, y, "evenodd"));
}
