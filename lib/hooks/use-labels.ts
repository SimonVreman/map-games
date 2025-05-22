import { useCanvas } from "@/components/canvas/canvas-provider";
import { Renderer } from "@/components/canvas/types";
import { twColor, twFont } from "@/components/canvas/utils";
import { useEffect } from "react";

type BaseItem = { area: number; center: number[] };
type Label = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
};

function labelsOverlap(a: Label, b: Label) {
  return (
    a.x - a.width / 2 < b.x + b.width / 2 &&
    a.x + a.width / 2 > b.x - b.width / 2 &&
    a.y - a.height / 2 < b.y + b.height / 2 &&
    a.y + a.height / 2 > b.y - b.height / 2
  );
}

function getPlaceableLabels<TItem extends BaseItem>({
  items,
  getLabel,
  lineHeight,
  ctx,
}: {
  items: TItem[];
  getLabel: (item: TItem) => string;
  lineHeight: number;
  ctx: CanvasRenderingContext2D;
}) {
  const labels = items.map((item) => {
    const { area, center } = item;
    const label = getLabel(item);
    const width = ctx.measureText(label).width;
    const height = lineHeight;
    return { label, x: center[0], y: center[1], width, height, area };
  });

  // Filter out labels that overlap, give priority to the ones with the largest area
  return labels.filter(
    (a) =>
      !labels.some((b) => a !== b && a.area <= b.area && labelsOverlap(a, b))
  );
}

export function useLabels<TItem extends BaseItem>({
  layer: renderLayer,
  key: renderKey,
  order: renderOrder,
  items,
  isVisible,
  getLabel,
}: {
  layer: number;
  key: string;
  order: number;
  items: TItem[];
  isVisible: (item: TItem) => boolean;
  getLabel: (item: TItem) => string;
}) {
  const { addRenderer, removeRenderer } = useCanvas();

  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      const fontSize = 20 * scale;
      const lineHeight = fontSize * 1.2;
      ctx.fillStyle = twColor("neutral-950", "neutral-50");
      ctx.strokeStyle = twColor("neutral-50", "neutral-950");
      ctx.lineWidth = 2 * scale;
      ctx.font = `${fontSize}px ${twFont("sans")}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const visible = items.filter(isVisible);

      const placeable = getPlaceableLabels({
        items: visible,
        getLabel,
        lineHeight,
        ctx,
      });

      for (const { label, x, y } of placeable) {
        ctx.strokeText(label, x, y);
        ctx.fillText(label, x, y);
      }
    };

    addRenderer(renderLayer, { render, key: renderKey, order: renderOrder });
    return () => removeRenderer(renderLayer, renderKey);
  }, [
    addRenderer,
    removeRenderer,
    renderLayer,
    renderKey,
    renderOrder,
    isVisible,
    getLabel,
    items,
  ]);
}
