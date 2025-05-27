import { Renderer, RendererKey } from "@/components/canvas/types";
import { usePathsHovered } from "./use-paths-hovered";
import { fadeFill } from "@/components/canvas/animation";
import { useAnimations } from "./use-animations";
import { useCanvas } from "@/components/canvas/canvas-provider";
import { useCallback, useEffect, useRef } from "react";

export function useDynamicFill<TItem extends { paths: string[] }>({
  key,
  items,
  renderer,
  getColor,
}: {
  key: RendererKey;
  items: TItem[];
  renderer: (item: TItem) => Renderer;
  getColor: (item: TItem, hovered: boolean) => string;
}) {
  const hovered = useRef<number | null>(null);
  const colors = useRef<string[]>([]);
  const { addRenderer, removeRenderer } = useCanvas();
  const { getActiveAnimations, startAnimation } = useAnimations(key);

  const trigger = useCallback(() => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const from = colors.current[i];
      const to = getColor(item, hovered.current === i);

      if (from === to) continue;

      colors.current[i] = to;
      const render = renderer(item);
      startAnimation(fadeFill({ subject: i, from, to, render }));
    }
  }, [getColor, items, renderer, startAnimation]);

  usePathsHovered({
    items,
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

      for (let i = 0; i < items.length; i++) {
        if (active.includes(i)) continue;
        ctx.fillStyle = colors.current[i];
        renderer(items[i])({ ctx, scale });
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
    items,
    renderer,
  ]);

  useEffect(() => trigger(), [trigger]);

  return { trigger };
}
