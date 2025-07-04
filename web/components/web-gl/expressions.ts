import { ExpressionInputType, ExpressionSpecification } from "maplibre-gl";

type R = ExpressionSpecification;
type I = ExpressionInputType | R;

export const expressions = {
  theme: (light: I, dark: I): R => [
    "case",
    ["==", ["global-state", "theme"], "light"],
    light,
    dark,
  ],
};
