import { CityBlocksGame } from "@/components/game/city-blocks/game";
import { getCities } from "@/lib/geonames/cities";
import { validatedLanguage } from "@/lib/geonames/language";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Blocks",
};

export default async function CityBlocksPlayPage({
  searchParams,
}: {
  searchParams?: Promise<{ language?: string }>;
}) {
  const language = validatedLanguage((await searchParams)?.language);
  const cities = await getCities({ minimumPopulation: 1e5, language });

  return <CityBlocksGame cities={cities} />;
}
