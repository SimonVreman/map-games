import { useTwTheme } from "@/lib/hooks/use-tw-theme";
import { Pattern, PatternFill, Sprites } from "@/types/registry";

function resolveFill(fill?: PatternFill): {
  fill: string;
  defs: React.ReactNode;
} {
  if (!fill) return { fill: "none", defs: null };
  if (typeof fill === "string") return { fill, defs: null };

  const gradientId = `gradient-${Math.random().toString(36).substring(2, 15)}`;

  const stops = fill.stops.map((stop, index) => (
    <stop key={index} offset={stop.offset} stopColor={stop.color} />
  ));

  const defs = (
    <defs>
      <linearGradient
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1={fill.start.x}
        y1={fill.start.y}
        x2={fill.end.x}
        y2={fill.end.y}
      >
        {stops}
      </linearGradient>
    </defs>
  );

  return { fill: `url(#${gradientId})`, defs };
}

function resolveImage(
  sprites?: Sprites,
  image?: Pattern["paths"][number]["image"]
) {
  if (image == null || sprites == null) return null;

  return (
    <svg viewBox={image.source.join(" ")}>
      <image href={sprites[image.sprite].objectUrl} />
    </svg>
  );
}

export function PatternPreview<TMap extends Record<string, Pattern>>({
  patterns,
  size,
  pattern: patternKey,
  sprites,
}: {
  patterns: TMap;
  size: { width: number; height: number };
  pattern?: keyof TMap;
  sprites?: Sprites;
}) {
  const { theme } = useTwTheme();
  const pattern = patternKey ? patterns[patternKey] : null;

  if (!pattern) return null;

  return (
    <svg
      viewBox={`0 0 ${size.width} ${size.height}`}
      className="w-32 bg-secondary"
      preserveAspectRatio="xMidYMid slice"
      style={{ backgroundColor: pattern.background[theme] }}
    >
      {pattern.paths.map((p, i) => {
        const { fill, defs } = resolveFill(p.fill);
        const imageSvg = resolveImage(sprites, p.image);

        return (
          <g key={i}>
            {defs}
            {imageSvg}
            {p.path && <path d={p.path} fill={fill} />}
          </g>
        );
      })}
    </svg>
  );
}
