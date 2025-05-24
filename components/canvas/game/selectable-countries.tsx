import { twColor } from "../utils";
import { Renderer } from "../types";
import { usePathsClicked } from "@/lib/hooks/use-paths-clicked";
import { useDynamicFill } from "@/lib/hooks/use-dynamic-fill";
import { useCallback } from "react";

type Country = {
  name: string;
  paths: Path2D[];
  subjects: string[];
  meta: {
    north: number;
    south: number;
    west: number;
    east: number;
    x: number;
    y: number;
  };
};

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

const baseKey = "selectable-countries";
const renderKeys = {
  countries: { key: baseKey + ":countries", order: 0, layer: 0 },
  country: { key: baseKey + ":country", order: 1, layer: 0 },
  labels: { key: baseKey + ":labels", order: 0, layer: 1 },
} as const;

function getCountryColor({
  hovered,
  group,
  highlighted,
}: {
  hovered: boolean;
  group: number;
  highlighted: boolean;
}) {
  if (highlighted) return twColor(colors[group % colors.length]);

  return hovered
    ? twColor("neutral-600", "neutral-400")
    : twColor("white", "neutral-900");
}

const countryRenderer =
  ({ paths }: Country): Renderer =>
  ({ ctx, scale }) => {
    ctx.strokeStyle = twColor("neutral-300", "neutral-700");
    ctx.lineWidth = scale;
    ctx.lineJoin = "round";
    for (const path of paths) {
      ctx.fill(path);
      ctx.stroke(path);
    }
  };

export function SelectableCountries({
  countries,
  isHighlighted,
  onClick,
}: {
  countries: DeepReadonly<Country[]>;
  isHighlighted: (name: string) => boolean;
  onClick: (name: string) => void;
}) {
  const currentCountryColor = useCallback(
    (country: Country, hovered: boolean) => {
      return getCountryColor({
        highlighted: isHighlighted(country.name),
        group: country.name.charCodeAt(0) % colors.length,
        hovered,
      });
    },
    [isHighlighted]
  );

  useDynamicFill({
    key: renderKeys.countries,
    items: countries as Country[],
    renderer: countryRenderer,
    getColor: currentCountryColor,
  });

  usePathsClicked({
    items: countries as Country[],
    onClick: ({ name }) => onClick(name),
  });

  return null;
}
