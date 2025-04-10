"use client";

import { APIProvider, Map as BaseMap } from "@vis.gl/react-google-maps";
import { useLayoutEffect, useState } from "react";

export function Map({
  mapId,
  children,
}: {
  mapId: string;
  children?: React.ReactNode;
}) {
  const [colorScheme, setColorScheme] = useState<"LIGHT" | "DARK">("LIGHT");

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setColorScheme(mediaQuery.matches ? "DARK" : "LIGHT");

    const handleChange = (event: MediaQueryListEvent) =>
      setColorScheme(event.matches ? "DARK" : "LIGHT");

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <BaseMap
        mapId={mapId}
        colorScheme={colorScheme}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI
        reuseMaps
      >
        {children}
      </BaseMap>
    </APIProvider>
  );
}
