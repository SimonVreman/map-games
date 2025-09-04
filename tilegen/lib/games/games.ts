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
import {
  spainDialingCodesMeta,
  spainDialingCodesSubjectsLayer,
  spainDialingCodesTargetsLayer,
} from "./spain-dialing-codes";

type FileFn = (output: string) => Promise<void>;

export const games: {
  id: string;
  meta: FileFn;
  layers: { targets?: FileFn; subjects: FileFn };
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
  {
    id: "spain-dialing-codes",
    meta: spainDialingCodesMeta,
    layers: {
      subjects: spainDialingCodesSubjectsLayer,
      targets: spainDialingCodesTargetsLayer,
    },
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
