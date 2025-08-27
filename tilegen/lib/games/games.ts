import {
  europeanBollardsLayer,
  europeanBollardsMeta,
} from "./european-bollards";
import {
  europeanChevronsLayer,
  europeanChevronsMeta,
} from "./european-chevrons";
import {
  europeanGuardrailsLayer,
  europeanGuardrailsMeta,
} from "./european-guardrails";
import {
  europeanPedestriansLayer,
  europeanPedestriansMeta,
} from "./european-pedestrians";
import { europeanCountriesLayer } from "./shared/european-countries";

type FileFn = (output: string) => Promise<void>;

export const games: {
  id: string;
  meta?: FileFn;
  layers: { labels?: FileFn; subjects: FileFn };
}[] = [
  {
    id: "european-chevrons",
    meta: europeanChevronsMeta,
    layers: { subjects: europeanChevronsLayer },
  },
  {
    id: "european-pedestrians",
    meta: europeanPedestriansMeta,
    layers: { subjects: europeanPedestriansLayer },
  },
  {
    id: "european-bollards",
    meta: europeanBollardsMeta,
    layers: { subjects: europeanBollardsLayer },
  },
  {
    id: "european-guardrails",
    meta: europeanGuardrailsMeta,
    layers: { subjects: europeanGuardrailsLayer },
  },
];

export const gameTargets: {
  id: string;
  targets: FileFn;
}[] = [
  {
    id: "european-countries",
    targets: europeanCountriesLayer,
  },
];
