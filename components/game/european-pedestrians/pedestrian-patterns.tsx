import {
  europeanPedestrians,
  pedestrianTypes,
} from "@/lib/mapping/countries/registry/pedestrians";

const ball = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <mask id="path-1-inside-1_9_2" fill="white">
      <path d="M92.5 98.5H107.5V128.5H92.5V98.5Z" />
    </mask>
    <path d="M92.5 98.5H107.5V128.5H92.5V98.5Z" fill="black" />
    <path
      d="M92.5 98.5V96.5H90.5V98.5H92.5ZM107.5 98.5H109.5V96.5H107.5V98.5ZM107.5 128.5V130.5H109.5V128.5H107.5ZM92.5 128.5H90.5V130.5H92.5V128.5ZM92.5 100.5H107.5V96.5H92.5V100.5ZM105.5 98.5V128.5H109.5V98.5H105.5ZM107.5 126.5H92.5V130.5H107.5V126.5ZM94.5 128.5V98.5H90.5V128.5H94.5Z"
      fill="black"
      mask="url(#path-1-inside-1_9_2)"
    />
    <mask id="path-3-inside-2_9_2" fill="white">
      <path d="M92.5 158.5H107.5V188.5H92.5V158.5Z" />
    </mask>
    <path d="M92.5 158.5H107.5V188.5H92.5V158.5Z" fill="black" />
    <path
      d="M92.5 158.5V156.5H90.5V158.5H92.5ZM107.5 158.5H109.5V156.5H107.5V158.5ZM107.5 188.5V190.5H109.5V188.5H107.5ZM92.5 188.5H90.5V190.5H92.5V188.5ZM92.5 160.5H107.5V156.5H92.5V160.5ZM105.5 158.5V188.5H109.5V158.5H105.5ZM107.5 186.5H92.5V190.5H107.5V186.5ZM94.5 188.5V158.5H90.5V188.5H94.5Z"
      fill="black"
      mask="url(#path-3-inside-2_9_2)"
    />
    <mask id="path-5-inside-3_9_2" fill="white">
      <path d="M92.5 128.5H107.5V158.5H92.5V128.5Z" />
    </mask>
    <path d="M92.5 128.5H107.5V158.5H92.5V128.5Z" fill="white" />
    <path
      d="M92.5 128.5V126.5H90.5V128.5H92.5ZM107.5 128.5H109.5V126.5H107.5V128.5ZM107.5 158.5V160.5H109.5V158.5H107.5ZM92.5 158.5H90.5V160.5H92.5V158.5ZM92.5 130.5H107.5V126.5H92.5V130.5ZM105.5 128.5V158.5H109.5V128.5H105.5ZM107.5 156.5H92.5V160.5H107.5V156.5ZM94.5 158.5V128.5H90.5V158.5H94.5Z"
      fill="black"
      mask="url(#path-5-inside-3_9_2)"
    />
    <mask id="path-7-inside-4_9_2" fill="white">
      <path d="M92.5 188.5H107.5V200H92.5V188.5Z" />
    </mask>
    <path d="M92.5 188.5H107.5V200H92.5V188.5Z" fill="white" />
    <path
      d="M92.5 188.5V186.5H90.5V188.5H92.5ZM107.5 188.5H109.5V186.5H107.5V188.5ZM107.5 200V202H109.5V200H107.5ZM92.5 200H90.5V202H92.5V200ZM92.5 190.5H107.5V186.5H92.5V190.5ZM105.5 188.5V200H109.5V188.5H105.5ZM107.5 198H92.5V202H107.5V198ZM94.5 200V188.5H90.5V200H94.5Z"
      fill="black"
      mask="url(#path-7-inside-4_9_2)"
    />
    <circle
      cx="100"
      cy="70"
      r="29"
      fill="#FBAC01"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesNone = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M166 78H34V82H166V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M166 118H34V122H166V118Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesThree = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M108 78H92V122H108V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M150 78H134V122H150V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M66 78H50V122H66V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesFour = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M91 78H75V122H91V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M57 78H41V122H57V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M159 78H143V122H159V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M125 78H109V122H125V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesFive = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M107 78H93V122H107V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M79 78H65V122H79V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M51 78H37V122H51V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M135 78H121V122H135V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M163 78H149V122H163V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesSix = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M118 78H106V122H118V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M94 78H82V122H94V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M166 78H154V122H166V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M142 78H130V122H142V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M70 78H58V122H70V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M46 78H34V122H46V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesSeven = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M105 78H95V122H105V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M86 78H76V122H86V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M67 78H57V122H67V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M48 78H38V122H48V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M162 78H152V122H162V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M143 78H133V122H143V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M124 78H114V122H124V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesEight = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M112 78H104V122H112V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M95 78H87V122H95V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M78 78H70V122H78V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M61 78H53V122H61V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M44 78H36V122H44V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M163 78H155V122H163V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M146 78H138V122H146V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M129 78H121V122H129V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const stripesTwelve = (
  <g width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path
      d="M86 78H80V122H86V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M75 78H69V122H75V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M64 78H58V122H64V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M53 78H47V122H53V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M42 78H36V122H42V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M119 78H113V122H119V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M108 78H102V122H108V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M97 78H91V122H97V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M130 78H124V122H130V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M163 78H157V122H163V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M152 78H146V122H152V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M141 78H135V122H141V78Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const doubleTypes = europeanPedestrians
  .filter((v) => v.subjects.length === 2)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

const tripleTypes = europeanPedestrians
  .filter((v) => v.subjects.length === 3)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

const quadrupleTypes = europeanPedestrians
  .filter((v) => v.subjects.length === 4)
  .map((v) => v.subjects.join(","))
  .filter((v, i, a) => a.indexOf(v) === i);

const colorsForPedestrians = {
  None: "fill-chart-1/50",
  Three: "fill-chart-2/50",
  Four: "fill-chart-3/50",
  Five: "fill-chart-4/50",
  Six: "fill-chart-1/30",
  Seven: "fill-chart-2/30",
  Eight: "fill-chart-3/30",
  Twelve: "fill-chart-4/30",
  Ball: "fill-chart-1/10",
};

export const svgPedestrianPatterns = (
  <>
    {pedestrianTypes.map(({ name }) => (
      <pattern
        key={name + "-base"}
        id={name + "-base"}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
        patternUnits="userSpaceOnUse"
      >
        <rect width="200" height="200" className={colorsForPedestrians[name]} />
        {name === "Ball"
          ? ball
          : name === "None"
          ? stripesNone
          : name === "Three"
          ? stripesThree
          : name === "Four"
          ? stripesFour
          : name === "Five"
          ? stripesFive
          : name === "Six"
          ? stripesSix
          : name === "Seven"
          ? stripesSeven
          : name === "Eight"
          ? stripesEight
          : stripesTwelve}
      </pattern>
    ))}
    {pedestrianTypes.map(({ name }) => (
      <pattern
        key={name}
        id={name}
        width="1"
        height="0.3"
        viewBox="0 0 3000 200"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="3000" height="200" fill={`url(#${name + "-base"})`} />
      </pattern>
    ))}
    {doubleTypes.map((types) => (
      <pattern
        key={types}
        id={types}
        width="1"
        height="0.6"
        viewBox="0 0 3000 400"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[0] + "-base"})`}
        />
        <rect
          y="200"
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[1] + "-base"})`}
        />
      </pattern>
    ))}
    {tripleTypes.map((types) => (
      <pattern
        key={types}
        id={types}
        width="1"
        height="0.7"
        viewBox="0 0 3000 600"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[0] + "-base"})`}
        />
        <rect
          y="200"
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[1] + "-base"})`}
        />
        <rect
          y="400"
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[2] + "-base"})`}
        />
      </pattern>
    ))}
    {quadrupleTypes.map((types) => (
      <pattern
        key={types}
        id={types}
        width="1"
        height="1"
        viewBox="0 0 3000 800"
        patternUnits="objectBoundingBox"
        patternContentUnits="userSpaceOnUse"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[0] + "-base"})`}
        />
        <rect
          y="200"
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[1] + "-base"})`}
        />
        <rect
          y="400"
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[2] + "-base"})`}
        />
        <rect
          y="600"
          width="3000"
          height="200"
          fill={`url(#${types.split(",")[3] + "-base"})`}
        />
      </pattern>
    ))}
  </>
);
