"use client";

import { useAppStore } from "@/lib/store/provider";
import { Map } from "../map";
import { Polygon } from "../polygon";
import { CityCoverControls } from "./controls";
import { City } from "@/lib/geonames/citites";
import {
  bandsForCities,
  reachedHeight,
  unreachableBandsForCities,
} from "./bands";

export function CityCoverGame({ cities }: { cities: City[] }) {
  const added = useAppStore((s) => s.cityCover.cities);
  const bandSize = useAppStore((s) => s.cityCover.options.bandSize);

  const bands = bandsForCities({ cities: added, bandSize });
  const unreachableBands = unreachableBandsForCities({ cities, bandSize });
  const reachableHeight = 180 - reachedHeight({ bands: unreachableBands });

  const reachedHeightFraction = reachedHeight({ bands }) / reachableHeight;

  return (
    <div className="size-full relative">
      <CityCoverControls cities={cities} completion={reachedHeightFraction} />

      <Map>
        {bands.map((band) => (
          <Polygon
            key={band.join(",")}
            fillColor="hsl(144.07 100% 39%)"
            fillOpacity={0.5}
            strokeWeight={0}
            paths={[
              [
                { lat: band[0], lng: -180 },
                { lat: band[1], lng: -180 },
                { lat: band[1], lng: 0 },
                { lat: band[0], lng: 0 },
              ],
              [
                { lat: band[0], lng: 180 },
                { lat: band[1], lng: 180 },
                { lat: band[1], lng: 0 },
                { lat: band[0], lng: 0 },
              ],
            ]}
          />
        ))}

        {unreachableBands.map((band) => (
          <Polygon
            key={band.join(",")}
            fillColor="hsl(223.81 0% 63%)"
            fillOpacity={0.3}
            strokeWeight={0}
            paths={[
              [
                { lat: band[0], lng: -180 },
                { lat: band[1], lng: -180 },
                { lat: band[1], lng: 0 },
                { lat: band[0], lng: 0 },
              ],
              [
                { lat: band[0], lng: 180 },
                { lat: band[1], lng: 180 },
                { lat: band[1], lng: 0 },
                { lat: band[0], lng: 0 },
              ],
            ]}
          />
        ))}
      </Map>
    </div>
  );
}
