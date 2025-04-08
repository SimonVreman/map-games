import { Input } from "@/components/ui/input";
import { City } from "@/lib/geonames/citites";
import { useAppStore } from "@/lib/store/provider";
import { normalize } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export function CityCoverControls({
  cities,
  completion,
}: {
  cities: City[];
  completion: number;
}) {
  const [inputValue, setInputValue] = useState("");
  const add = useAppStore((s) => s.cityCover.addCity);
  const bandSize = useAppStore((s) => s.cityCover.options.bandSize);
  const added = useAppStore((s) => s.cityCover.cities);

  const coveredCities = cities.filter((c) =>
    added.some((a) => Math.abs(a.lat - c.lat) < bandSize)
  ).length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const matches = cities.filter(
      (c) =>
        c.normalizedName === normalize(e.target.value) && !added.includes(c)
    );

    if (matches.length === 0) {
      setInputValue(e.target.value);
      return;
    } else {
      setInputValue("");
    }

    for (const city of matches) add(city);
    toast.success("City discovered!");
  };

  return (
    <div className="absolute inset-x-0 top-0 z-10 p-6 max-sm:p-2 flex items-center justify-center">
      <div className="max-sm:flex-col-reverse flex items-center max-sm:gap-2 gap-4 w-full max-w-screen-md">
        <Input
          value={inputValue}
          placeholder="Enter city name"
          className="bg-neutral-50 shadow-xl h-14 grow md:text-md"
          onChange={handleInputChange}
        />

        <div className="rounded-md shadow-xl bg-neutral-50 px-3 py-2 h-14 flex items-center whitespace-nowrap max-sm:w-full">
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
        </div>
      </div>
    </div>
  );
}
