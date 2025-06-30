import { PatternEntry } from "@/types/registry";

export const createTranslate =
  (
    size: { width: number; height: number },
    options?: { defaultWidthFraction?: number }
  ) =>
  (
    m: PatternEntry["meta"],
    v: { scale?: number; ox?: number; oy?: number } = {}
  ): [number, number, number, number, number, number] => {
    const scale =
      ((m.east - m.west) * (v.scale ?? 1)) /
      ((options?.defaultWidthFraction ?? 3) * size.width);

    return [
      scale,
      0,
      0,
      scale,
      m.west + (-1 + (v.ox ?? 1)) * size.width * scale,
      m.north + (-1 + (v.oy ?? 1)) * size.height * scale,
    ];
  };

export const createTranslateNew =
  (options?: { defaultWidthFraction?: number }) =>
  (
    v: { scale?: number; ox?: number; oy?: number } = {}
  ): [number, number, number, number, number, number] => {
    const scale = (v.scale ?? 1) / (options?.defaultWidthFraction ?? 3);

    return [scale, 0, 0, scale, -1 + (v.ox ?? 1), -1 + (v.oy ?? 1)];
  };

export const createTapTarget = (
  { x, y }: PatternEntry["meta"],
  t?: Parameters<ReturnType<typeof createTranslate>>[1]
): Pick<PatternEntry, "meta" | "paths" | "transform" | "tiny"> => {
  const r = 2.5;

  return {
    meta: { x, y, west: x - r, east: x + r, north: y - r, south: y + r },
    paths: [
      `M${x} ${y} m-${r}, 0 a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 -${
        2 * r
      },0`,
    ],
    transform: [t?.scale ?? 1, 0, 0, t?.scale ?? 1, 0, 0],
    tiny: true,
  };
};
