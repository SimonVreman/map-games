import { ProseMdx } from "@/components/mdx/prose-mdx";
import HomeMdx from "./home.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <ProseMdx>
      <HomeMdx />
    </ProseMdx>
  );
}
