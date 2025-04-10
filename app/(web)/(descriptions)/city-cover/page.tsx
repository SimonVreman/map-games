import DescriptionMdx from "@/components/game/city-cover/description.mdx";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Cover",
};

export default function CityCoverPage() {
  return (
    <ProseMdx>
      <DescriptionMdx />
    </ProseMdx>
  );
}
