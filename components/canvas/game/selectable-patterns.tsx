import {
  Renderer,
  TileInitMessage,
  TileProcessedMessage,
  TileRenderMessage,
  TileState,
} from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useCallback, useEffect, useRef } from "react";
import { Pattern, PatternEntry } from "@/types/registry";
import { useWindowBounding } from "@/lib/hooks/use-window-bounding";
import { cachedPath } from "@/lib/mapping/cache";
import { useCanvas } from "../canvas-provider";
import { useTwTheme } from "@/lib/hooks/use-tw-theme";

const tileSize = 500;

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

const tileCache = new Map<string, ImageBitmap | null>();
const tileState = new Map<string, TileState>();

const entryKey = (n: string, s: number, x: number, y: number) =>
  `${n}:${s}:${x}:${y}`;

function cachedEntry({
  worker,
  entry,
  scale,
  x,
  y,
}: {
  worker: Worker;
  entry: PatternEntry;
  scale: number;
  x: number;
  y: number;
}) {
  const { name, meta } = entry;
  const key = entryKey(name, scale, x, y);
  if (tileState.get(key) === TileState.loading) return null;
  if (tileCache.has(key)) return tileCache.get(key) ?? null;

  // Just set empty tiles to null
  if (
    x + tileSize < meta.west * scale ||
    x > meta.east * scale ||
    y + tileSize < meta.north * scale ||
    y > meta.south * scale
  ) {
    tileCache.set(key, null);
    tileState.set(key, TileState.done);
    return null;
  }

  tileState.set(key, TileState.loading);

  worker.postMessage({
    type: "render",
    key,
    x,
    y,
    scale,
    entry,
  } satisfies TileRenderMessage);

  return null;
}

export function SelectablePatterns<
  TMap extends Record<string, Pattern>,
  TEntry extends PatternEntry<TMap>
>({
  patterns,
  size,
  entries,
  isHighlighted,
  onClick,
}: {
  patterns: TMap;
  size: { width: number; height: number };
  entries: TEntry[];
  isHighlighted: (name: string) => boolean;
  onClick: (name: string) => void;
}) {
  const { twColor } = useTwTheme();
  const { updateAll } = useCanvas();
  const bounding = useWindowBounding();
  const worker = useRef<Worker>(null);

  useEffect(() => {
    worker.current = new Worker(new URL("./tile.worker.ts", import.meta.url));
    return () => worker.current?.terminate();
  }, []);

  useEffect(() => {
    tileCache.clear();
    tileState.clear();
    worker.current?.postMessage({
      type: "init",
      patterns,
      colors: colors.map((c) => twColor(c)),
      tileSize,
      patternSize: size,
    } satisfies TileInitMessage);
  }, [patterns, twColor, size]);

  useEffect(() => {
    const listener = (event: MessageEvent<TileProcessedMessage>) => {
      const { key, state, bitmap } = event.data;
      tileState.set(key, state);

      if (state !== TileState.done) return;

      tileCache.set(key, bitmap ?? null);
      updateAll();
    };

    worker.current?.addEventListener("message", listener);

    return () => worker.current?.removeEventListener("message", listener);
  }, [updateAll]);

  const currentEntryColor = useCallback(
    (entry: TEntry, hovered: boolean) => {
      if (isHighlighted(entry.name)) {
        const base = twColor("white", "neutral-900");
        return `${base.slice(0, -1)} / ${hovered ? "0.3" : "0"})`;
      }

      return hovered
        ? twColor("neutral-600", "neutral-400")
        : twColor("white", "neutral-900");
    },
    [isHighlighted, twColor]
  );

  const entryRenderer = useCallback(
    (entry: TEntry): Renderer =>
      ({ ctx, scale }) => {
        ctx.lineWidth = scale;
        ctx.lineJoin = "round";

        const highlighted = isHighlighted(entry.name);

        if (highlighted && worker.current) {
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
                worker: worker.current,
                entry: entry as PatternEntry,
                scale: rasterScale,
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
          const path2d = cachedPath(path);
          ctx.fill(path2d);
          ctx.stroke(path2d);
        }
      },
    [isHighlighted, bounding, twColor]
  );

  useDynamicFill({
    key: renderKeys.entries,
    items: entries,
    renderer: entryRenderer,
    getColor: currentEntryColor,
  });

  usePathsClicked({
    items: entries,
    onClick: ({ name }) => onClick(name),
  });

  return null;
}
