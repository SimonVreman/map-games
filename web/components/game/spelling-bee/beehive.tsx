import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const letterPositions = [
  // Center
  { x: 224, y: 233 },
  // Top, clockwise
  { x: 224, y: 75 },
  { x: 360.5, y: 153.5 },
  { x: 360.5, y: 311.5 },
  { x: 224, y: 391 },
  { x: 86.5, y: 311.5 },
  { x: 86.5, y: 153.5 },
];

const hexagons = [
  <path
    key={1}
    d="M180.301 308H266.904L310.205 233L266.904 158H180.301L137 233L180.301 308Z"
    className="fill-yellow-300 dark:fill-purple-900"
  />,
  <path
    key={2}
    d="M180.301 150H266.904L310.205 75L266.904 0H180.301L137 75L180.301 150Z"
  />,
  <path
    key={3}
    d="M447.037 154L403.736 79L317.133 79L273.832 154L317.133 229H403.736L447.037 154Z"
  />,
  <path
    key={4}
    d="M403.736 387L447.037 312L403.736 237H317.133L273.832 312L317.133 387H403.736Z"
  />,
  <path
    key={5}
    d="M180.301 466H266.904L310.205 391L266.904 316H180.301L137 391L180.301 466Z"
  />,
  <path
    key={6}
    d="M173.373 312L130.072 237H43.4692L0.167969 312L43.4692 387H130.072L173.373 312Z"
  />,
  <path
    key={7}
    d="M130.072 229L173.373 154L130.072 79L43.4692 79L0.167969 154L43.4692 229H130.072Z"
  />,
];

export function Beehive({
  letters: rawLetters,
  onLetterClick,
}: {
  letters: string;
  onLetterClick?: (letter: string) => void;
}) {
  const [clicking, setClicking] = useState("");
  const letters = rawLetters.padEnd(7, " ").split("");

  const onClick = (letter: string) => {
    onLetterClick?.(letter);
    setClicking("");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (letters.includes(letter)) onClick(letter);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <svg
      viewBox="0 0 448 466"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-muted select-none w-full max-w-sm"
    >
      {letters.map((letter, index) => (
        <g
          key={index}
          className={cn(
            "transition-transform duration-100 origin-center hover:cursor-pointer",
            { "scale-90": clicking === letter }
          )}
          style={{ transformBox: "fill-box" }}
          onPointerDown={() => setClicking(letter)}
          onPointerLeave={() => setClicking("")}
          onClick={() => onClick(letter)}
          role="button"
        >
          {hexagons[index]}
          <text
            x={letterPositions[index].x}
            y={letterPositions[index].y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={36}
            className="font-bold fill-gray-800 dark:fill-gray-200"
          >
            {letter.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
