"use client";

import Map, { Layer, useMap } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { map } from "./constants";
import { LatLngBounds } from "./types";
import { useEffect, useState } from "react";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { RoadRailLayer } from "./layers/road-rail-layer";
import { StateBoundariesLayer } from "./layers/state-boundaries-layer";
import { CountryBoundariesLayer } from "./layers/country-boundaries-layer";
import { GeoLinesLayer } from "./layers/geo-lines-layer";
import { PlacesLayer } from "./layers/places-layer";
import { MapTheme } from "./map-theme";
import { LandCoverLayer } from "./layers/land-cover-layer";
import { LandLayer } from "./layers/land-layer";
import { RiverLakeLayer } from "./layers/river-lake-layer";
import { OceanLayer } from "./layers/ocean-layer";
import { StatesLayer } from "./layers/states-layer";
import { CountriesLayer } from "./layers/countries-layer";
import { Button } from "../ui/button";

const minzoom = 2;
const maxzoom = 6;

const mapLayerGroups = {
  bottom: "layer-group-bottom",
  top: "layer-group-top",
} as const;

type LayerGroup = keyof typeof mapLayerGroups;

type LayerKey =
  | "ocean"
  | "land"
  | "landcover"
  | "riverlake"
  | "roadrail"
  | "statelines"
  | "countrylines"
  | "geolines"
  | "places"
  | "states"
  | "countries";

export function useLayerGroups() {
  const map = useMap().current?.getMap();
  const [layers, setLayers] = useState<
    Partial<Record<LayerGroup, (typeof mapLayerGroups)[LayerGroup]>>
  >({});

  useEffect(() => {
    if (!map) return;

    const load = map.on("load", () => {
      setLayers(
        Object.keys(mapLayerGroups).reduce((acc, key) => {
          const id = mapLayerGroups[key as LayerGroup];
          if (map.getLayer(id)) acc[key as LayerGroup] = id;
          return acc;
        }, {} as typeof layers)
      );
    });

    return () => {
      load.unsubscribe();
    };
  }, [map]);

  return { layerGroups: layers };
}

export function WebGLMap({
  bounds,
  attribution,
  inset,
  layers,
  children,
}: {
  bounds: LatLngBounds;
  attribution?: React.ReactNode;
  inset?: boolean;
  layers?: Partial<Record<LayerKey, boolean>>;
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
    <div className="size-full relative pointer-events-auto">
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
        // dragRotate={!inset}
        // pitchWithRotate={!inset}
        // dragPan={!inset}
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

        <Layer
          id={mapLayerGroups.bottom}
          type="background"
          layout={{ visibility: "none" }}
        />

        {layers?.ocean !== false && <OceanLayer />}
        {layers?.land !== false && <LandLayer />}
        {layers?.landcover !== false && <LandCoverLayer />}
        {layers?.riverlake !== false && <RiverLakeLayer />}
        {layers?.roadrail !== false && <RoadRailLayer />}

        {children}

        {layers?.statelines !== false && <StateBoundariesLayer />}
        {layers?.countrylines !== false && <CountryBoundariesLayer />}
        {layers?.geolines !== false && <GeoLinesLayer />}
        {layers?.places !== false && <PlacesLayer />}
        {layers?.states !== false && <StatesLayer />}
        {layers?.countries !== false && <CountriesLayer />}

        <Layer
          id={mapLayerGroups.top}
          type="background"
          layout={{ visibility: "none" }}
        />
      </Map>
      {attribution && (
        <Attribution
          attribution={
            <>
              {attribution}
              {attribution && <span className="mx-1">-</span>}
              <a href="https://doi.org/10.2909/c6377c6e-76cc-4d03-8330-628a03693042">
                EU Copernicus Land Monitoring
              </a>
            </>
          }
        />
      )}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 p-4 flex items-center justify-center flex-col gap-2">
          <Loader2Icon className="animate-spin" />
          {!inset && <span>Initializing map... </span>}
        </div>
      )}
    </div>
  );
}

function Attribution({ attribution }: { attribution: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute bottom-1 right-1 max-w-lg pl-1">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setOpen((o) => !o)}
        className="absolute bottom-0 right-0"
      >
        <InfoIcon />
      </Button>
      {open && (
        <div className="abosolute bottom-0 right-16 bg-neutral-50/70 dark:bg-neutral-700/70 text-xs pl-2 pr-10 py-0.5 text-muted-foreground select-none rounded-md">
          {attribution}
        </div>
      )}
    </div>
  );
}
