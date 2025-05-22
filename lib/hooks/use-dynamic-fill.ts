import { Renderer, RendererKey } from "@/components/canvas/types";
import { usePathsHovered } from "./use-paths-hovered";
import { fadeFill } from "@/components/canvas/animation";
import { useAnimations } from "./use-animations";
import { useCanvas } from "@/components/canvas/canvas-provider";
import { useCallback, useEffect, useRef } from "react";

export function useDynamicFill({
  key,
  paths,
  renderer,
  getColor,
}: {
  key: RendererKey;
  paths: Path2D[][];
  renderer: (paths: Path2D[]) => Renderer;
  getColor: (i: number, hovered: boolean) => string;
}) {
  const hovered = useRef<number | null>(null);
  const colors = useRef<string[]>([]);
  const { addRenderer, removeRenderer } = useCanvas();
  const { getActiveAnimations, startAnimation } = useAnimations(key);

  const trigger = useCallback(() => {
    for (let i = 0; i < paths.length; i++) {
      const from = colors.current[i];
      const to = getColor(i, hovered.current === i);

      if (from === to) continue;

      colors.current[i] = to;
      const render = renderer(paths[i]);
      startAnimation(fadeFill({ subject: i, from, to, render }));
    }
  }, [getColor, paths, renderer, startAnimation]);

  usePathsHovered({
    paths,
    onEnter: (i) => {
      hovered.current = i;
      trigger();
    },
    onLeave: () => {
      hovered.current = null;
      trigger();
    },
  });

  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      const active = getActiveAnimations();

      for (let i = 0; i < paths.length; i++) {
        if (active.includes(i)) continue;
        ctx.fillStyle = colors.current[i];
        renderer(paths[i])({ ctx, scale });
      }
    };

    addRenderer({ render, ...key });
    return () => removeRenderer(key);
  }, [
    addRenderer,
    removeRenderer,
    getActiveAnimations,
    hovered,
    key,
    paths,
    renderer,
  ]);

  useEffect(() => trigger(), [trigger]);

  return { trigger };
}
