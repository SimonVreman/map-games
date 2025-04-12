"use client";

import { APIProvider, Map as BaseMap } from "@vis.gl/react-google-maps";
import { ComponentProps, useLayoutEffect, useState } from "react";

const middlePosition = { lat: 0, lng: 0 };

export function Map({
  mapId,
  defaultCenter = middlePosition,
  defaultZoom = 3,
  defaultBounds,
  children,
}: {
  mapId: string;
  children?: React.ReactNode;
} & Pick<
  ComponentProps<typeof BaseMap>,
  "defaultCenter" | "defaultZoom" | "defaultBounds"
>) {
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
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        defaultBounds={defaultBounds}
        gestureHandling="greedy"
        disableDefaultUI
        reuseMaps
      >
        {children}
      </BaseMap>
    </APIProvider>
  );
}
