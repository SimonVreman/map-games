import { chevronPatterns } from "@/lib/mapping/countries/chevrons";
import { europeanChevrons as countries } from "@/lib/mapping/countries/chevrons";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanChevronsSlice = {
  europeanChevrons: GroupPinSlice<(typeof chevronPatterns)[number]>;
};

export const createEuropeanChevronsSlice = createGroupPinSlice({
  name: "europeanChevrons",
  subjects: chevronPatterns,
  targets: countries,
});
