import {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { GoogleMapsContext } from "@vis.gl/react-google-maps";

import type { Ref } from "react";

type PolygonEventProps = {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onDrag?: (e: google.maps.MapMouseEvent) => void;
  onDragStart?: (e: google.maps.MapMouseEvent) => void;
  onDragEnd?: (e: google.maps.MapMouseEvent) => void;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
};

type PolygonCustomProps = {
  paths: (google.maps.LatLng | google.maps.LatLngLiteral)[][];
};

export type PolygonProps = google.maps.PolygonOptions &
  PolygonEventProps &
  PolygonCustomProps;

export type PolygonRef = Ref<google.maps.Polygon | null>;

function usePolygon(props: PolygonProps) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    paths,
    ...polygonOptions
  } = props;
  // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
  const callbacks = useRef<Record<string, (e: unknown) => void>>({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
  });

  const polygon = useRef(new google.maps.Polygon()).current;
  // update PolygonOptions (note the dependencies aren't properly checked
  // here, we just assume that setOptions is smart enough to not waste a
  // lot of time updating values that didn't change)
  useMemo(() => {
    polygon.setOptions(polygonOptions);
  }, [polygon, polygonOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  useMemo(() => {
    polygon.setPaths(paths);
  }, [polygon, paths]);

  // create polygon instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined)
        console.error("<Polygon> has to be inside a Map component.");
      return;
    }

    polygon.setMap(map);

    return () => polygon.setMap(null);
  }, [map, polygon]);

  // attach and re-attach event-handlers when any of the properties change
  useEffect(() => {
    if (!polygon) return;

    // Add event listeners
    const gme = google.maps.event;
    [
      ["click", "onClick"],
      ["drag", "onDrag"],
      ["dragstart", "onDragStart"],
      ["dragend", "onDragEnd"],
      ["mouseover", "onMouseOver"],
      ["mouseout", "onMouseOut"],
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon, eventName, (e: google.maps.MapMouseEvent) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => gme.clearInstanceListeners(polygon);
  }, [polygon]);

  return polygon;
}

/**
 * Component to render a polygon on a map
 */
export function Polygon({
  ref,
  ...props
}: PolygonProps & { ref?: PolygonRef }) {
  const polygon = usePolygon(props);

  useImperativeHandle(ref, () => polygon, [polygon]);

  return null;
}
