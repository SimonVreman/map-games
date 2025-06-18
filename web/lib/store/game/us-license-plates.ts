import { usLicensePlates } from "@/lib/mapping/us/registry/license-plates";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type USLicensePlatesSlice = {
  usLicensePlates: GroupPinSlice<(typeof usLicensePlates.subjects)[number]>;
};

export const createUSLicensePlatesSlice = createGroupPinSlice({
  name: "usLicensePlates",
  subjects: usLicensePlates.subjects,
  targets: usLicensePlates.entries,
});
