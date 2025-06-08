import { europeanBollards } from "@/lib/mapping/countries/registry/bollards";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanBollardsSlice = {
  europeanBollards: GroupPinSlice<(typeof europeanBollards.subjects)[number]>;
};

export const createEuropeanBollardsSlice = createGroupPinSlice({
  name: "europeanBollards",
  subjects: europeanBollards.subjects,
  targets: europeanBollards.entries,
});
