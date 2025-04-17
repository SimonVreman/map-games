"use client";

import { spainPhoneCodes } from "@/lib/mapping/spain/paths/phone-codes";
import { SvgMap } from "../svg-map";
import { SpainDialingCodesControls } from "./controls";
import { useAppStore } from "@/lib/store/provider";
import { toast } from "sonner";
import { SelectableRegions } from "../selectable-regions";

export function SpainDialingCodesGame() {
  const [guess, correct, highlighted, hints] = useAppStore((s) => [
    s.spainDialingCodes.guess,
    s.spainDialingCodes.code,
    s.spainDialingCodes.highlighted,
    s.spainDialingCodes.hints,
  ]);

  const handleGuess = (code: number) => {
    if (hints) return;
    const isCorrect = code === correct;

    if (isCorrect) toast.success("Correct!");
    else toast.error("Incorrect!");

    guess(code);
  };

  return (
    <div className="size-full relative">
      <SpainDialingCodesControls />

      <SvgMap
        className="pt-24"
        fontSize={2}
        bounds={{
          north: 44,
          west: -11,
          south: 35,
          east: 4,
          padding: 2,
        }}
        attribution={
          <a
            href="https://data.humdata.org/dataset/whosonfirst-data-admin-esp"
            target="_blank"
          >
            © OCHA
          </a>
        }
      >
        <SelectableRegions
          regions={spainPhoneCodes}
          hints={hints}
          highlighted={highlighted}
          getCodeGroup={(code) => code.toString().slice(0, 2)}
          onClick={handleGuess}
        />
      </SvgMap>
    </div>
  );
}
