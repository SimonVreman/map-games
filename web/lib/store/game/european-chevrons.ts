import { europeanChevrons } from "@/lib/mapping/countries/registry/chevrons";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanChevronsSlice = {
  europeanChevrons: GroupPinSlice<(typeof europeanChevrons.subjects)[number]>;
};

export const createEuropeanChevronsSlice = createGroupPinSlice({
  name: "europeanChevrons",
  subjects: europeanChevrons.subjects,
  targets: europeanChevrons.entries,
});
