import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { useHandleSingleGuess } from "../single-pin/guess";
import { useAppStore } from "@/lib/store/provider";
import { brazilPhoneCodes } from "@/lib/mapping/brazil/paths/phone-codes";

export default function BrazilDialingCodesRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.brazilDialingCodes.highlighted,
    s.brazilDialingCodes.hints,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "brazilDialingCodes",
  });

  return (
    <SelectableRegions
      regions={brazilPhoneCodes}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(codes) => +codes[0].toString()[0]}
      onClick={handleGuess}
    />
  );
}
