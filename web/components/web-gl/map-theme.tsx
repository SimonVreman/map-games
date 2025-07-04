import { useTwTheme } from "@/lib/hooks/use-tw-theme";
import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

export function MapTheme() {
  const map = useMap().current?.getMap();
  const { theme } = useTwTheme();

  useEffect(() => {
    if (!map) return;
    map.setGlobalStateProperty("theme", theme);
  }, [theme, map]);

  return null;
}
