"use client";

import { useAppStore } from "@/lib/store/provider";
import { Map } from "../map";
import { Polygon } from "../polygon";
import { CityBlocksControls } from "./controls";
import { City } from "@/lib/geonames/cities";
import { useRouter } from "next/navigation";
import { useOnStoreHydrated } from "@/lib/hooks/use-on-store-hydrated";
import { blocksForCities } from "./blocks";

export function CityBlocksGame({ cities }: { cities: City[] }) {
  const router = useRouter();

  useOnStoreHydrated((s) => {
    if (s.cityBlocks.options == null) router.replace("/city-blocks");
  });

  const [added, blockSize] = useAppStore((s) => [
    s.cityBlocks.cities,
    s.cityBlocks.options?.blockSize ?? 1,
  ]);

  const blocks = blocksForCities({ cities: added, blockSize });
  const reachableBlocks = blocksForCities({ cities, blockSize });
  const reachedBlocksFraction = blocks.length / reachableBlocks.length;

  return (
    <div className="size-full relative">
      <CityBlocksControls cities={cities} completion={reachedBlocksFraction} />

      <Map mapId="9d629ce29fb7cb6a">
        <Polygon
          fillColor="hsl(142.31 100% 33%)" // green-600
          fillOpacity={0.4}
          strokeWeight={0}
          paths={blocks.flatMap((block) => [
            [
              { lat: block[0], lng: block[1] },
              { lat: block[0] + blockSize, lng: block[1] },
              { lat: block[0] + blockSize, lng: block[1] + blockSize },
              { lat: block[0], lng: block[1] + blockSize },
            ],
          ])}
        />

        <Polygon
          fillColor="hsl(223.81 0% 32%)" // neutral-600
          fillOpacity={0.3}
          strokeWeight={0}
          paths={[
            ...reachableBlocks.flatMap((block) => [
              [
                { lat: block[0], lng: block[1] },
                { lat: block[0] + blockSize, lng: block[1] },
                { lat: block[0] + blockSize, lng: block[1] + blockSize },
                { lat: block[0], lng: block[1] + blockSize },
              ],
            ]),
            [
              { lat: -90, lng: 180 },
              { lat: 90, lng: 180 },
              { lat: 90, lng: 0 },
              { lat: -90, lng: 0 },
            ],
            [
              { lat: -90, lng: 0 },
              { lat: 90, lng: 0 },
              { lat: 90, lng: -180 },
              { lat: -90, lng: -180 },
            ],
          ]}
        />
      </Map>
    </div>
  );
}
