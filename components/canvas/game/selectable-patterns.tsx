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
const pathsCache = new WeakMap<Path2D[], Path2D>();

const patternKey = (n: string, s: number) => `${n}:${s}`;

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

function cachedMergedPath(paths: Path2D[]) {
  let mergedPath = pathsCache.get(paths);
  if (mergedPath) return mergedPath;

  mergedPath = paths.reduce((acc, path) => {
    acc.addPath(path);
    return acc;
  }, new Path2D());

  pathsCache.set(paths, mergedPath);
  return mergedPath;
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
    ({
        paths,
        name,
        subjects,
        transform: baseTransform,
        meta,
      }: TEntry): Renderer =>
      ({ ctx, scale }) => {
        ctx.strokeStyle = twColor("neutral-300", "neutral-700");
        ctx.lineWidth = scale;
        ctx.lineJoin = "round";

        const highlighted = isHighlighted(name);

        if (highlighted) {
          const transform: typeof baseTransform = [...baseTransform];
          const rasterScale =
            2 * 2 ** Math.round(Math.log2(baseTransform[0] / scale));

          transform[0] /= rasterScale;
          transform[3] /= rasterScale;

          ctx.save();

          const mergedPath = cachedMergedPath(paths);

          ctx.clip(mergedPath);
          ctx.transform(...transform);

          const dpr = window.devicePixelRatio;
          const rawTopLeft = bounding.current;
          const rawBottomRight = {
            x: bounding.current.width * dpr,
            y: bounding.current.height * dpr,
          };

          const tMatrix = ctx.getTransform().inverse();
          const topLeft = tMatrix.transformPoint(rawTopLeft);
          const bottomRight = tMatrix.transformPoint(rawBottomRight);

          const height = 500 * rasterScale;
          const maxYOffset = (meta.south - meta.north) / transform[3] + height;

          let i = 0;
          const cached: HTMLCanvasElement[] = [];

          for (let yOffset = 0; yOffset < maxYOffset; yOffset += height) {
            const width = 400 * rasterScale;
            const maxXOffset = (meta.east - meta.west) / transform[0] + width;
            const subject = subjects[i] as string;

            for (let xOffset = 0; xOffset < maxXOffset; xOffset += width) {
              if (
                xOffset + width < topLeft.x ||
                xOffset > bottomRight.x ||
                yOffset + height < topLeft.y ||
                yOffset > bottomRight.y
              )
                continue;

              cached[i] ??= cachedPattern({
                subject,
                scale: rasterScale,
                drawPattern,
              });

              ctx.drawImage(cached[i], xOffset, yOffset);
            }

            i = (i + 1) % subjects.length;
          }
          ctx.restore();
        }

        for (const path of paths) {
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
