import { ExtendedRenderer, RendererKey } from "@/components/canvas/types";
import { usePathsHovered } from "./use-paths-hovered";
import { fadeFill } from "@/components/canvas/animation";
import { useAnimations } from "./use-animations";
import { useCallback, useEffect, useRef } from "react";

export function useDynamicFill<TItem extends { paths: string[] }>({
  key,
  items,
  renderItem,
  getColor,
}: {
  key: RendererKey;
  items: TItem[];
  renderItem: ExtendedRenderer<{ item: TItem }>;
  getColor: (item: TItem, hovered: boolean) => string;
}) {
  const hovered = useRef<number | null>(null);
  const colors = useRef(new WeakMap<TItem, string>());
  const { startAnimation } = useAnimations({
    key,
    renderBase: renderItem,
    renderStatic: ({ ctx, item }) =>
      (ctx.fillStyle = colors.current.get(item) ?? "transparent"),
    items,
  });

  const trigger = useCallback(() => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const from = colors.current.get(item) ?? "oklch(0 0 0 / 0)";
      const to = getColor(item, hovered.current === i);

      if (from === to) continue;

      colors.current.set(item, to);
      startAnimation(fadeFill({ index: i, from, to }));
    }
  }, [getColor, items, startAnimation]);

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

  useEffect(() => trigger(), [trigger]);

  return { trigger };
}
