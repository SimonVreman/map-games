import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { useHandleSingleGuess } from "../single-pin/guess";
import { useAppStore } from "@/lib/store/provider";
import { spainPhoneCodes } from "@/lib/mapping/spain/paths/phone-codes";
import { spainDivider } from "@/lib/mapping/spain/paths/divider";
import { spainProvincesPaths } from "@/lib/mapping/spain/paths/provinces";
import { spainPaths } from "@/lib/mapping/spain/paths/country";
import { spainPhoneCodeSubsets } from "@/lib/mapping/spain/registry/phone-codes";

export default function SpainDialingCodesRendering() {
  const [highlighted, hints, enabledSubsets] = useAppStore((s) => [
    s.spainDialingCodes.highlighted,
    s.spainDialingCodes.hints,
    s.spainDialingCodes.enabledSubsets,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "spainDialingCodes",
  });

  const enabled = spainPhoneCodeSubsets.flatMap((s) =>
    enabledSubsets.includes(s.key) ? s.codes : []
  );

  return (
    <SelectableRegions
      regions={spainPhoneCodes}
      enabled={enabled}
      country={spainPaths}
      firstSubdivision={spainProvincesPaths}
      divider={spainDivider}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(codes) => +codes[0].toString()[1]}
      onClick={handleGuess}
    />
  );
}
