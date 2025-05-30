import { Pattern } from "@/types/registry";

export function PatternPreview<TMap extends Record<string, Pattern>>({
  patterns,
  size,
  pattern: patternKey,
}: {
  patterns: TMap;
  size: { width: number; height: number };
  pattern?: keyof TMap;
}) {
  const pattern = patternKey ? patterns[patternKey] : null;

  if (!pattern) return null;

  return (
    <svg
      viewBox={`0 0 ${size.width} ${size.height}`}
      className="w-32 bg-secondary"
      preserveAspectRatio="xMidYMid slice"
      style={{ backgroundColor: pattern.background.light }}
    >
      {pattern.paths.map((p, i) => (
        <path key={i} d={p.path} fill={p.fill || "none"} />
      ))}
    </svg>
  );
}
