import { useCanvas } from "@/components/canvas/canvas-provider";
import { pathsHovered } from "@/components/canvas/utils";
import { useEffect, useRef } from "react";

export function usePathsHovered<TItem extends { paths: Path2D[] }>({
  items,
  onEnter,
  onLeave,
}: {
  items: TItem[];
  onEnter: (index: number) => void;
  onLeave: (index: number) => void;
}) {
  const hovered = useRef<number | null>(null);
  const {
    ctxs: [ctx],
    refs: { base },
  } = useCanvas();

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      if (!ctx || e.pointerType !== "mouse") return;
      const { clientX, clientY } = e;

      const newHovered = items.findIndex(({ paths }) =>
        pathsHovered({ paths, ctx, clientX, clientY })
      );

      if (hovered.current === newHovered) return;

      if (hovered.current !== null) onLeave(hovered.current);
      if (newHovered !== -1) onEnter(newHovered);

      hovered.current = newHovered === -1 ? null : newHovered;
    };

    const current = base.current;

    current?.addEventListener("pointermove", handle);
    return () => current?.removeEventListener("pointermove", handle);
  }, [ctx, items, onEnter, base, onLeave]);

  return { hovered };
}
