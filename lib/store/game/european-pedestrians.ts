import {
  europeanPedestrians,
  pedestrianTypes,
} from "@/lib/mapping/countries/registry/pedestrians";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanPedestriansSlice = {
  europeanPedestrians: GroupPinSlice<(typeof pedestrianTypes)[number]>;
};

export const createEuropeanPedestriansSlice = createGroupPinSlice({
  name: "europeanPedestrians",
  subjects: pedestrianTypes,
  targets: europeanPedestrians,
});
