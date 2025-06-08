import CityBlocksDescription from "@/components/game/city-blocks/description.mdx";
import CityCoverDescription from "@/components/game/city-cover/description.mdx";
import { GameDefinition } from "./types";

export const regularGames: GameDefinition[] = [
  {
    name: "City Cover",
    description:
      "How much of the globe can you cover using cities at different latitudes?",
    slug: "city-cover",
    pages: {
      Description: CityCoverDescription,
    },
  },
  {
    name: "City Blocks",
    description: "Can you guess a city for every block in the world?",
    slug: "city-blocks",
    pages: {
      Description: CityBlocksDescription,
    },
  },
];
