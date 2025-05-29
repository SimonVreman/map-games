import { Pattern, PatternEntry } from "@/types/registry";
import { Oklch, interpolate } from "culori";

type Interpolator = ReturnType<typeof interpolate<"oklch">>;

export type Style = {
  x: number;
  y: number;
  scale: number;
};

export type Bounds = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type LatLngBounds = {
  north: number;
  south: number;
  west: number;
  east: number;
  padding?: number;
};

export type ViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RendererKey = {
  layer: number;
  key: string;
  order?: number;
};

export type Renderer = ({
  ctx,
}: {
  ctx: CanvasRenderingContext2D;
  scale: number;
}) => void;

export type CanvasAnimation = {
  subject: string | number;
  timestamp: { start: number; end: number };
  render: Renderer;
  fill?: { from: Oklch; to: Oklch; interpolator: Interpolator };
};

export enum TileState {
  loading = "loading",
  done = "done",
  error = "error",
}

export type TileInitMessage<
  TMap extends Record<string, Pattern> = Record<string, Pattern>
> = {
  type: "init";
  patterns: TMap;
  colors: string[];
  tileSize: number;
  patternSize: { width: number; height: number };
  entries: PatternEntry<TMap>[];
};

export type TileRenderMessage = {
  type: "render";
  key: string;
  x: number;
  y: number;
  scale: number;
};

export type TileProcessedMessage = {
  type: "ready";
  key: string;
  state: TileState;
  bitmap?: ImageBitmap;
};
