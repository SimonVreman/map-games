import DescriptionMdx from "@/components/game/spain-telephone-codes/description.mdx";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spain Telephone Codes",
};

export default function SpainTelephoneCodesPage() {
  return (
    <ProseMdx>
      <DescriptionMdx />
    </ProseMdx>
  );
}
