"use client";

import { APIProvider, Map as BaseMap } from "@vis.gl/react-google-maps";
import { cityCoverMapConfig } from "./city-cover/map-config";

export function Map({ children }: { children?: React.ReactNode }) {
  const position = { lat: 0, lng: 0 };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <BaseMap
        defaultCenter={position}
        defaultZoom={3}
        disableDefaultUI={true}
        styles={cityCoverMapConfig}
      >
        {children}
      </BaseMap>
    </APIProvider>
  );
}
