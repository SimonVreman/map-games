import { EuropeanPedestriansGame } from "@/components/game/european-pedestrians/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "European Pedestrians",
};

export default async function EuropeanPedestriansPlayPage() {
  return <EuropeanPedestriansGame />;
}
