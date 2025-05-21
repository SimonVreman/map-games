import { Renderer } from "@/components/canvas/types";
import { usePathsHovered } from "./use-paths-hovered";
import { fadeFill } from "@/components/canvas/animation";
import { useAnimations } from "./use-animations";
import { useCanvas } from "@/components/canvas/canvas-provider";
import { useCallback, useEffect } from "react";
import { twColor } from "@/components/canvas/utils";

export function useDynamicFill({
  paths,
  layer: renderLayer,
  order: renderOrder,
  key: renderKey,
  renderer,
  getColor,
}: {
  paths: Path2D[][];
  layer: number;
  order: number;
  key: string;
  renderer: (paths: Path2D[]) => Renderer;
  getColor: (i: number, hovered: boolean) => string;
}) {
  const { update, addRenderer, removeRenderer } = useCanvas();
  const { getActiveAnimations, startAnimation } = useAnimations();

  const animateHover = useCallback(
    (i: number, toHovered: boolean) => {
      const from = getColor(i, !toHovered);
      const to = getColor(i, toHovered);

      if (from === to) return;

      const render = renderer(paths[i]);
      return startAnimation({
        animation: fadeFill({ subject: i, from, to }),
        render: (...args) => {
          render(...args);
          update(renderLayer, renderOrder + 1);
        },
      });
    },
    [
      getColor,
      paths,
      renderLayer,
      renderOrder,
      renderer,
      startAnimation,
      update,
    ]
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
        if (active.includes(i)) continue;
        ctx.fillStyle = twColor(getColor(i, hovered === i));
        renderer(paths[i])({ ctx, scale });
      }
    };

    addRenderer(renderLayer, { render, key: renderKey, order: renderOrder });
    return () => removeRenderer(renderLayer, renderKey);
  }, [
    addRenderer,
    removeRenderer,
    getActiveAnimations,
    hovered,
    renderLayer,
    renderKey,
    renderOrder,
    getColor,
    paths,
    renderer,
  ]);
}
