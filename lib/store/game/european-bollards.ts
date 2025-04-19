import {
  europeanBollards,
  bollardTypes,
} from "@/lib/mapping/countries/registry/bollards";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanBollardsSlice = {
  europeanBollards: GroupPinSlice<(typeof bollardTypes)[number]>;
};

export const createEuropeanBollardsSlice = createGroupPinSlice({
  name: "europeanBollards",
  subjects: bollardTypes,
  targets: europeanBollards,
});
