import { PatternEntry } from "@/types/registry";

export const createTranslate =
  (size: { width: number; height: number }) =>
  (
    m: PatternEntry["meta"],
    v: { scale?: number; ox?: number; oy?: number } = {}
  ): [number, number, number, number, number, number] => {
    const scale = ((m.east - m.west) * (v.scale ?? 1)) / (3 * size.width);

    return [
      scale,
      0,
      0,
      scale,
      m.west + (-1 + (v.ox ?? 1)) * size.width * scale,
      m.north + (-1 + (v.oy ?? 1)) * size.height * scale,
    ];
  };
