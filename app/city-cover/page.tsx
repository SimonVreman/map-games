import { CityCoverGame } from "@/components/game/city-cover/game";
import { getCities } from "@/lib/geonames/citites";

export default async function CityCoverPage() {
  const cities = await getCities({ minimumPopulation: 1e5 });

  console.log("using this many cities:", cities.length);

  return <CityCoverGame cities={cities} />;
}
