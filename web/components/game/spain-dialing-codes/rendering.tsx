import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { useHandleSingleGuess } from "../single-pin/guess";
import { useAppStore } from "@/lib/store/provider";
import { spainPhoneCodes } from "@/lib/mapping/spain/paths/phone-codes";
import { spainDivider } from "@/lib/mapping/spain/paths/divider";

export default function SpainDialingCodesRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.spainDialingCodes.highlighted,
    s.spainDialingCodes.hints,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "spainDialingCodes",
  });

  return (
    <SelectableRegions
      regions={spainPhoneCodes}
      divider={spainDivider}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(codes) => +codes[0].toString()[1]}
      onClick={handleGuess}
    />
  );
}
