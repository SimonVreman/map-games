import { Input } from "@/components/ui/input";
import { City } from "@/lib/geonames/citites";
import { useAppStore } from "@/lib/store/provider";
import { normalize } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { blockForCity } from "./blocks";

export function CityBlocksControls({
  cities,
  completion,
}: {
  cities: City[];
  completion: number;
}) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

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

    for (const city of matches) addCity(city);
    toast.success("City is covered!");
  };

  return (
    <div className="absolute inset-x-0 top-0 z-10 p-6 max-sm:p-2 flex items-center justify-center">
      <div className="max-sm:flex-col-reverse flex items-center max-sm:gap-2 gap-4 w-full max-w-screen-md">
        <Input
          value={inputValue}
          placeholder="Enter city name"
          className="bg-background dark:bg-background shadow-md h-14 grow md:text-md"
          onChange={handleInputChange}
        />

        <div className="flex items-center max-sm:justify-between max-sm:gap-2 gap-4 max-sm:w-full">
          <div className="rounded-md shadow-md bg-background px-3 py-2 h-14 flex items-center whitespace-nowrap">
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
          </div>

          <div className="bg-background rounded-md shadow-md size-14 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/city-blocks")}
            >
              <XIcon className="size-6 stroke-[1.5]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
