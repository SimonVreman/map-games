import { City } from "@/lib/geonames/cities";
import { useAppStore } from "@/lib/store/provider";
import { normalize } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { ControlsBase } from "../controls-base";

export function CityCoverControls({
  cities,
  completion,
}: {
  cities: City[];
  completion: number;
}) {
  const [inputValue, setInputValue] = useState("");

  const [addCity, options, added] = useAppStore((s) => [
    s.cityCover.addCity,
    s.cityCover.options,
    s.cityCover.cities,
  ]);

  const coveredCities = cities.filter((c) =>
    added.some((a) => Math.abs(a.lat - c.lat) < (options?.bandSize ?? 0))
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
    toast.success("City discovered!");
  };

  return (
    <ControlsBase inputValue={inputValue} handleInputChange={handleInputChange}>
      <div className="leading-tight border-r pr-3">
        <p className="text-sm font-medium">Cities found</p>
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
