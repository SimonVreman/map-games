import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { usDivider } from "@/lib/mapping/us/paths/divider";
import { usPhoneCodes } from "@/lib/mapping/us/paths/phone-codes";
import { useHandleSingleGuess } from "../single-pin/guess";
import { useAppStore } from "@/lib/store/provider";

export default function USDialingCodesRendering() {
  const [highlighted, hints] = useAppStore((s) => [
    s.usDialingCodes.highlighted,
    s.usDialingCodes.hints,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "usDialingCodes",
  });

  return (
    <SelectableRegions
      regions={usPhoneCodes}
      divider={usDivider}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(codes) => +codes[0].toString()[0]}
      onClick={handleGuess}
    />
  );
}
