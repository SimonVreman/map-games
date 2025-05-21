import { useCanvas } from "@/components/canvas/canvas-provider";
import { pathsHovered } from "@/components/canvas/utils";
import { useEffect, useRef } from "react";

export function usePathsHovered({
  paths,
  onEnter,
  onLeave,
}: {
  paths: Path2D[][];
  onEnter: (index: number) => void;
  onLeave: (index: number) => void;
}) {
  const hovered = useRef<number>(-1);
  const {
    ctxs: [ctx],
    refs: { base },
  } = useCanvas();

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      if (!ctx || e.pointerType !== "mouse") return;
      const { clientX, clientY } = e;

      const newHovered = paths.findIndex((subpaths) =>
        pathsHovered({ paths: subpaths, ctx, clientX, clientY })
      );

      if (hovered.current === newHovered) return;

      if (hovered.current !== -1) onLeave(hovered.current);
      if (newHovered !== -1) onEnter(newHovered);

      hovered.current = newHovered;
    };

    const current = base.current;

    current?.addEventListener("pointermove", handle);
    return () => current?.removeEventListener("pointermove", handle);
  }, [ctx, paths, onEnter, base, onLeave]);
}
