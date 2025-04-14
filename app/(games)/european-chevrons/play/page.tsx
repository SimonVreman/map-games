import { EuropeanChevronsGame } from "@/components/game/european-chevrons/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "European Chevrons",
};

export default async function EuropeanChevronsPlayPage() {
  return <EuropeanChevronsGame />;
}
