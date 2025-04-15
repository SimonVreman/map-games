import {
  chevronPatterns,
  europeanChevrons,
} from "@/lib/mapping/countries/chevrons";

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
          fill={background}
          strokeWidth="0"
        />
        <path
          d="M 25 20 L 45 50 L 25 80 L 55 80 L 75 50 L 55 20 z"
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
        viewBox="0 0 1500 100"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="1500"
          height="100"
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
        viewBox="0 0 1500 200"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="1500"
          height="100"
          fill={`url(#${colors.split(",")[0] + "-base"})`}
        />
        <rect
          x="0"
          y="100"
          width="10000"
          height="100"
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
        viewBox="0 0 1500 300"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMinYMin slice"
      >
        <rect
          x="0"
          y="0"
          width="1500"
          height="100"
          fill={`url(#${colors.split(",")[0] + "-base"})`}
        />
        <rect
          x="0"
          y="100"
          width="10000"
          height="100"
          fill={`url(#${colors.split(",")[1] + "-base"})`}
        />
        <rect
          x="0"
          y="200"
          width="10000"
          height="100"
          fill={`url(#${colors.split(",")[2] + "-base"})`}
        />
      </pattern>
    ))}
  </>
);
