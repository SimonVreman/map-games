import { City } from "@/lib/geonames/citites";
import { ImmerStateCreator } from "../types";

type Options = {
  bandSize: number;
};

export type CityCoverSlice = {
  cityCover: {
    cities: City[];
    options: Options;
    addCity: (city: City) => void;
    setOptions: (options: Options) => void;
  };
};

export const createCityCoverSlice: ImmerStateCreator<CityCoverSlice> = (
  set
) => ({
  cityCover: {
    // State
    cities: [],
    options: { bandSize: 3 },

    // Actions
    addCity: (city) =>
      set(({ cityCover }) => {
        cityCover.cities.push(city);
      }),
    setOptions: (options) =>
      set(({ cityCover }) => {
        cityCover.options = options;
      }),
  },
});

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
