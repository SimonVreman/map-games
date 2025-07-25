import { Pattern, PatternEntry, Sprites } from "@/types/registry";
import {
  TileInitMessage,
  TileProcessedMessage,
  TileRenderMessage,
  TileState,
} from "../types";
import { cachedPath } from "@/lib/mapping/cache";
import { resolveFill } from "../utils";

const tileMargin = 10;

const pathCache = new WeakMap<string[], Path2D>();
const patternCache = new Map<string, OffscreenCanvas>();
const patternKey = (n: string, s: number) => `${n}:${s}`;

let patterns: Record<string, Pattern> = {};
let sprites: Sprites = {};
let entries: PatternEntry<Record<string, Pattern>>[] = [];
let isReady = false;
let tileSize = 0;
let patternWidth = 0;
let patternHeight = 0;
let theme: "light" | "dark" = "light";

function mergedPath(paths: string[]): Path2D {
  let mergedPath = pathCache.get(paths);

  if (!mergedPath) {
    mergedPath = paths.reduce((acc, path) => {
      acc.addPath(cachedPath(path));
      return acc;
    }, new Path2D());
    pathCache.set(paths, mergedPath);
  }

  return mergedPath;
}

function cachedPattern({ subject, scale }: { subject: string; scale: number }) {
  const key = patternKey(subject, scale);
  if (patternCache.has(key)) return patternCache.get(key)!;

  const offscreen = new OffscreenCanvas(
    patternWidth * scale + tileMargin,
    patternHeight * scale + tileMargin
  );

  const ctx = offscreen.getContext("2d", { alpha: false })!;
  const pattern = patterns[subject];

  ctx.fillStyle = pattern.background[theme];
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);

  ctx.scale(scale, scale);

  for (const { path: p, fill, image } of pattern.paths) {
    if (image) {
      ctx.drawImage(
        sprites[image.sprite].bitmap,
        ...image.source,
        ...image.destination
      );
    } else if (fill) {
      ctx.fillStyle = resolveFill({ fill, ctx });
      ctx.fill(cachedPath(p));
    }
  }

  patternCache.set(key, offscreen);
  return offscreen;
}

function renderTileEntry({
  entry: { paths, meta, subjects, transform: baseTransform },
  scale,
  ctx,
}: {
  entry: (typeof entries)[number];
  scale: number;
  ctx: OffscreenCanvasRenderingContext2D;
}) {
  ctx.save();
  ctx.clip(mergedPath(paths));

  const rasterScale = baseTransform[0] * 2 * scale;
  const transform: typeof baseTransform = [...baseTransform];
  transform[0] /= rasterScale;
  transform[3] /= rasterScale;
  ctx.transform(...transform);

  const height = patternHeight * rasterScale;
  const width = patternWidth * rasterScale;
  const maxYOffset = (meta.south - meta.north) / transform[3] + height;
  const maxXOffset = (meta.east - meta.west) / transform[0] + width;

  let i = 0;
  const subjectCache: OffscreenCanvas[] = [];

  for (let yOffset = 0; yOffset < maxYOffset; yOffset += height) {
    const width = patternWidth * rasterScale;
    const subject = subjects[i] as string;

    for (let xOffset = 0; xOffset < maxXOffset; xOffset += width) {
      subjectCache[i] ??= cachedPattern({
        subject,
        scale: rasterScale,
      });

      ctx.drawImage(subjectCache[i], xOffset, yOffset);
    }

    i = (i + 1) % subjects.length;
  }

  ctx.restore();
}

function renderTile({ x, y, scale }: { scale: number; x: number; y: number }) {
  const size = tileSize + tileMargin;
  const offscreen = new OffscreenCanvas(size, size);
  const ctx = offscreen.getContext("2d")!;

  ctx.transform(scale, 0, 0, scale, -x, -y);

  for (const entry of entries) {
    if (entry.tiny) continue;
    renderTileEntry({ entry, scale, ctx });
  }

  return offscreen.transferToImageBitmap();
}

function handleInit(e: MessageEvent<TileInitMessage>) {
  patterns = e.data.patterns;
  sprites = e.data.sprites ?? {};
  entries = e.data.entries;
  tileSize = e.data.tileSize;
  patternWidth = e.data.patternSize.width;
  patternHeight = e.data.patternSize.height;
  theme = e.data.theme;

  patternCache.clear();

  isReady = true;
}

function handleRender(e: MessageEvent<TileRenderMessage>) {
  const { key, ...data } = e.data;

  if (!isReady)
    postMessage({
      type: "ready",
      key,
      state: TileState.error,
    } satisfies TileProcessedMessage);

  const bitmap = renderTile(data);

  postMessage({
    type: "ready",
    key,
    state: TileState.done,
    bitmap,
  } satisfies TileProcessedMessage);
}

const tileMessageQueue = [] as MessageEvent<TileRenderMessage>[];
let scheduledRender: null | NodeJS.Timeout = null;

function processQueue() {
  while (tileMessageQueue.length > 0) {
    const renderEvent = tileMessageQueue.pop();
    if (!renderEvent) continue;
    handleRender(renderEvent);
  }
}

addEventListener(
  "message",
  (event: MessageEvent<TileInitMessage | TileRenderMessage>) => {
    if (event.data.type === "init") {
      handleInit(event as MessageEvent<TileInitMessage>);
    } else if (event.data.type === "render") {
      tileMessageQueue.push(event as MessageEvent<TileRenderMessage>);

      if (!isReady || scheduledRender != null) return;

      scheduledRender = setTimeout(() => {
        scheduledRender = null;
        processQueue();
      }, 5);
    }
  }
);
