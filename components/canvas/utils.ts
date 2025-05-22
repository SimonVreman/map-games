import { mercatorConstants } from "@/lib/mapping/mercator";
import { Style, ViewBox } from "./types";

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

export function mapToClient({
  bounding,
  style: { x, y, scale },
  viewBox,
}: {
  bounding: DOMRect;
  style: Style;
  viewBox: ViewBox;
}): Style {
  const pxPerUnit =
    ((bounding.width / bounding.height > viewBox.width / viewBox.height
      ? bounding.height
      : bounding.width) *
      scale) /
    mercatorConstants.domain;

  return { x: -x * pxPerUnit, y: -y * pxPerUnit, scale };
}

export function clientToMap({
  bounding,
  style: { x, y, scale },
  viewBox,
}: {
  bounding: DOMRect;
  style: Style;
  viewBox: ViewBox;
}): Style {
  const unitsPerPx =
    mercatorConstants.domain /
    ((bounding.width / bounding.height > viewBox.width / viewBox.height
      ? bounding.height
      : bounding.width) *
      scale);

  return { x: -x * unitsPerPx, y: -y * unitsPerPx, scale };
}

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
