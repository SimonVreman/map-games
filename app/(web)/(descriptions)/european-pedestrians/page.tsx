import DescriptionMdx from "@/components/game/european-pedestrians/description.mdx";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "European Pedestrians",
};

export default function EuropeanPedestriansPage() {
  return (
    <ProseMdx>
      <DescriptionMdx />
    </ProseMdx>
  );
}
