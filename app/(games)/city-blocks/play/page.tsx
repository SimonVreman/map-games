import { CityBlocksGame } from "@/components/game/city-blocks/game";
import { getCities } from "@/lib/geonames/citites";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Blocks",
};

export default async function CityBlocksPlayPage() {
  const cities = await getCities({ minimumPopulation: 1e5 });

  return <CityBlocksGame cities={cities} />;
}
