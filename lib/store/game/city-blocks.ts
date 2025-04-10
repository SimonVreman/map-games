import { City } from "@/lib/geonames/cities";
import { ImmerStateCreator } from "../types";

type Options = {
  blockSize: number;
};

export type CityBlocksSlice = {
  cityBlocks: {
    cities: City[];
    options: Options | null;
    addCity: (city: City) => void;
    setOptions: (options: Options) => void;
    reset: () => void;
  };
};

export const createCityBlocksSlice: ImmerStateCreator<CityBlocksSlice> = (
  set
) => ({
  cityBlocks: {
    // State
    cities: [],
    options: null,

    // Actions
    addCity: (city) =>
      set(({ cityBlocks }) => {
        cityBlocks.cities.push(city);
      }),
    setOptions: (options) =>
      set(({ cityBlocks }) => {
        cityBlocks.options = options;
      }),
    reset: () =>
      set(({ cityBlocks }) => {
        cityBlocks.cities = [];
        cityBlocks.options = null;
      }),
  },
});
