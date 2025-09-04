import { cn } from "@/lib/utils";
import { LatLngBounds } from "./types";
import { WebGLMap } from "./web-gl-map";

export function InsetMap({
  bounds,
  className,
  children,
}: {
  bounds: LatLngBounds;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "size-full border border-neutral-100 dark:border-neutral-600 rounded-lg shadow-xl overflow-hidden",
        className
      )}
    >
      <WebGLMap bounds={bounds} inset>
        {children}
      </WebGLMap>
    </div>
  );
}
