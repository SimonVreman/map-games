import { Renderer, RendererKey } from "@/components/canvas/types";
import { usePathsHovered } from "./use-paths-hovered";
import { fadeFill } from "@/components/canvas/animation";
import { useAnimations } from "./use-animations";
import { useCanvas } from "@/components/canvas/canvas-provider";
import { useCallback, useEffect } from "react";

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
  const { addRenderer, removeRenderer } = useCanvas();
  const { getActiveAnimations, startAnimation } = useAnimations(key);

  const animateHover = useCallback(
    (i: number, toHovered: boolean) => {
      const from = getColor(i, !toHovered);
      const to = getColor(i, toHovered);

      if (from === to) return;

      const render = renderer(paths[i]);
      return startAnimation(fadeFill({ subject: i, from, to, render }));
    },
    [getColor, paths, renderer, startAnimation]
  );

  const { hovered } = usePathsHovered({
    paths,
    onEnter: (i) => animateHover(i, true),
    onLeave: (i) => animateHover(i, false),
  });

  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      const active = getActiveAnimations();

      for (let i = 0; i < paths.length; i++) {
        if (active.includes(i)) {
          continue;
        }
        ctx.fillStyle = getColor(i, hovered === i);
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
    getColor,
    paths,
    renderer,
  ]);
}
