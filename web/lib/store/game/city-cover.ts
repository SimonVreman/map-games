import { City } from "@/lib/geonames/cities";
import { ImmerStateCreator } from "../types";

type Options = {
  bandSize: number;
};

export type CityCoverSlice = {
  cityCover: {
    cities: City[];
    options: Options | null;
    addCity: (city: City) => void;
    setOptions: (options: Options) => void;
    reset: () => void;
  };
};

export const createCityCoverSlice: ImmerStateCreator<CityCoverSlice> = (
  set
) => ({
  cityCover: {
    // State
    cities: [],
    options: null,

    // Actions
    addCity: (city) =>
      set(({ cityCover }) => {
        cityCover.cities.push(city);
      }),
    setOptions: (options) =>
      set(({ cityCover }) => {
        cityCover.options = options;
      }),
    reset: () =>
      set(({ cityCover }) => {
        cityCover.cities = [];
        cityCover.options = null;
      }),
  },
});
