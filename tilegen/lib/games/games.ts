import { europeanChevronsLayer } from "./european-chevrons";
import { europeanPedestriansLayer } from "./european-pedestrians";

type LayerFn = (output: string) => Promise<void>;

export const games: {
  id: string;
  layers: { labels?: LayerFn; targets: LayerFn };
}[] = [
  {
    id: "european-chevrons",
    layers: { targets: europeanChevronsLayer },
  },
  {
    id: "european-pedestrians",
    layers: { targets: europeanPedestriansLayer },
  },
];
