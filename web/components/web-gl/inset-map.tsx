import { LatLngBounds } from "./types";
import { WebGLMap } from "./web-gl-map";

export function InsetMap({
  bounds,
  children,
}: {
  bounds: LatLngBounds;
  children?: React.ReactNode;
}) {
  return (
    <div className="absolute bottom-8 left-8 size-96 border-dashed border-2 border-primary rounded-xl overflow-hidden">
      <WebGLMap bounds={bounds} inset>
        {children}
      </WebGLMap>
    </div>
  );
}
