import {
  europeanGuardrails,
  guardrailTypes,
} from "@/lib/mapping/countries/registry/guardrails";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanGuardrailsSlice = {
  europeanGuardrails: GroupPinSlice<(typeof guardrailTypes)[number]>;
};

export const createEuropeanGuardrailsSlice = createGroupPinSlice({
  name: "europeanGuardrails",
  subjects: guardrailTypes,
  targets: europeanGuardrails,
});
