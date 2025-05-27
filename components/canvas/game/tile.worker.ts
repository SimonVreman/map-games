import { Pattern, PatternEntry } from "@/types/registry";
import {
  TileInitMessage,
  TileProcessedMessage,
  TileRenderMessage,
  TileState,
} from "../types";
import { cachedPath } from "@/lib/mapping/cache";

const tileSize = 500;
const tileMargin = 10;

const pathCache = new WeakMap<string[], Path2D>();
const patternCache = new Map<string, OffscreenCanvas>();
const patternKey = (n: string, s: number) => `${n}:${s}`;

let patterns: Record<string, Pattern> = {};
let colors: string[] = [];
let isReady = false;

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

  const offscreen = new OffscreenCanvas(400 * scale + 20, 500 * scale + 20);
  const ctx = offscreen.getContext("2d", { alpha: false })!;

  ctx.fillStyle = colors[subject.charCodeAt(0) % colors.length];
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);

  ctx.scale(scale, scale);

  const pattern = patterns[subject];

  for (const { path: p, fill } of pattern) {
    if (!fill) continue;
    ctx.fillStyle = fill;
    ctx.fill(cachedPath(p));
  }

  patternCache.set(key, offscreen);
  return offscreen;
}

function renderTile({
  x,
  y,
  scale,
  entry: { meta, subjects, transform: baseTransform, paths },
}: {
  scale: number;
  x: number;
  y: number;
  entry: PatternEntry;
}) {
  const size = tileSize + tileMargin;
  const offscreen = new OffscreenCanvas(size, size);
  const ctx = offscreen.getContext("2d")!;

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
  const subjectCache: OffscreenCanvas[] = [];

  for (let yOffset = 0; yOffset < maxYOffset; yOffset += height) {
    const width = 400 * rasterScale;
    const maxXOffset = (meta.east - meta.west) / transform[0] + width;
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

  return offscreen.transferToImageBitmap();
}

function handleInit(e: MessageEvent<TileInitMessage>) {
  patterns = e.data.patterns;
  colors = e.data.colors;
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

addEventListener(
  "message",
  (event: MessageEvent<TileInitMessage | TileRenderMessage>) => {
    if (event.data.type === "init") {
      handleInit(event as MessageEvent<TileInitMessage>);
    } else if (event.data.type === "render") {
      handleRender(event as MessageEvent<TileRenderMessage>);
    }
  }
);
