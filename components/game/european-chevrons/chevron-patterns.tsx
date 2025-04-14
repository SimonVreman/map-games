import {
  chevronPatterns,
  europeanChevrons,
} from "@/lib/mapping/countries/chevrons";

const doublePatterns = europeanChevrons
  .filter((v) => v.colors.length > 1)
  .map((v) => v.colors);

export const svgChevronPatterns = (
  <>
    {chevronPatterns.map(({ name, background, foreground }) => (
      <pattern
        key={name + "-base"}
        id={name + "-base"}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        preserveAspectRatio="xMidYMid slice"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width="10"
          height="10"
          fill={background}
          strokeWidth="0"
        />
        <path
          d="M 2.5 2 L 4.5 5 L 2.5 8 L 5.5 8 L 7.5 5 L 5.5 2 z"
          fill={foreground}
          strokeWidth={0}
        />
      </pattern>
    ))}
    {chevronPatterns.map(({ name }) => (
      <pattern
        key={name}
        id={name}
        width="1"
        height=".3"
        viewBox="0 0 1000 10"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="1000"
          height="10"
          fill={`url(#${name + "-base"})`}
        />
      </pattern>
    ))}
    {doublePatterns.map((colors) => (
      <pattern
        key={colors.join(",")}
        id={colors.join(",")}
        width="1"
        height=".6"
        viewBox="0 0 1000 20"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="1000"
          height="10"
          fill={`url(#${colors[0] + "-base"})`}
        />
        <rect
          x="0"
          y="10"
          width="1000"
          height="10"
          fill={`url(#${colors[1] + "-base"})`}
        />
      </pattern>
    ))}
  </>
);
