import { useCanvas } from "@/components/canvas/canvas-provider";
import { pathsHovered } from "@/components/canvas/utils";
import { useEffect } from "react";

export function usePathsClicked<TItem extends { paths: string[] }>({
  items,
  onClick,
}: {
  items: TItem[];
  onClick: (item: TItem) => void;
}) {
  const {
    ctxs: [ctx],
    refs: { base },
  } = useCanvas();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!ctx) return;

      const clicked = items.findLast(({ paths }) =>
        pathsHovered({ paths, ctx, clientX, clientY })
      );

      if (clicked) onClick(clicked);
    };

    const current = base.current;

    current?.addEventListener("click", handleClick);
    return () => {
      current?.removeEventListener("click", handleClick);
    };
  }, [ctx, onClick, base, items]);
}
