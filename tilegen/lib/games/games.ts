import type { QuizDefinition } from "./types";
import { brazilDialingCodesDefinition } from "./brazil-dialing-codes";
import { philippinesProvincesDefinition } from "./philippines-provinces";
import { europeanCountriesLayer } from "./shared/european-countries";
import { spainDialingCodesDefinition } from "./spain-dialing-codes";
import { usDialingCodesDefinition } from "./us-dialing-codes";
import { europeanBollardsDefinition } from "./european-bollards";
import { europeanChevronsDefinition } from "./european-chevrons";
import { europeanGuardrailsDefinition } from "./european-guardrails";
import { europeanPedestriansDefinition } from "./european-pedestrians";

export const games: QuizDefinition[] = [
  europeanBollardsDefinition,
  europeanChevronsDefinition,
  europeanGuardrailsDefinition,
  europeanPedestriansDefinition,
  spainDialingCodesDefinition,
  usDialingCodesDefinition,
  brazilDialingCodesDefinition,
  philippinesProvincesDefinition,
];

export const gameTargets: {
  slug: string;
  targets: (output: string) => Promise<void>;
}[] = [
  {
    slug: "european-countries",
    targets: europeanCountriesLayer,
  },
];
