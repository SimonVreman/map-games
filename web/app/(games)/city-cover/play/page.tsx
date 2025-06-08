import { CityCoverGame } from "@/components/game/city-cover/game";
import { getCities } from "@/lib/geonames/cities";
import { validatedLanguage } from "@/lib/geonames/language";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Cover",
};

export default async function CityCoverPlayPage({
  searchParams,
}: {
  searchParams?: Promise<{ language?: string }>;
}) {
  const language = validatedLanguage((await searchParams)?.language);
  const cities = await getCities({ minimumPopulation: 1e5, language });

  return <CityCoverGame cities={cities} />;
}
