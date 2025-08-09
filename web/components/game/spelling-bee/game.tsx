import { useAppStore } from "@/lib/store/provider";
import { cache, use } from "react";
import { Beehive } from "./beehive";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { SpellingBeeScoring } from "./scoring";
import { SpellingBeeMenu } from "./menu";

const fetchWordlist = cache(async () => ({
  wordlist: await fetch("/assets/words.txt").then(async (r) => {
    const text = await r.text();
    return text.split("\n");
  }),
}));

const wordlistPromise = fetchWordlist();

export default function SpellingBeeGame() {
  const { wordlist } = use(wordlistPromise);

  const [selection, options, select, remove, submit, shuffle] = useAppStore(
    (s) => [
      s.spellingBee.selection,
      s.spellingBee.options,
      s.spellingBee.select,
      s.spellingBee.remove,
      s.spellingBee.submit,
      s.spellingBee.shuffle,
    ]
  );

  return (
    <div className="size-full relative overflow-hidden">
      <div className="flex flex-col size-full items-center p-6">
        <SpellingBeeMenu wordlist={wordlist} />

        <SpellingBeeScoring />

        <div className="h-12 w-full flex items-center justify-center max-w-full mb-6">
          <p
            className={cn(
              "text-3xl uppercase font-bold break-words text-center max-w-full transition-all",
              {
                "text-2xl": selection != null && selection?.length > 10,
                "text-xl": selection != null && selection?.length > 20,
              }
            )}
          >
            {selection}
          </p>
          {options == null && (
            <p className="font-medium">Reset (rechtsboven) om te beginnen!</p>
          )}
        </div>

        <Beehive letters={options ?? ""} onLetterClick={select} />

        <div className="grid grid-cols-5 gap-2 mt-8 items-center">
          <Button
            variant="outline"
            size="lg"
            className="col-span-2"
            onClick={() => remove()}
          >
            Verwijder
          </Button>
          <Button variant="outline" size="lg" onClick={() => shuffle()}>
            <RefreshCwIcon />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="col-span-2"
            onClick={() => {
              const error = submit({ wordlist });
              if (error != null) toast.error(error, { duration: 1500 });
              else toast.success("Gevonden!", { duration: 1000 });
            }}
          >
            Probeer
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 text-sm text-muted-foreground pr-1">
        <a
          href="https://github.com/OpenTaal/opentaal-wordlist"
          className="underline"
        >
          Nederlandse woordenlijst
        </a>{" "}
        © OpenTaal,{" "}
        <a
          href="https://opensource.org/licenses/BSD-3-Clause."
          className="underline"
        >
          BSD-3-Clause
        </a>
      </div>
    </div>
  );
}
