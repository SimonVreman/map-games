import { GameDefinition } from "./types";

enum Tag {
  // Geographical
  Europe = "Europe",
  Asia = "Asia",
  Americas = "Americas",
  // Type
  Signs = "Signs",
  Infra = "Infra",
  Admin = "Admin",
  Phone = "Phone",
}

export const geoguessrGames: GameDefinition[] = [
  {
    name: "European Chevrons",
    description: "Which countries use the different chevron types?",
    slug: "european-chevrons",
    tags: [Tag.Europe, Tag.Signs],
  },
  {
    name: "European Guardrails",
    description:
      "Can you guess which countries use each of the three guardrail types?",
    slug: "european-guardrails",
    tags: [Tag.Europe, Tag.Infra],
  },
  {
    name: "European Pedestrian Signs",
    description:
      "Have you committed the pedestrian crossing sign stripe counts to memory?",
    slug: "european-pedestrians",
    tags: [Tag.Europe, Tag.Signs],
  },
  {
    name: "European Bollards",
    description:
      "Can you guess which countries use each of the different bollard types?",
    slug: "european-bollards",
    tags: [Tag.Europe, Tag.Infra],
  },
  {
    name: "Brazil Dialing Codes",
    description: "Can you guess the Brazilian dialing codes for each state?",
    slug: "brazil-dialing-codes",
    tags: [Tag.Americas, Tag.Phone],
  },
  {
    name: "Spain Dialing Codes",
    description: "How well do you know the Spanish dialing codes?",
    slug: "spain-dialing-codes",
    tags: [Tag.Europe, Tag.Phone],
  },
  {
    name: "US Dialing Codes",
    description: "How well do you know the United States dialing codes?",
    slug: "us-dialing-codes",
    tags: [Tag.Americas, Tag.Phone],
  },
  {
    name: "Philippines Provinces",
    description: "Can you locate all 80 provinces of the Philippines?",
    slug: "philippines-provinces",
    tags: [Tag.Asia, Tag.Admin],
  },
  {
    name: "India States",
    description: "Can you locate all states and territories of India?",
    slug: "india-states",
    tags: [Tag.Asia, Tag.Admin],
  },
  {
    name: "Vietnam Provinces",
    description: "Can you locate all 58 provinces of Vietnam?",
    slug: "vietnam-provinces",
    tags: [Tag.Asia, Tag.Admin],
  },
  {
    name: "Thailand Provinces",
    description: "Can you locate all 76 provinces of Thailand?",
    slug: "thailand-provinces",
    tags: [Tag.Asia, Tag.Admin],
  },
] as const;
