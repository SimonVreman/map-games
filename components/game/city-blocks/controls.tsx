import { City } from "@/lib/geonames/cities";
import { useAppStore } from "@/lib/store/provider";
import { normalize } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { blockForCity } from "./blocks";
import { ControlsBase } from "../controls-base";

export function CityBlocksControls({
  cities,
  completion,
}: {
  cities: City[];
  completion: number;
}) {
  const [inputValue, setInputValue] = useState("");

  const [addCity, blockSize, added] = useAppStore((s) => [
    s.cityBlocks.addCity,
    s.cityBlocks.options?.blockSize ?? 1,
    s.cityBlocks.cities,
  ]);

  const coveredCities = cities.filter((c) =>
    added.some((a) => {
      const blockA = blockForCity({ city: a, blockSize });
      const blockC = blockForCity({ city: c, blockSize });
      return blockA[0] === blockC[0] && blockA[1] === blockC[1];
    })
  ).length;

  const handleInputChange = (value: string) => {
    const matches = cities.filter(
      (c) => c.normalizedName === normalize(value) && !added.includes(c)
    );

    if (matches.length === 0) {
      setInputValue(value);
      return;
    } else {
      setInputValue("");
    }

    for (const city of matches) addCity(city);
    toast.success("City is covered!");
  };

  return (
    <ControlsBase inputValue={inputValue} handleInputChange={handleInputChange}>
      <div className="leading-tight border-r pr-3">
        <p className="text-sm font-medium">Cities covered</p>
        <p className="font-medium">
          {coveredCities}
          <span className="text-sm text-muted-foreground">
            /{cities.length}
          </span>
        </p>
      </div>

      <div className="leading-tight pl-3">
        <p className="text-sm font-medium">Area covered</p>
        <p className="font-medium">
          {(completion * 100).toFixed(2)}
          <span className="text-sm text-muted-foreground">%</span>
        </p>
      </div>
    </ControlsBase>
  );
}
