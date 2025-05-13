import BrazilDialingCodesDescription from "@/components/game/brazil-dialing-codes/description.mdx";
import { BrazilDialingCodesGame } from "@/components/game/brazil-dialing-codes/game";
import EuropeanChevronsDescription from "@/components/game/european-chevrons/description.mdx";
import { EuropeanChevronsGame } from "@/components/game/european-chevrons/game";
import EuropeanGuardrailsDescription from "@/components/game/european-guardrails/description.mdx";
import { EuropeanGuardrailsGame } from "@/components/game/european-guardrails/game";
import EuropeanPedestriansDescription from "@/components/game/european-pedestrians/description.mdx";
import { EuropeanPedestriansGame } from "@/components/game/european-pedestrians/game";
import { GameDefinition } from "./types";
import SpainDialingCodesDescription from "@/components/game/spain-dialing-codes/description.mdx";
import { SpainDialingCodesGame } from "@/components/game/spain-dialing-codes/game";
import USDialingCodesDescription from "@/components/game/us-dialing-codes/description.mdx";
import { USDialingCodesGame } from "@/components/game/us-dialing-codes/game";
import EuropeanBollardsDescription from "@/components/game/european-bollards/description.mdx";
import { EuropeanBollardsGame } from "@/components/game/european-bollards/game";

export const geoguessrGames: GameDefinition[] = [
  {
    name: "European Chevrons",
    description: "Which countries use the different chevron types?",
    slug: "european-chevrons",
    pages: {
      Description: EuropeanChevronsDescription,
      Game: EuropeanChevronsGame,
    },
  },
  {
    name: "European Guardrails",
    description:
      "Can you guess which countries use each of the three guardrail types?",
    slug: "european-guardrails",
    pages: {
      Description: EuropeanGuardrailsDescription,
      Game: EuropeanGuardrailsGame,
    },
  },
  {
    name: "European Pedestrian Signs",
    description:
      "Have you committed the pedestrian crossing sign stripe counts to memory?",
    slug: "european-pedestrians",
    pages: {
      Description: EuropeanPedestriansDescription,
      Game: EuropeanPedestriansGame,
    },
  },
  {
    name: "European Bollards",
    description:
      "Can you guess which countries use each of the different bollard types?",
    slug: "european-bollards",
    pages: {
      Description: EuropeanBollardsDescription,
      Game: EuropeanBollardsGame,
    },
  },
  {
    name: "Brazil Dialing Codes",
    description: "Can you guess the Brazilian dialing codes for each state?",
    slug: "brazil-dialing-codes",
    pages: {
      Description: BrazilDialingCodesDescription,
      Game: BrazilDialingCodesGame,
    },
  },
  {
    name: "Spain Dialing Codes",
    description: "How well do you know the Spanish dialing codes?",
    slug: "spain-dialing-codes",
    pages: {
      Description: SpainDialingCodesDescription,
      Game: SpainDialingCodesGame,
    },
  },
  {
    name: "US Dialing Codes",
    description: "How well do you know the United States dialing codes?",
    slug: "us-dialing-codes",
    pages: {
      Description: USDialingCodesDescription,
      Game: USDialingCodesGame,
    },
  },
] as const;
