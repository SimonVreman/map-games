import { City } from "@/lib/geonames/cities";

export function blockForCity({
  city,
  blockSize,
}: {
  city: City;
  blockSize: number;
}): [number, number] {
  const lat = Math.floor(city.lat / blockSize) * blockSize;
  const lng = Math.floor(city.lng / blockSize) * blockSize;

  return [lat, lng];
}

export function blocksForCities({
  cities,
  blockSize,
}: {
  cities: City[];
  blockSize: number;
}) {
  const blocks: [number, number][] = [];

  for (const city of cities) {
    const block = blockForCity({ city, blockSize });
    if (!blocks.some((b) => b[0] === block[0] && b[1] === block[1]))
      blocks.push(block);
  }

  return blocks;
}

export function unreachableBlocksForCities({
  cities,
  blockSize,
}: {
  cities: City[];
  blockSize: number;
}) {
  const blocks = blocksForCities({ cities, blockSize });
  const unreachable: [number, number][] = [];

  for (let lat = -90; lat <= 90; lat += blockSize)
    for (let lng = -180; lng <= 180; lng += blockSize) {
      if (!blocks.some((b) => b[0] === lat && b[1] === lng))
        unreachable.push([lat, lng]);
    }

  return unreachable;
}

export function reachableBlockCount({
  unreachableCount,
  blockSize,
}: {
  unreachableCount: number;
  blockSize: number;
}) {
  const totalBlocks = Math.floor((360 / blockSize) * (180 / blockSize));
  return totalBlocks - unreachableCount;
}
