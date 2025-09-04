import { useTwTheme } from "@/lib/hooks/use-tw-theme";
import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

export function MapTheme() {
  const map = useMap().current?.getMap();
  const { theme } = useTwTheme();

  useEffect(() => {
    if (!map) return;

    if (!map.isStyleLoaded()) {
      const subscription = map.on("styledata", () => {
        map.setGlobalStateProperty("theme", theme);
        subscription.unsubscribe();
      });
      return;
    }

    map.setGlobalStateProperty("theme", theme);
  }, [theme, map]);

  return null;
}
