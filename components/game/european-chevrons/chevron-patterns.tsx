import {
  chevronPatterns,
  europeanChevrons,
} from "@/lib/mapping/countries/registry/chevrons";

const doublePatterns = europeanChevrons
  .filter((v) => v.subjects.length === 2)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

const triplePatterns = europeanChevrons
  .filter((v) => v.subjects.length === 3)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

const colors = {
  black: { stroke: "stroke-neutral-950", fill: "fill-neutral-950" },
  blue: { stroke: "stroke-blue-500", fill: "fill-blue-500" },
  red: { stroke: "stroke-red-600", fill: "fill-red-600" },
  yellow: { stroke: "stroke-yellow-400", fill: "fill-yellow-400" },
  white: { stroke: "stroke-neutral-50", fill: "fill-neutral-50" },
};

type PatternName = (typeof chevronPatterns)[number]["name"];

const backgroundForPattern = chevronPatterns.reduce(
  (acc, { name, background }) => ({ ...acc, [name]: background }),
  {} as Record<PatternName, keyof typeof colors>
);

export const svgChevronPatterns = (
  <>
    {chevronPatterns.map(({ name, background, foreground }) => (
      <pattern
        key={name + "-base"}
        id={name + "-base"}
        width="100"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          className={colors[background].fill}
          strokeWidth={0}
        />
        <path
          d="M 25 20 L 45 50 L 25 80 L 55 80 L 75 50 L 55 20 z"
          className={colors[foreground].fill}
          strokeWidth={0}
        />
      </pattern>
    ))}
    {chevronPatterns.map(({ name, background }) => (
      <pattern
        key={name}
        id={name}
        width="1"
        height=".333"
        viewBox="0 0 1500 100"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
        strokeWidth={0.5}
      >
        <rect
          x="0"
          y="0"
          width="1500"
          height="100"
          className={colors[background].stroke}
          fill={`url(#${name}-base)`}
        />
      </pattern>
    ))}
    {doublePatterns.map((types) => {
      const [first, second] = types.split(",") as PatternName[];

      return (
        <pattern
          key={types}
          id={types}
          width="1"
          height=".6"
          viewBox="0 0 1500 200"
          patternUnits="objectBoundingBox"
          patternContentUnits="userSpaceOnUse"
          preserveAspectRatio="xMinYMin slice"
          strokeWidth={0.5}
        >
          <rect
            x="0"
            y="0"
            width="1500"
            height="100"
            fill={`url(#${first}-base)`}
            className={colors[backgroundForPattern[first]].stroke}
          />
          <rect
            x="0"
            y="100"
            width="1500"
            height="100"
            fill={`url(#${second}-base)`}
            className={colors[backgroundForPattern[second]].stroke}
          />
        </pattern>
      );
    })}
    {triplePatterns.map((types) => {
      const [first, second, third] = types.split(",") as PatternName[];

      return (
        <pattern
          key={types}
          id={types}
          width="1"
          height=".9"
          viewBox="0 0 1500 300"
          patternUnits="objectBoundingBox"
          patternContentUnits="userSpaceOnUse"
          preserveAspectRatio="xMinYMin slice"
          strokeWidth={0.5}
        >
          <rect
            x="0"
            y="0"
            width="1500"
            height="100"
            fill={`url(#${first}-base)`}
            className={colors[backgroundForPattern[first]].stroke}
          />
          <rect
            x="0"
            y="100"
            width="1500"
            height="100"
            fill={`url(#${second}-base)`}
            className={colors[backgroundForPattern[second]].stroke}
          />
          <rect
            x="0"
            y="200"
            width="1500"
            height="100"
            fill={`url(#${third}-base)`}
            className={colors[backgroundForPattern[third]].stroke}
          />
        </pattern>
      );
    })}
  </>
);
