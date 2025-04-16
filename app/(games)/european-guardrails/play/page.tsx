import { EuropeanGuardrailsGame } from "@/components/game/european-guardrails/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "European Chevrons",
};

export default async function EuropeanGuardrailsPlayPage() {
  return <EuropeanGuardrailsGame />;
}
