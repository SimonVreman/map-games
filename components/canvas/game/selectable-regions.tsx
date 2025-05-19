import { useEffect, useRef } from "react";
import { useCanvas } from "../canvas-provider";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { pathsHovered, twColor } from "../utils";
import { Renderer } from "../types";

const rendererKey = "selectable-regions";

export function SelectableRegions({
  regions,
  firstAdministrative = [],
  country = [],
  divider = [],
  onClick,
  highlighted,
}: // hints,
// getCodeGroup,
{
  regions: {
    codes: number[];
    area: number;
    center: number[];
    paths: Path2D[];
  }[];
  firstAdministrative?: Path2D[];
  country?: Path2D[];
  divider?: Path2D[];
  getCodeGroup: (codes: number[]) => string;
  onClick: (codes: number[]) => void;
} & Pick<SinglePinSlice, "hints" | "highlighted">) {
  const { addRenderer, removeRenderer, ctx, update } = useCanvas();
  const hoveredRegion = useRef<number>(-1);

  useEffect(() => {
    const handleMouseMove = (e: PointerEvent) => {
      if (!ctx || e.pointerType !== "mouse") return;
      const { clientX, clientY } = e;

      const newHovered = regions.findIndex(({ paths }) =>
        pathsHovered({ paths, ctx, clientX, clientY })
      );

      if (hoveredRegion.current !== newHovered) {
        hoveredRegion.current = newHovered;
        update();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!ctx) return;

      const clicked = regions.find(({ paths }) =>
        pathsHovered({ paths, ctx, clientX, clientY })
      );

      if (clicked) onClick(clicked.codes);
    };

    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [ctx, onClick, regions, update]);

  useEffect(() => {
    const renderer: Renderer = ({ ctx, scale }) => {
      ctx.strokeStyle = twColor("neutral-200");
      ctx.lineWidth = scale;

      for (let i = 0; i < regions.length; i++) {
        const { paths, codes } = regions[i];

        const isPositive =
          highlighted.correctCode != null &&
          codes.includes(highlighted.correctCode);
        const isNegative =
          highlighted.incorrectKey != null &&
          codes.join(",") === highlighted.incorrectKey;
        const isHovered = i === hoveredRegion.current;

        let fill;
        if (isPositive) {
          fill = isHovered ? "green-400" : "green-200";
        } else if (isNegative) {
          fill = isHovered ? "red-400" : "red-300";
        } else {
          fill = isHovered ? "neutral-600" : "white";
        }

        ctx.fillStyle = twColor(fill);

        for (const path of paths) {
          ctx.fill(path);
          ctx.stroke(path);
        }
      }

      ctx.lineWidth = scale * 2;

      for (const path of country) ctx.stroke(path);
      for (const path of firstAdministrative) ctx.stroke(path);

      ctx.strokeStyle = twColor("neutral-300");
      ctx.setLineDash([scale * 5, scale * 5]);

      for (const path of divider) ctx.stroke(path);

      ctx.setLineDash([]);
    };

    addRenderer(rendererKey, renderer);

    return () => {
      removeRenderer(rendererKey);
    };
  }, [
    country,
    divider,
    firstAdministrative,
    regions,
    hoveredRegion,
    addRenderer,
    removeRenderer,
    highlighted,
  ]);

  return null;
}
