import { useTwTheme } from "@/lib/hooks/use-tw-theme";
import { useEffect } from "react";
import { useCanvas } from "../canvas-provider";
import { Renderer } from "../types";
import { cachedPath } from "@/lib/mapping/cache";

export function Outlines({
  renderKey,
  external,
  internal,
  divider,
}: {
  renderKey: { key: string; order: number; layer: number };
  external: string[];
  internal: string[];
  divider: string[];
}) {
  const { twColor } = useTwTheme();
  const { addRenderer, removeRenderer } = useCanvas();

  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      ctx.lineWidth = scale * 2;
      ctx.lineJoin = "round";

      ctx.strokeStyle = twColor("neutral-400", "neutral-600");
      for (const path of external) ctx.stroke(cachedPath(path));

      ctx.setLineDash([scale * 3, scale * 3]);
      for (const path of internal) ctx.stroke(cachedPath(path));

      ctx.strokeStyle = twColor("neutral-300", "neutral-700");
      ctx.setLineDash([scale * 5, scale * 5]);
      for (const path of divider) ctx.stroke(cachedPath(path));
      ctx.setLineDash([]);
    };

    addRenderer({ render, ...renderKey });
    return () => removeRenderer(renderKey);
  }, [
    divider,
    external,
    internal,
    addRenderer,
    removeRenderer,
    twColor,
    renderKey,
  ]);

  return null;
}
