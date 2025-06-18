import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { useHandleSingleGuess } from "../single-pin/guess";
import { useAppStore } from "@/lib/store/provider";
import { brazilPhoneCodes } from "@/lib/mapping/brazil/paths/phone-codes";
import { brazilStatesPaths } from "@/lib/mapping/brazil/paths/states";
import { brazilPaths } from "@/lib/mapping/brazil/paths/country";
import { brazilPhoneCodeSubsets } from "@/lib/mapping/brazil/registry/phone-codes";

export function BrazilDialingCodesRendering() {
  const [highlighted, hints, enabledSubsets] = useAppStore((s) => [
    s.brazilDialingCodes.highlighted,
    s.brazilDialingCodes.hints,
    s.brazilDialingCodes.enabledSubsets,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "brazilDialingCodes",
  });

  const enabled = brazilPhoneCodeSubsets.flatMap((s) =>
    enabledSubsets.includes(s.key) ? s.codes : []
  );

  return (
    <SelectableRegions
      regions={brazilPhoneCodes}
      enabled={enabled}
      country={brazilPaths}
      firstSubdivision={brazilStatesPaths}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(codes) => +codes[0].toString()[0]}
      onClick={handleGuess}
    />
  );
}
