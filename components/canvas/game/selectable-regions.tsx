import { useEffect, useRef } from "react";
import { useCanvas } from "../canvas-provider";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { pathsHovered, twColor, twFont } from "../utils";
import { CanvasAnimation, Renderer } from "../types";
import {
  interpolate,
  useMode as applyMode,
  modeOklch,
  formatCss,
} from "culori/fn";

const rendererKey = "selectable-regions";

// trigger tailwind to generate the colors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _colors = [
  "fill-chart-1",
  "fill-chart-2",
  "fill-chart-3",
  "fill-chart-4",
  "fill-chart-5",
  "fill-chart-6",
  "fill-chart-7",
  "fill-chart-8",
  "fill-chart-9",
  "fill-chart-10",
  "fill-neutral-600",
];

const colors = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
  "chart-7",
  "chart-8",
  "chart-9",
  "chart-10",
];

function getPlaceableLabels({
  regions,
  lineHeight,
  ctx,
}: {
  regions: { codes: number[]; center: number[]; area: number }[];
  lineHeight: number;
  ctx: CanvasRenderingContext2D;
}) {
  const labels = regions.map(({ codes, center, area }) => {
    const label = codes.join("/");
    const width = ctx.measureText(label).width;
    const height = lineHeight;
    return { label, x: center[0], y: center[1], width, height, area };
  });

  // Filter out labels that overlap, give priority to the ones with the largest area
  return labels.filter(
    (a) =>
      !labels.some((b) => {
        if (a === b || a.area > b.area) return false;
        return (
          a.x - a.width / 2 < b.x + b.width / 2 &&
          a.x + a.width / 2 > b.x - b.width / 2 &&
          a.y - a.height / 2 < b.y + b.height / 2 &&
          a.y + a.height / 2 > b.y - b.height / 2
        );
      })
  );
}

const oklch = applyMode(modeOklch);

const animate =
  ({
    animation,
    paths,
    ctx,
  }: {
    animation: CanvasAnimation;
    paths: Path2D[];
    ctx: CanvasRenderingContext2D;
  }) =>
  (timestamp: number) => {
    const { start, end } = animation.timestamp;
    const t = Math.min((timestamp - start) / (end - start), 1);

    if (animation.fill) {
      const { from, to } = animation.fill;

      const current = interpolate([from, to], "oklch")(t);
      animation.fill.current = current;
      ctx.fillStyle = formatCss(current);

      for (const path of paths) ctx.fill(path);
    }

    if (t < 1)
      animation.raf = requestAnimationFrame(animate({ animation, paths, ctx }));
    //TODO should remove the animation from the animations ref
  };

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
  const animations = useRef<Record<number, CanvasAnimation>>({});

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
        if (hoveredRegion.current !== -1) {
          const start = (document.timeline.currentTime ??
            performance.now()) as number;

          const out = {
            fill: {
              from: oklch(twColor("neutral-600"))!,
              current: oklch(twColor("neutral-600"))!,
              to: oklch(twColor("white"))!,
            },
            timestamp: { start, end: start + 200 },
          };

          animations.current[hoveredRegion.current] = out;

          requestAnimationFrame(
            animate({
              ctx,
              animation: out,
              paths: regions[hoveredRegion.current].paths,
            })
          );
        }

        hoveredRegion.current = newHovered;

        if (hoveredRegion.current !== -1) {
          const start = (document.timeline.currentTime ??
            performance.now()) as number;

          const out = {
            fill: {
              from: oklch(twColor("white"))!,
              current: oklch(twColor("white"))!,
              to: oklch(twColor("neutral-600"))!,
            },
            timestamp: { start, end: start + 200 },
          };

          animations.current[hoveredRegion.current] = out;

          requestAnimationFrame(
            animate({
              ctx,
              animation: out,
              paths: regions[hoveredRegion.current].paths,
            })
          );
        }

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
        const isHovered = false; // i === hoveredRegion.current;

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

      const fontSize = 20 * scale;
      const lineHeight = fontSize * 1.2;
      ctx.fillStyle = twColor("neutral-950");
      ctx.font = `${fontSize}px ${twFont("sans")}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const visible = hints
        ? regions
        : highlighted.correctCode != null || highlighted.incorrectKey != null
        ? regions.filter(
            ({ codes }) =>
              codes.some((c) => c === highlighted.correctCode) ||
              codes.join(",") === highlighted.incorrectKey
          )
        : [];

      const placeable = getPlaceableLabels({
        regions: visible,
        lineHeight,
        ctx,
      });

      for (const { label, x, y } of placeable) ctx.fillText(label, x, y);
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
