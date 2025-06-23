import { GameDefinition } from "./types";

export const geoguessrGames: GameDefinition[] = [
  {
    name: "European Chevrons",
    description: "Which countries use the different chevron types?",
    slug: "european-chevrons",
  },
  {
    name: "European Guardrails",
    description:
      "Can you guess which countries use each of the three guardrail types?",
    slug: "european-guardrails",
  },
  {
    name: "European Pedestrian Signs",
    description:
      "Have you committed the pedestrian crossing sign stripe counts to memory?",
    slug: "european-pedestrians",
  },
  {
    name: "European Bollards",
    description:
      "Can you guess which countries use each of the different bollard types?",
    slug: "european-bollards",
  },
  {
    name: "Brazil Dialing Codes",
    description: "Can you guess the Brazilian dialing codes for each state?",
    slug: "brazil-dialing-codes",
  },
  {
    name: "Spain Dialing Codes",
    description: "How well do you know the Spanish dialing codes?",
    slug: "spain-dialing-codes",
  },
  {
    name: "US Dialing Codes",
    description: "How well do you know the United States dialing codes?",
    slug: "us-dialing-codes",
  },
  {
    name: "US License Plates",
    description: "Can you recognize the US license plates when blurred?",
    slug: "us-license-plates",
  },
] as const;
