import { chevronPatterns } from "@/lib/mapping/countries/chevrons";

export function ChevronPatterns() {
  return (
    <>
      {chevronPatterns.map(({ name, background, foreground }) => (
        <pattern
          key={name}
          id={name}
          patternUnits="userSpaceOnUse"
          width="7"
          height="7"
          viewBox="0 0 10 10"
          preserveAspectRatio="xMidYMid slice"
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
            d="M 3 2 L 5 5 L 3 8 L 5 8 L 7 5 L 5 2 z"
            fill={foreground}
            strokeWidth={0}
          />
        </pattern>
      ))}
    </>
  );
}
