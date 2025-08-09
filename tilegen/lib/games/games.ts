import { europeanChevronsLayer } from "./european-chevrons";

type LayerFn = (output: string) => Promise<void>;

export const games: {
  id: string;
  layers: { labels?: LayerFn; targets: LayerFn };
}[] = [
  {
    id: "european-chevrons",
    layers: { targets: europeanChevronsLayer },
  },
];
