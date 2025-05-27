import { twColor } from "../utils";
import { Renderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useCallback } from "react";
import { Pattern, PatternEntry } from "@/types/registry";
import { useWindowBounding } from "@/lib/hooks/use-window-bounding";

const tileSize = 500;
const tileMargin = 10;

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
const entryCache = new Map<string, HTMLCanvasElement | null>();
const pathCache = new WeakMap<Path2D[], Path2D>();

const patternKey = (n: string, s: number) => `${n}:${s}`;
const entryKey = (n: string, s: number, x: number, y: number) =>
  `${n}:${s}:${x}:${y}`;

function mergedPath(paths: Path2D[]): Path2D {
  let mergedPath = pathCache.get(paths);

  if (!mergedPath) {
    mergedPath = paths.reduce((acc, path) => {
      acc.addPath(path);
      return acc;
    }, new Path2D());
    pathCache.set(paths, mergedPath);
  }

  return mergedPath;
}

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
  x,
  y,
}: {
  entry: PatternEntry<TMap>;
  scale: number;
  drawPattern: (args: {
    subject: string;
    ctx: CanvasRenderingContext2D;
  }) => void;
  x: number;
  y: number;
}) {
  const key = entryKey(name, scale, x, y);
  if (entryCache.has(key)) return entryCache.get(key)!;

  const offscreen = document.createElement("canvas");
  offscreen.width = tileSize + tileMargin;
  offscreen.height = tileSize + tileMargin;
  const ctx = offscreen.getContext("2d")!;

  if (
    x + tileSize < meta.west * scale ||
    x > meta.east * scale ||
    y + tileSize < meta.north * scale ||
    y > meta.south * scale
  ) {
    entryCache.set(key, null);
    return null;
  }

  ctx.transform(scale, 0, 0, scale, -x, -y);
  ctx.clip(mergedPath(paths));

  const rasterScale = baseTransform[0] * 2 * scale;
  const transform: typeof baseTransform = [...baseTransform];
  transform[0] /= rasterScale;
  transform[3] /= rasterScale;
  ctx.transform(...transform);

  const height = 500 * rasterScale;
  const maxYOffset = (meta.south - meta.north) / transform[3] + height;

  let i = 0;
  const subjectCache: HTMLCanvasElement[] = [];

  for (let yOffset = 0; yOffset < maxYOffset; yOffset += height) {
    const width = 400 * rasterScale;
    const maxXOffset = (meta.east - meta.west) / transform[0] + width;
    const subject = subjects[i] as string;

    for (let xOffset = 0; xOffset < maxXOffset; xOffset += width) {
      subjectCache[i] ??= cachedPattern({
        subject,
        scale: rasterScale,
        drawPattern,
      });

      ctx.drawImage(subjectCache[i], xOffset, yOffset);
    }

    i = (i + 1) % subjects.length;
  }

  entryCache.set(key, offscreen);
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
        ctx.lineWidth = scale;
        ctx.lineJoin = "round";

        const highlighted = isHighlighted(entry.name);

        if (highlighted) {
          const rasterScale = 2 ** Math.round(Math.log2(1 / scale));
          ctx.scale(1 / rasterScale, 1 / rasterScale);

          const t = ctx.getTransform().inverse();
          const dpr = window.devicePixelRatio;

          const topLeft = t.transformPoint({
            x: bounding.current.x * dpr,
            y: bounding.current.y * dpr,
          });
          const bottomRight = t.transformPoint({
            x: bounding.current.width * dpr,
            y: bounding.current.height * dpr,
          });

          const minX = topLeft.x - (topLeft.x % tileSize);
          const minY = topLeft.y - (topLeft.y % tileSize);

          for (let x = minX; x < bottomRight.x; x += tileSize) {
            for (let y = minY; y < bottomRight.y; y += tileSize) {
              const cached = cachedEntry({
                entry,
                scale: rasterScale,
                drawPattern,
                x,
                y,
              });

              if (cached) ctx.drawImage(cached, x, y);
            }
          }

          ctx.scale(rasterScale, rasterScale);
        }

        ctx.strokeStyle = twColor("neutral-300", "neutral-700");
        for (const path of entry.paths) {
          ctx.fill(path);
          ctx.stroke(path);
        }
      },
    [isHighlighted, drawPattern, bounding]
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
