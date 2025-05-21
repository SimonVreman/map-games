import { useCanvas } from "@/components/canvas/canvas-provider";
import { pathsHovered } from "@/components/canvas/utils";
import { useEffect } from "react";

export function usePathsClicked({
  paths,
  onClick,
}: {
  paths: Path2D[][];
  onClick: (index: number) => void;
}) {
  const {
    ctxs: [ctx],
    refs: { base },
  } = useCanvas();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!ctx) return;

      const clicked = paths.findIndex((subpaths) =>
        pathsHovered({ paths: subpaths, ctx, clientX, clientY })
      );

      if (clicked !== -1) onClick(clicked);
    };

    const current = base.current;

    current?.addEventListener("click", handleClick);
    return () => {
      current?.removeEventListener("click", handleClick);
    };
  }, [ctx, onClick, base, paths]);
}
