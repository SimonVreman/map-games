import { useEffect, useMemo } from "react";
import { useCanvas } from "../canvas-provider";
import { SinglePinSlice } from "@/lib/store/slice/single-pin";
import { twColor, twFont } from "../utils";
import { Renderer } from "../types";
import { fadeFill } from "../animation";
import { useAnimations } from "@/lib/hooks/use-animations";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { usePathsHovered } from "@/lib/hooks/use-paths-hovered";

// trigger tailwind to generate the colors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _colors = ["fill-neutral-600"];

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

const baseKey = "selectable-regions";
const renderEntry = {
  regions: { key: baseKey + ":regions", order: 0, layer: 0 },
  country: { key: baseKey + ":country", order: 1, layer: 0 },
  labels: { key: baseKey + ":labels", order: 0, layer: 1 },
} as const;

// TODO might end up missing labels even at max zoom
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

function getRegionColor({
  positive,
  negative,
  hovered,
  group,
  hints,
}: {
  positive: boolean;
  negative: boolean;
  hovered: boolean;
  hints: boolean;
  group: number;
}) {
  if (hints) {
    return colors[group % colors.length];
  } else if (positive) {
    return hovered ? "green-400" : "green-200";
  } else if (negative) {
    return hovered ? "red-400" : "red-300";
  }

  return hovered ? "neutral-600" : "white";
}

const regionRenderer =
  ({ paths }: { paths: Path2D[] }): Renderer =>
  ({ ctx, scale }) => {
    ctx.strokeStyle = twColor("neutral-200");
    ctx.lineWidth = scale;
    for (const path of paths) {
      ctx.fill(path);
      ctx.stroke(path);
    }
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
  const { addRenderer, removeRenderer, update } = useCanvas();
  const { getActiveAnimations, startAnimation } = useAnimations();

  const regionPaths = useMemo(() => regions.map((r) => r.paths), [regions]);

  usePathsClicked({
    paths: regionPaths,
    onClick: (i) => onClick(regions[i].codes),
  });

  usePathsHovered({
    paths: regionPaths,
    onEnter: (i) => {
      const render = regionRenderer({ paths: regions[i].paths });
      const entry = renderEntry.regions;

      return startAnimation({
        animation: fadeFill({ subject: i, from: "white", to: "neutral-600" }),
        render: (...args) => {
          render(...args);
          update(entry.layer, entry.order + 1);
        },
      });
    },
    onLeave: (i) => {
      const render = regionRenderer({ paths: regions[i].paths });
      const entry = renderEntry.regions;

      return startAnimation({
        animation: fadeFill({ subject: i, from: "neutral-600", to: "white" }),
        render: (...args) => {
          render(...args);
          update(entry.layer, entry.order + 1);
        },
      });
    },
  });

  /*
    Animate region fill color changing
  */

  /*
    Regions renderer
  */
  useEffect(() => {
    const entry = renderEntry.regions;
    const render: Renderer = ({ ctx, scale }) => {
      const active = getActiveAnimations();
      ctx.fillStyle = twColor("white");

      for (let i = 0; i < regions.length; i++) {
        if (active.includes(i)) continue;
        const paths = regions[i].paths;
        regionRenderer({ paths })({ ctx, scale });
      }
    };

    addRenderer(entry.layer, { render, ...entry });
    return () => removeRenderer(entry.layer, entry.key);
  }, [addRenderer, removeRenderer, regions, getActiveAnimations]);

  /*
    Country outlines renderer
  */
  useEffect(() => {
    const entry = renderEntry.country;
    const render: Renderer = ({ ctx, scale }) => {
      ctx.strokeStyle = twColor("neutral-200");
      ctx.lineWidth = scale * 2;
      for (const path of country) ctx.stroke(path);
      for (const path of firstAdministrative) ctx.stroke(path);

      ctx.strokeStyle = twColor("neutral-300");
      ctx.setLineDash([scale * 5, scale * 5]);
      for (const path of divider) ctx.stroke(path);
      ctx.setLineDash([]);
    };

    addRenderer(entry.layer, { render, ...entry });
    return () => removeRenderer(entry.layer, entry.key);
  }, [country, divider, firstAdministrative, addRenderer, removeRenderer]);

  /*
    Labels renderer
  */
  useEffect(() => {
    const entry = renderEntry.labels;
    const render: Renderer = ({ ctx, scale }) => {
      const fontSize = 20 * scale;
      const lineHeight = fontSize * 1.2;
      ctx.fillStyle = twColor("neutral-950");
      ctx.font = `${fontSize}px ${twFont("sans")}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const visible = regions.filter(
        ({ codes }) =>
          hints ||
          (highlighted.correctCode != null &&
            codes.some((c) => c === highlighted.correctCode)) ||
          (highlighted.incorrectKey != null &&
            codes.join(",") === highlighted.incorrectKey)
      );

      const placeable = getPlaceableLabels({
        regions: visible,
        lineHeight,
        ctx,
      });

      for (const { label, x, y } of placeable) ctx.fillText(label, x, y);
    };

    addRenderer(entry.layer, { render, ...entry });
    return () => removeRenderer(entry.layer, entry.key);
  }, [regions, addRenderer, removeRenderer, highlighted, hints]);

  return null;
}
