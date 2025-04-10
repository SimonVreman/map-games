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
import { useRouter } from "next/navigation";
import { useOnStoreHydrated } from "@/lib/hooks/use-on-store-hydrated";

export function CityCoverGame({ cities }: { cities: City[] }) {
  const router = useRouter();

  useOnStoreHydrated((s) => {
    if (s.cityCover.options == null) router.replace("/city-cover");
  });

  const [added, options] = useAppStore((s) => [
    s.cityCover.cities,
    s.cityCover.options,
    s.cityCover,
  ]);

  const bandSize = options?.bandSize ?? 0;
  const bands = bandsForCities({ cities: added, bandSize });
  const unreachableBands = unreachableBandsForCities({ cities, bandSize });
  const reachableHeight = 180 - reachedHeight({ bands: unreachableBands });

  const reachedHeightFraction = reachedHeight({ bands }) / reachableHeight;

  return (
    <div className="size-full relative">
      <CityCoverControls cities={cities} completion={reachedHeightFraction} />

      <Map mapId="9d629ce29fb7cb6a">
        <Polygon
          fillColor="hsl(142.31 100% 33%)" // green-600
          fillOpacity={0.4}
          strokeWeight={0}
          paths={bands.flatMap((band) => [
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
          ])}
        />

        <Polygon
          fillColor="hsl(223.81 0% 32%)" // neutral-600
          fillOpacity={0.3}
          strokeWeight={0}
          paths={unreachableBands.flatMap((band) => [
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
          ])}
        />
      </Map>
    </div>
  );
}
