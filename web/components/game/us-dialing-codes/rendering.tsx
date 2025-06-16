import { SelectableRegions } from "@/components/canvas/game/selectable-regions";
import { usDivider } from "@/lib/mapping/us/paths/divider";
import { usPhoneCodes } from "@/lib/mapping/us/paths/phone-codes";
import { useHandleSingleGuess } from "../single-pin/guess";
import { useAppStore } from "@/lib/store/provider";
import { usPaths } from "@/lib/mapping/us/paths/country";
import { usStatesPaths } from "@/lib/mapping/us/paths/states";
import { usPhoneCodeSubsets } from "@/lib/mapping/us/registry/phone-codes";

export default function USDialingCodesRendering() {
  const [highlighted, hints, enabledSubsets] = useAppStore((s) => [
    s.usDialingCodes.highlighted,
    s.usDialingCodes.hints,
    s.usDialingCodes.enabledSubsets,
  ]);

  const { handleGuess } = useHandleSingleGuess({
    store: "usDialingCodes",
  });

  const enabled = usPhoneCodeSubsets.flatMap((s) =>
    enabledSubsets.includes(s.key) ? s.codes : []
  );

  return (
    <SelectableRegions
      regions={usPhoneCodes}
      enabled={enabled}
      country={usPaths}
      firstSubdivision={usStatesPaths}
      divider={usDivider}
      hints={hints}
      highlighted={highlighted}
      getCodeGroup={(codes) =>
        usPhoneCodeSubsets.findIndex((s) =>
          s.codes.some((c) => codes.includes(c))
        )
      }
      onClick={handleGuess}
    />
  );
}
