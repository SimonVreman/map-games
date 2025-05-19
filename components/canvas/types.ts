import { Oklch } from "culori";

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

export type Renderer = ({
  ctx,
}: {
  ctx: CanvasRenderingContext2D;
  scale: number;
}) => void;

export type CanvasAnimation = {
  timestamp: { start: number; end: number };
  fill?: { from: Oklch; current: Oklch; to: Oklch };
  raf?: number;
};
