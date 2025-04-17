import { SVGProps } from "react";

export function TapTargets<
  T extends {
    meta: {
      north: number;
      south: number;
      west: number;
      east: number;
      x: number;
      y: number;
    };
  }
>({
  items,
  props: getItemProps,
  threshold = 2,
}: {
  items: readonly T[];
  props?: (v: T) => SVGProps<SVGCircleElement>;
  threshold?: number;
}) {
  const needTarget = items.filter(
    ({ meta }) =>
      meta.east - meta.west < threshold || meta.south - meta.north < threshold
  );

  return (
    <>
      {needTarget.map((item) => (
        <circle
          key={`${item.meta.x}-${item.meta.y}`}
          cx={item.meta.x}
          cy={item.meta.y}
          r={threshold}
          strokeDasharray={1}
          strokeWidth={0.25}
          {...getItemProps?.(item)}
        />
      ))}
    </>
  );
}
