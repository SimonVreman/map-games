import DescriptionMdx from "@/components/game/city-blocks/description.mdx";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Blocks",
};

export default function CityBlocksPage() {
  return (
    <ProseMdx>
      <DescriptionMdx />
    </ProseMdx>
  );
}
