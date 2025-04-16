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
          d="M 2.5 2.0 L 4.5 5.0 L 2.5 8.0 L 5.5 8.0 L 7.5 5.0 L 5.5 2.0 z"
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
        viewBox="0 0 150 10"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="150"
          height="10"
          fill={`url(#${name + "-base"})`}
        />
      </pattern>
    ))}
    {doublePatterns.map((colors) => (
      <pattern
        key={colors}
        id={colors}
        width="1"
        height=".6"
        viewBox="0 0 150 20"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="150"
          height="10"
          fill={`url(#${colors.split(",")[0] + "-base"})`}
        />
        <rect
          x="0"
          y="10"
          width="150"
          height="10"
          fill={`url(#${colors.split(",")[1] + "-base"})`}
        />
      </pattern>
    ))}
    {triplePatterns.map((colors) => (
      <pattern
        key={colors}
        id={colors}
        width="1"
        height=".9"
        viewBox="0 0 150 30"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="150"
          height="10"
          fill={`url(#${colors.split(",")[0] + "-base"})`}
        />
        <rect
          x="0"
          y="10"
          width="150"
          height="10"
          fill={`url(#${colors.split(",")[1] + "-base"})`}
        />
        <rect
          x="0"
          y="20"
          width="150"
          height="10"
          fill={`url(#${colors.split(",")[2] + "-base"})`}
        />
      </pattern>
    ))}
  </>
);
