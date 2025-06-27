"use client";

import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { map } from "./constants";
import { OceanLayer } from "./layers/OceanLayer";
import { LandLayer } from "./layers/LandLayer";
import { BoundariesLayer } from "./layers/BoundariesLayer";
import { RoadRailLayer } from "./layers/RoadRailLayer";
import { RiverLakeLayer } from "./layers/RiverLakeLayer";
import { PlacesLayer } from "./layers/PlacesLayer";
import { LabelsLayer } from "./layers/LabelsLayer";
import { GeoLinesLayer } from "./layers/GeoLinesLayer";
import { LatLngBounds } from "../canvas/types";
import { PatternLayer } from "./layers/PatternLayer";

const minzoom = 2;
const maxzoom = 6;

export default function WebGLMap({
  bounds,
  children,
}: {
  bounds: LatLngBounds;
  children?: React.ReactNode;
}) {
  const maxBounds = [
    bounds.west - (bounds.padding ?? 0),
    bounds.south - (bounds.padding ?? 0),
    bounds.east + (bounds.padding ?? 0),
    bounds.north + (bounds.padding ?? 0),
  ] as [number, number, number, number];

  return (
    <Map
      initialViewState={{
        bounds: [bounds.west, bounds.south, bounds.east, bounds.north],
      }}
      maxBounds={maxBounds}
      minZoom={minzoom}
      maxZoom={maxzoom}
      maxPitch={60}
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
      <BoundariesLayer />
      <GeoLinesLayer />
      <PlacesLayer />
      <LabelsLayer />
      <PatternLayer />
      {children}
    </Map>
  );
}
