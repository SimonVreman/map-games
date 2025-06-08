import { City } from "@/lib/geonames/cities";

export function bandsForCities({
  cities,
  bandSize,
}: {
  cities: City[];
  bandSize: number;
}) {
  const bands = mergeOverlappingBands(
    cities.map(({ lat }) => [lat - bandSize, lat + bandSize])
  );

  return bands;
}

export function unreachableBandsForCities({
  cities,
  bandSize,
}: {
  cities: City[];
  bandSize: number;
}) {
  const bands = bandsForCities({ cities, bandSize });
  const unreachable: [number, number][] = [];

  if (bands[0][0] > -90) unreachable.push([-90, bands[0][0]]);

  for (let i = 0; i < bands.length - 1; i++)
    unreachable.push([bands[i][1], bands[i + 1][0]]);

  if (bands[bands.length - 1][1] < 90)
    unreachable.push([bands[bands.length - 1][1], 90]);

  return unreachable;
}

export function reachedHeight({ bands }: { bands: [number, number][] }) {
  return bands.reduce((acc, band) => {
    const bandHeight = band[1] - band[0];
    return acc + bandHeight;
  }, 0);
}

const mergeOverlappingBands = (
  bands: [number, number][]
): [number, number][] => {
  if (bands.length === 0) return [];

  // Sort bands by start point
  bands.sort((a, b) => a[0] - b[0]);

  const mergedBands: [number, number][] = [];
  let currentBand = bands[0];

  for (let i = 1; i < bands.length; i++) {
    const nextBand = bands[i];

    if (currentBand[1] >= nextBand[0]) {
      // Bands overlap, merge them
      currentBand[1] = Math.max(currentBand[1], nextBand[1]);
    } else {
      // No overlap, push the current band and move to the next
      mergedBands.push(currentBand);
      currentBand = nextBand;
    }
  }

  // Push the last band
  mergedBands.push(currentBand);

  return mergedBands;
};
