"use client";

import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { map } from "./constants";
import { LatLngBounds } from "../canvas/types";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { RoadRailLayer } from "./layers/road-rail-layer";
import { StateBoundariesLayer } from "./layers/state-boundaries-layer";
import { CountryBoundariesLayer } from "./layers/country-boundaries-layer";
import { GeoLinesLayer } from "./layers/geo-lines-layer";
import { PlacesLayer } from "./layers/places-layer";
import { LabelsLayer } from "./layers/labels-layer";
import { MapTheme } from "./map-theme";
import { LandCoverLayer } from "./layers/land-cover-layer";
import { LandLayer } from "./layers/land-layer";
import { RiverLakeLayer } from "./layers/river-lake-layer";
import { OceanLayer } from "./layers/ocean-layer";

const minzoom = 2;
const maxzoom = 6;

export function WebGLMap({
  bounds,
  attribution,
  children,
}: {
  bounds: LatLngBounds;
  attribution?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  const maxBounds = [
    bounds.west - (bounds.padding ?? 0),
    bounds.south - (bounds.padding ?? 0),
    bounds.east + (bounds.padding ?? 0),
    bounds.north + (bounds.padding ?? 0),
  ] as [number, number, number, number];

  return (
    <div className="size-full relative">
      <Map
        initialViewState={{
          bounds: [bounds.west, bounds.south, bounds.east, bounds.north],
        }}
        maxBounds={maxBounds}
        minZoom={minzoom}
        maxZoom={maxzoom}
        cursor="default"
        onDragStart={(e) => (e.target.getCanvas().style.cursor = "move")}
        onDragEnd={(e) => (e.target.getCanvas().style.cursor = "default")}
        onLoad={() => setLoaded(true)}
        maxPitch={0}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
        canvasContextAttributes={{ antialias: true }}
        mapStyle={{
          version: 8,
          sources: {
            [map.sources.tiles]: {
              type: "vector",
              tiles: [
                process.env.NEXT_PUBLIC_TILES_URL!.replace("{set}", "base"),
              ],
            },
            [map.sources.landcover]: {
              type: "vector",
              tiles: [
                process.env.NEXT_PUBLIC_TILES_URL!.replace(
                  "{set}",
                  "landcover"
                ),
              ],
            },
          },
          sprite:
            (typeof window !== "undefined" ? window.location.origin : "") +
            "/img/sprites/map-icons",
          glyphs: process.env.NEXT_PUBLIC_GLYPHS_URL!,
          layers: [],
        }}
      >
        <MapTheme />

        <OceanLayer />
        <LandLayer />
        <LandCoverLayer />
        <RiverLakeLayer />
        <RoadRailLayer />

        {children}

        <StateBoundariesLayer />
        <CountryBoundariesLayer />
        <GeoLinesLayer />
        <PlacesLayer />
        <LabelsLayer />
      </Map>
      {attribution && (
        <div className="bg-neutral-50/70 dark:bg-neutral-700/70 absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
          {attribution}
          {/* https://doi.org/10.2909/602507b2-96c7-47bb-b79d-7ba25e97d0a9 copernicus */}
        </div>
      )}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 p-4 flex items-center justify-center flex-col gap-2">
          <Loader2Icon className="animate-spin" />
          <span>Initializing map... </span>
        </div>
      )}
    </div>
  );
}
