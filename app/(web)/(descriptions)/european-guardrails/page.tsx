import DescriptionMdx from "@/components/game/european-guardrails/description.mdx";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "European Guardrails",
};

export default function EuropeanGuardrailsPage() {
  return (
    <ProseMdx>
      <DescriptionMdx />
    </ProseMdx>
  );
}
