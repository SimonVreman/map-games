import { europeanGuardrails } from "@/lib/mapping/countries/registry/guardrails";
import { createGroupPinSlice, GroupPinSlice } from "../slice/group-pin";

export type EuropeanGuardrailsSlice = {
  europeanGuardrails: GroupPinSlice<
    (typeof europeanGuardrails.subjects)[number]
  >;
};

export const createEuropeanGuardrailsSlice = createGroupPinSlice({
  name: "europeanGuardrails",
  subjects: europeanGuardrails.subjects,
  targets: europeanGuardrails.entries,
});
