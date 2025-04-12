import DescriptionMdx from "@/components/game/brazil-telephone-codes/description.mdx";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brazil Telephone Codes",
};

export default function BrazilTelephoneCodesPage() {
  return (
    <ProseMdx>
      <DescriptionMdx />
    </ProseMdx>
  );
}
