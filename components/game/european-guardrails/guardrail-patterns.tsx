import {
  europeanGuardrails,
  guardrailTypes,
} from "@/lib/mapping/countries/registry/guardrails";

const paths = {
  "A-profile": (
    <g width="1002" height="152" viewBox="0 0 1002 152" fill="none">
      <path
        d="M1001 1L1 47.1111V151L1001 104.889V1Z"
        fill="url(#paint0_linear_6_3)"
        stroke="#666666"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_3"
          x1="419.605"
          y1="28.7778"
          x2="424.345"
          y2="130.894"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#999999" />
          <stop offset="0.02" stopColor="#D9D9D9" />
          <stop offset="0.161542" stopColor="#D9D9D9" />
          <stop offset="0.33" stopColor="#999999" />
          <stop offset="0.376177" stopColor="#999999" />
          <stop offset="0.44" stopColor="#666666" />
          <stop offset="0.53" stopColor="#999999" />
          <stop offset="0.556907" stopColor="#999999" />
          <stop offset="0.634174" stopColor="#CCCCCC" />
          <stop offset="0.787729" stopColor="#CCCCCC" />
          <stop offset="0.9375" stopColor="#999999" />
        </linearGradient>
      </defs>
    </g>
  ),

  "B-profile": (
    <g width="1002" height="152" viewBox="0 0 1002 152" fill="none">
      <path
        d="M998.913 1.09089L2.91742 44.4649C1.84591 44.5116 1.00196 45.3951 1.00444 46.4676L1.24601 150.989L999.087 107.535C1000.16 107.488 1001 106.608 1001 105.537V3.08899C1001 1.95027 1000.05 1.04134 998.913 1.09089Z"
        fill="url(#paint0_linear_6_6)"
      />
      <path
        d="M1 151L1.24601 150.989M1.24601 150.989L999.087 107.535C1000.16 107.488 1001 106.608 1001 105.537V3.08899C1001 1.95027 1000.05 1.04134 998.913 1.09089L2.91742 44.4649C1.84591 44.5116 1.00196 45.3951 1.00444 46.4676L1.24601 150.989Z"
        stroke="#666666"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_6"
          x1="392.652"
          y1="28.1355"
          x2="397.2"
          y2="133.972"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="0.03" stopColor="#E6E6E6" />
          <stop offset="0.04" stopColor="#A6A6A6" />
          <stop offset="0.32" stopColor="#A6A6A6" />
          <stop offset="0.34" stopColor="#666666" />
          <stop offset="0.52" stopColor="#666666" />
          <stop offset="0.56" stopColor="#CCCCCC" />
          <stop offset="0.66" stopColor="#CCCCCC" />
          <stop offset="0.68" stopColor="#A6A6A6" />
          <stop offset="0.98" stopColor="#A6A6A6" />
          <stop offset="1" stopColor="#333333" />
        </linearGradient>
      </defs>
    </g>
  ),
  "B-profile-thin": (
    <g width="1002" height="152" viewBox="0 0 1002 152" fill="none">
      <path
        d="M1001 1L1 44.5484V151L1001 107.452V1Z"
        fill="url(#paint0_linear_6_10)"
        stroke="#666666"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_10"
          x1="392.652"
          y1="28.1355"
          x2="397.2"
          y2="133.972"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="0.03" stopColor="#E6E6E6" />
          <stop offset="0.04" stopColor="#A6A6A6" />
          <stop offset="0.23" stopColor="#A6A6A6" />
          <stop offset="0.26" stopColor="#666666" />
          <stop offset="0.41187" stopColor="#8C8C8C" />
          <stop offset="0.68" stopColor="#999999" />
          <stop offset="0.71" stopColor="#CCCCCC" />
          <stop offset="0.78" stopColor="#CCCCCC" />
          <stop offset="0.81" stopColor="#A6A6A6" />
          <stop offset="0.98" stopColor="#A6A6A6" />
          <stop offset="1" stopColor="#333333" />
        </linearGradient>
      </defs>
    </g>
  ),
} as const;

const colorsForPedestrians = {
  "A-profile": { fill: "fill-chart-1/50", stroke: "stroke-chart-1/50" },
  "B-profile": { fill: "fill-chart-2/50", stroke: "stroke-chart-2/50" },
  "B-profile-thin": { fill: "fill-chart-3/50", stroke: "stroke-chart-3/50" },
} as const;

const doubleTypes = europeanGuardrails
  .filter((v) => v.subjects.length === 2)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

export const svgGuardrailPatterns = (
  <>
    {guardrailTypes.map(({ name }) => (
      <pattern
        key={name + "-base"}
        id={name + "-base"}
        width="1002"
        height="152"
        viewBox="0 0 1002 152"
        preserveAspectRatio="xMidYMid meet"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width="1002"
          height="152"
          strokeWidth={0}
          className={colorsForPedestrians[name].fill}
        />
        {paths[name]}
      </pattern>
    ))}
    {guardrailTypes.map(({ name }) => (
      <pattern
        key={name}
        id={name}
        width="1"
        height="1"
        viewBox="0 0 1002 456"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid slice"
        // TODO restore strokeWidth (opacity issue)
        strokeWidth={0}
      >
        <rect
          width="1002"
          height="152"
          className={colorsForPedestrians[name].fill}
        />
        <rect
          x="0"
          y="152"
          width="1002"
          height="152"
          fill={`url(#${name + "-base"})`}
          className={colorsForPedestrians[name].stroke}
        />
        <rect
          width="1002"
          y="304"
          height="152"
          className={colorsForPedestrians[name].fill}
        />
      </pattern>
    ))}
    {doubleTypes.map((types) => {
      const [first, second] = types.split(",") as (keyof typeof paths)[];

      return (
        <pattern
          key={types}
          id={types}
          width="1"
          height="1"
          viewBox="0 0 1002 608"
          patternUnits="objectBoundingBox"
          patternContentUnits="userSpaceOnUse"
          preserveAspectRatio="xMidYMid slice"
          strokeWidth={0}
        >
          <rect
            width="1002"
            height="152"
            className={colorsForPedestrians[second].fill}
          />
          <rect
            x="0"
            y="152"
            width="1002"
            height="152"
            fill={`url(#${first}-base)`}
            className={colorsForPedestrians[first].stroke}
          />
          <rect
            x="0"
            y="304"
            width="1002"
            height="152"
            fill={`url(#${second}-base)`}
            className={colorsForPedestrians[second].stroke}
          />
          <rect
            width="1002"
            y="456"
            height="152"
            className={colorsForPedestrians[first].fill}
          />
        </pattern>
      );
    })}
  </>
);
