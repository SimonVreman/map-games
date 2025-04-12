import { useContext, useEffect, useImperativeHandle, useRef } from "react";
import { GoogleMapsContext } from "@vis.gl/react-google-maps";
import type { Ref } from "react";

export type GroundOverlayProps = {
  url: string;
  bounds: google.maps.LatLngBounds | null | google.maps.LatLngBoundsLiteral;
  options?: google.maps.GroundOverlayOptions;
};

export type GroundOverlayRef = Ref<google.maps.GroundOverlay | null>;

function useGroundOverlay(props: GroundOverlayProps) {
  const { url, bounds, options } = props;

  const groundOverlay = useRef(
    new google.maps.GroundOverlay(url, bounds, options)
  ).current;
  const map = useContext(GoogleMapsContext)?.map;

  // create groundOverlay instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined)
        console.error("<GroundOverlay> has to be inside a Map component.");
      return;
    }

    groundOverlay.setMap(map);

    return () => groundOverlay.setMap(null);
  }, [map, groundOverlay]);

  return groundOverlay;
}

/**
 * Component to render a groundOverlay on a map
 */
export function GroundOverlay({
  ref,
  ...props
}: GroundOverlayProps & { ref?: GroundOverlayRef }) {
  const groundOverlay = useGroundOverlay(props);

  useImperativeHandle(ref, () => groundOverlay, [groundOverlay]);

  return null;
}
