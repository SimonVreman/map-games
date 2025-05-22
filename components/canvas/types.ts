import { Oklch, interpolate } from "culori";

type Interpolator = ReturnType<typeof interpolate<"oklch">>;

export type Style = {
  x: number;
  y: number;
  scale: number;
};

export type Bounds = {
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
