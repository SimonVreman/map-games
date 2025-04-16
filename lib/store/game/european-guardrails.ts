import { chevronPatterns } from "@/lib/mapping/countries/chevrons";
import { europeanGuardrails } from "@/lib/mapping/countries/guardrails";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanGuardrailsSlice = {
  europeanGuardrails: GroupPinSlice<(typeof chevronPatterns)[number]>;
};

export const createEuropeanGuardrailsSlice = createGroupPinSlice({
  name: "europeanGuardrails",
  subjects: chevronPatterns,
  targets: europeanGuardrails,
});
