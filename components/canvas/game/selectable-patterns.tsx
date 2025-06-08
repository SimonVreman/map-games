import {
  ExtendedRenderer,
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
import { resolveFill } from "../utils";

const tileSize = 500;
const baseKey = "selectable-patterns";
const renderKeys = {
  patterns: { key: baseKey + ":patterns", order: 0, layer: 0 },
  entries: { key: baseKey + ":entries", order: 1, layer: 0 },
} as const;

const tileCache = new Map<string, ImageBitmap | null>();
const tileState = new Map<string, TileState>();

const entryKey = (s: number, x: number, y: number) => `${s}:${x}:${y}`;

function firstRendered({
  x,
  y,
  scale,
}: {
  x: number;
  y: number;
  scale: number;
}) {
  let lowerScale = scale / 2;
  let lowerX = x / 2;
  let lowerY = y / 2;

  while (lowerScale >= 1) {
    const halfTileX = lowerX % tileSize !== 0;
    const halfTileY = lowerY % tileSize !== 0;

    // TODO: this is doing some double rendering. If we only do it for the minX and minY tiles, we can avoid this.
    // But then, we get flashing because the tile we are depending on might be available at higher quality and thus
    // not render for us.
    // if ((halfTileX && !isMinX) || (halfTileY && !isMinY)) return null;
    if (halfTileX) lowerX -= tileSize / 2;
    if (halfTileY) lowerY -= tileSize / 2;

    const key = entryKey(lowerScale, lowerX, lowerY);

    if (tileCache.has(key))
      return {
        tile: tileCache.get(key),
        scale: lowerScale,
        x: lowerX,
        y: lowerY,
      };

    lowerScale /= 2;
    lowerX /= 2;
    lowerY /= 2;
  }

  return null;
}

function cachedEntry({
  worker,
  scale,
  x,
  y,
}: {
  worker: Worker;
  scale: number;
  x: number;
  y: number;
}) {
  const key = entryKey(scale, x, y);

  if (tileState.get(key) === TileState.loading)
    return firstRendered({ x, y, scale });

  if (tileCache.has(key)) return { tile: tileCache.get(key)!, scale, x, y };

  tileState.set(key, TileState.loading);

  worker.postMessage({
    type: "render",
    key,
    x,
    y,
    scale,
  } satisfies TileRenderMessage);

  return firstRendered({ x, y, scale });
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
  const { twColor, theme } = useTwTheme();
  const { updateAll, addRenderer, removeRenderer } = useCanvas();
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
      tileSize,
      patternSize: size,
      entries,
      theme,
    } satisfies TileInitMessage<TMap>);
  }, [patterns, entries, size, theme]);

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

  const renderEntry = useCallback<ExtendedRenderer<{ item: TEntry }>>(
    ({ ctx, scale, item: entry }) => {
      ctx.lineWidth = scale;
      ctx.lineJoin = "round";
      ctx.strokeStyle = twColor("neutral-300", "neutral-700");

      const isTinyHighlighted = entry.tiny && isHighlighted(entry.name);

      for (const path of entry.paths) {
        const path2d = cachedPath(path);

        if (isTinyHighlighted) {
          const diagonal = Math.sqrt(size.width ** 2 + size.height ** 2);
          const scale = (5 / diagonal) * entry.transform[0];
          const offsetX = entry.meta.x - (size.width * scale) / 2;
          const offsetY = entry.meta.y - (size.height * scale) / 2;
          const { background, paths } = patterns[entry.subjects[0]];

          ctx.save();
          ctx.fillStyle = background[theme];
          ctx.fill(path2d);
          ctx.clip(path2d);
          ctx.transform(scale, 0, 0, scale, offsetX, offsetY);

          for (const { path, fill } of paths) {
            const path2d = cachedPath(path);
            if (!fill) continue;
            ctx.fillStyle = resolveFill({ fill, ctx });
            ctx.fill(path2d);
          }

          ctx.restore();
        }

        ctx.fill(path2d);
        ctx.stroke(path2d);
      }
    },
    [twColor, isHighlighted, patterns, size.width, size.height, theme]
  );

  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      if (!worker.current) return;

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

      let lastScale = rasterScale;

      for (let x = minX; x < bottomRight.x; x += tileSize) {
        for (let y = minY; y < bottomRight.y; y += tileSize) {
          const cached = cachedEntry({
            worker: worker.current,
            scale: rasterScale,
            x,
            y,
          });

          if (!cached?.tile) continue;

          if (lastScale !== cached.scale) {
            ctx.scale(lastScale / cached.scale, lastScale / cached.scale);
            lastScale = cached.scale;
          }

          ctx.drawImage(cached.tile, cached.x, cached.y);
        }
      }

      ctx.scale(lastScale, lastScale);
    };

    addRenderer({ render, ...renderKeys.patterns });
    return () => removeRenderer(renderKeys.patterns);
  }, [addRenderer, removeRenderer, bounding]);

  useDynamicFill({
    key: renderKeys.entries,
    items: entries,
    renderItem: renderEntry,
    getColor: currentEntryColor,
  });

  usePathsClicked({
    items: entries,
    onClick: ({ name }) => onClick(name),
  });

  return null;
}
