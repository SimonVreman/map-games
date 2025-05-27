import { twColor } from "../utils";
import { Renderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useCallback } from "react";
import { Pattern, PatternEntry } from "@/types/registry";
import { useWindowBounding } from "@/lib/hooks/use-window-bounding";

const colors = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
  "chart-7",
  "chart-8",
  "chart-9",
  "chart-10",
];

const baseKey = "selectable-patterns";
const renderKeys = {
  entries: { key: baseKey + ":entries", order: 0, layer: 0 },
} as const;

const patternCache = new Map<string, HTMLCanvasElement>();
const entryCache = new Map<string, HTMLCanvasElement>();
const pathCache = new WeakMap<Path2D[], Path2D>();

const patternKey = (n: string, s: number) => `${n}:${s}`;
const entryKey = (n: string, s: number) => `${n}:${s}`;

function cachedPattern({
  subject,
  scale,
  drawPattern,
}: {
  subject: string;
  scale: number;
  drawPattern: (args: {
    subject: string;
    ctx: CanvasRenderingContext2D;
  }) => void;
}) {
  const key = patternKey(subject, scale);
  if (patternCache.has(key)) return patternCache.get(key)!;

  // console.log(`Rendering pattern: ${subject} at scale: ${scale}`);

  const offscreen = document.createElement("canvas");
  offscreen.width = 400 * scale + 20;
  offscreen.height = 500 * scale + 20;
  const ctx = offscreen.getContext("2d", { alpha: false })!;

  ctx.fillStyle = twColor(colors[subject.charCodeAt(0) % colors.length]);
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);

  ctx.scale(scale, scale);
  drawPattern({ subject, ctx });

  patternCache.set(key, offscreen);
  return offscreen;
}

function cachedEntry<TMap extends Record<string, Pattern>>({
  entry: { name, paths, meta, transform: baseTransform, subjects },
  scale,
  drawPattern,
}: {
  entry: PatternEntry<TMap>;
  scale: number;
  drawPattern: (args: {
    subject: string;
    ctx: CanvasRenderingContext2D;
  }) => void;
}) {
  const key = entryKey(name, scale);
  if (entryCache.has(key)) return entryCache.get(key)!;

  let mergedPath = pathCache.get(paths);
  if (!mergedPath) {
    mergedPath = paths.reduce((acc, path) => {
      acc.addPath(path);
      return acc;
    }, new Path2D());
    pathCache.set(paths, mergedPath);
  }

  const offscreen = document.createElement("canvas");

  offscreen.width = Math.ceil((meta.east - meta.west) * scale);
  offscreen.height = Math.ceil((meta.south - meta.north) * scale);

  // console.log(
  //   `Rendering entry: ${name} at scale: ${scale}, width: ${offscreen.width}, height: ${offscreen.height}`
  // );

  const ctx = offscreen.getContext("2d")!;

  ctx.transform(scale, 0, 0, scale, -meta.west * scale, -meta.north * scale);
  ctx.clip(mergedPath);

  const rasterScale = baseTransform[0] * 2 * scale;
  const transform: typeof baseTransform = [...baseTransform];
  transform[0] /= rasterScale;
  transform[3] /= rasterScale;
  ctx.transform(...transform);

  const height = 500 * rasterScale;
  const maxYOffset = (meta.south - meta.north) / transform[3] + height;

  let i = 0;

  for (let yOffset = 0; yOffset < maxYOffset; yOffset += height) {
    const width = 400 * rasterScale;
    const maxXOffset = (meta.east - meta.west) / transform[0] + width;
    const subject = subjects[i % subjects.length] as string;

    for (let xOffset = 0; xOffset < maxXOffset; xOffset += width) {
      // if (
      //   xOffset + width < topLeft.x ||
      //   xOffset > bottomRight.x ||
      //   yOffset + height < topLeft.y ||
      //   yOffset > bottomRight.y
      // )
      //   continue;

      const cached = cachedPattern({
        subject,
        scale: rasterScale,
        drawPattern,
      });

      if (cached) ctx.drawImage(cached, xOffset, yOffset);
    }

    i++;
  }

  entryCache.set(key, offscreen);
  // ctx.transform(...transform);

  // const dpr = window.devicePixelRatio;
  // const rawTopLeft = bounding.current;
  // const rawBottomRight = {
  //   x: bounding.current.width * dpr,
  //   y: bounding.current.height * dpr,
  // };

  // const tMatrix = ctx.getTransform().inverse();
  // const topLeft = tMatrix.transformPoint(rawTopLeft);
  // const bottomRight = tMatrix.transformPoint(rawBottomRight);
}

export function SelectablePatterns<
  TMap extends Record<string, Pattern>,
  TEntry extends PatternEntry<TMap>
>({
  patterns,
  entries,
  isHighlighted,
  onClick,
}: {
  patterns: TMap;
  entries: TEntry[];
  isHighlighted: (name: string) => boolean;
  onClick: (name: string) => void;
}) {
  const bounding = useWindowBounding();

  const currentCountryColor = useCallback(
    (entry: TEntry, hovered: boolean) => {
      if (isHighlighted(entry.name)) {
        const base = twColor("white", "neutral-900");
        return base.slice(0, -1) + " / 0)";
      }

      return hovered
        ? twColor("neutral-600", "neutral-400")
        : twColor("white", "neutral-900");
    },
    [isHighlighted]
  );

  const drawPattern = useCallback(
    ({ subject, ctx }: { subject: string; ctx: CanvasRenderingContext2D }) => {
      const pattern = patterns[subject];

      for (const { path: p, fill } of pattern) {
        if (!fill) continue;

        ctx.fillStyle = fill;
        ctx.fill(p);
      }
    },
    [patterns]
  );

  const entryRenderer = useCallback(
    (entry: TEntry): Renderer =>
      ({ ctx, scale }) => {
        ctx.strokeStyle = twColor("neutral-300", "neutral-700");
        ctx.lineWidth = scale;
        ctx.lineJoin = "round";

        const highlighted = isHighlighted(entry.name);

        if (["Russia", "France"].includes(entry.name)) return;

        if (highlighted) {
          const rasterScale = 2 ** Math.round(Math.log2(1 / scale));

          ctx.scale(1 / rasterScale, 1 / rasterScale);

          const cached = cachedEntry({
            entry,
            scale: rasterScale,
            drawPattern,
          });

          if (cached)
            ctx.drawImage(
              cached,
              entry.meta.west * rasterScale,
              entry.meta.north * rasterScale
            );

          ctx.scale(rasterScale, rasterScale);
        }

        for (const path of entry.paths) {
          ctx.fill(path);
          ctx.stroke(path);
        }
      },
    [isHighlighted, drawPattern]
  );

  useDynamicFill({
    key: renderKeys.entries,
    items: entries,
    renderer: entryRenderer,
    getColor: currentCountryColor,
  });

  usePathsClicked({
    items: entries,
    onClick: ({ name }) => onClick(name),
  });

  return null;
}
