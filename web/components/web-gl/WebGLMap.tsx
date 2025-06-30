"use client";

import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { map } from "./constants";
import { OceanLayer } from "./layers/OceanLayer";
import { LandLayer } from "./layers/LandLayer";
import { RoadRailLayer } from "./layers/RoadRailLayer";
import { RiverLakeLayer } from "./layers/RiverLakeLayer";
import { PlacesLayer } from "./layers/PlacesLayer";
import { LabelsLayer } from "./layers/LabelsLayer";
import { GeoLinesLayer } from "./layers/GeoLinesLayer";
import { LatLngBounds } from "../canvas/types";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { CountryBoundariesLayer } from "./layers/CountryBoundariesLayer";
import { StateBoundariesLayer } from "./layers/StateBoundariesLayer";

const minzoom = 2;
const maxzoom = 6;

export default function WebGLMap({
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
              tiles: [process.env.NEXT_PUBLIC_TILES_URL!],
            },
          },
          sprite:
            (typeof window !== "undefined" ? window.location.origin : "") +
            "/img/sprites/map-icons",
          glyphs: process.env.NEXT_PUBLIC_GLYPHS_URL!,
          layers: [],
        }}
      >
        <OceanLayer />
        <LandLayer />
        <RiverLakeLayer />
        <RoadRailLayer />
        <StateBoundariesLayer />
        <CountryBoundariesLayer />
        <GeoLinesLayer />
        <PlacesLayer />
        <LabelsLayer />
        {children}
      </Map>
      {attribution && (
        <div className="bg-neutral-50 dark:bg-neutral-700 absolute bottom-0 right-0 text-xs p-0.5 text-muted-foreground select-none line-clamp-1">
          {attribution}
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
