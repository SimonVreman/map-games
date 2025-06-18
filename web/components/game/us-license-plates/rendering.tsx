import { useAppStore } from "@/lib/store/provider";
import { useHandleGroupGuess } from "../group-pin/guess";
import { SelectablePatterns } from "@/components/canvas/game/selectable-patterns";
import { usLicensePlates } from "@/lib/mapping/us/registry/license-plates";
import { Sprites } from "@/types/registry";
import { Outlines } from "@/components/canvas/game/outlines";
import { usPaths } from "@/lib/mapping/us/paths/country";
import { usStatesPaths } from "@/lib/mapping/us/paths/state-boundaries";
import { usDivider } from "@/lib/mapping/us/paths/divider";

const outlinesRenderKey = {
  key: "us-license-plates:outlines",
  order: 3,
  layer: 0,
};

export function USLicensePlatesRendering({ sprites }: { sprites: Sprites }) {
  const [highlighted, hints] = useAppStore((s) => [
    s.usLicensePlates.highlighted,
    s.usLicensePlates.hints,
  ]);

  const { handleGuess } = useHandleGroupGuess({
    store: "usLicensePlates",
    targets: usLicensePlates.entries,
  });

  return (
    <>
      <SelectablePatterns
        {...usLicensePlates}
        sprites={sprites}
        isHighlighted={(name) => highlighted.includes(name) || hints}
        onClick={handleGuess}
      />
      <Outlines
        renderKey={outlinesRenderKey}
        external={usPaths}
        internal={usStatesPaths}
        divider={usDivider}
      />
    </>
  );
}
