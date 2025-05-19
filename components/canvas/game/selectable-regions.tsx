import { useEffect, useRef } from "react";
import { useCanvas } from "../canvas-provider";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { pathsHovered, twColor, twFont } from "../utils";
import { Renderer } from "../types";

const rendererKey = "selectable-regions";

// trigger tailwind to generate the colors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _colors = [
  "fill-orange-200",
  "fill-lime-200",
  "fill-emerald-200",
  "fill-cyan-200",
  "fill-blue-200",
  "fill-violet-200",
  "fill-fuchsia-200",
  "fill-rose-200",
  "fill-orange-100",
  "fill-lime-100",
  "fill-emerald-100",
  "fill-cyan-100",
  "fill-blue-100",
  "fill-violet-100",
  "fill-fuchsia-100",
  "fill-rose-100",
];

const colors = [
  "orange-200",
  "lime-200",
  "emerald-200",
  "cyan-200",
  "blue-200",
  "violet-200",
  "fuchsia-200",
  "rose-200",
  "orange-100",
  "lime-100",
  "emerald-100",
  "cyan-100",
  "blue-100",
  "violet-100",
  "fuchsia-100",
  "rose-100",
];

export function SelectableRegions({
  regions,
  firstAdministrative = [],
  country = [],
  divider = [],
  onClick,
  highlighted,
  hints,
  getCodeGroup,
}: {
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
  const {
    addRenderer,
    removeRenderer,
    ctx,
    update,
    refs: { canvas },
  } = useCanvas();
  const hoveredRegion = useRef<number>(-1);

  const groups = regions.map(({ codes }) => getCodeGroup(codes));
  const uniqueGroups = [...new Set(groups)].sort();

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

    const current = canvas.current;

    window.addEventListener("pointermove", handleMouseMove);
    current?.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      current?.removeEventListener("click", handleClick);
    };
  }, [ctx, onClick, regions, update, canvas]);

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
        if (hints) {
          const index = uniqueGroups.indexOf(getCodeGroup(codes));
          fill = colors[index % colors.length];
        } else if (isPositive) {
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

      ctx.fillStyle = twColor("neutral-950");
      ctx.font = `${scale * 20}px ${twFont("sans")}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const labelsVisible = hints
        ? regions
        : highlighted.correctCode != null || highlighted.incorrectKey != null
        ? regions.filter(
            ({ codes }) =>
              codes.some((c) => c === highlighted.correctCode) ||
              codes.join(",") === highlighted.incorrectKey
          )
        : [];

      for (const { codes, center } of labelsVisible)
        ctx.fillText(codes.join("/"), center[0], center[1]);
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
    hints,
    getCodeGroup,
    uniqueGroups,
  ]);

  return null;
}
