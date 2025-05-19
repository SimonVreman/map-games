import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { usPaths } from "@/lib/mapping/us/paths/country";
import { usDivider } from "@/lib/mapping/us/paths/divider";
import { usPhoneCodes } from "@/lib/mapping/us/paths/phone-codes";
import { usStatesPaths } from "@/lib/mapping/us/paths/states";
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
      country={usPaths}
      firstAdministrative={usStatesPaths}
      divider={usDivider}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(code) => code.toString()[0]}
      onClick={handleGuess}
    />
  );
}
