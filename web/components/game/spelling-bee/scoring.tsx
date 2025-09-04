import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { wordScore } from "@/lib/store/game/spelling-bee";
import { useAppStore } from "@/lib/store/provider";
import { cn } from "@/lib/utils";

const ranks = [0, 0.05, 0.075, 0.15, 0.25, 0.4, 0.5, 0.7];

export function SpellingBeeScoring() {
  const [words, score, maxScore, options] = useAppStore((s) => [
    s.spellingBee.words,
    s.spellingBee.score,
    s.spellingBee.maxScore,
    s.spellingBee.options,
  ]);

  const progress = score ? score / (maxScore ?? 1) : 0;
  const wordScores =
    words?.map((w) => wordScore({ word: w, options: options ?? "" })) ?? [];

  return (
    <>
      <div className="w-full h-8 max-w-lg relative select-none">
        <div className="absolute flex items-center size-full">
          <div className="h-0.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>
        <div className="absolute size-full flex justify-between items-center top-0">
          {ranks.map((r, i) => {
            const isActive = progress >= r && progress < (ranks[i + 1] ?? 1);
            return (
              <div
                key={r}
                className={cn(
                  "relative size-2 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center transition-all duration-300",
                  {
                    "bg-yellow-300 dark:bg-purple-900": progress >= r,
                    "size-8": isActive,
                  }
                )}
              >
                <span
                  className={cn(
                    "text-center text-sm opacity-0 transition-opacity duration-300",
                    { "opacity-100": isActive }
                  )}
                >
                  {score ?? 0}
                </span>

                <span
                  className={cn(
                    "absolute size-full flex justify-center items-center bottom-4 text-xs text-muted-foreground transition-opacity",
                    isActive ? "opacity-0" : "opacity-100"
                  )}
                >
                  {Math.round(r * (maxScore ?? 0))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-lg h-14 relative">
        <Accordion
          type="single"
          collapsible
          className="w-full absolute backdrop-blur-md bg-background/50"
        >
          <AccordionItem value="score">
            <AccordionTrigger
              className={cn("items-center text-base min-w-0", {
                "text-muted-foreground": !words?.length,
              })}
            >
              <span className="min-w-0 truncate shrink">
                {!!words?.length
                  ? [...new Array(Math.min(words.length, 25))].map((_, i) => {
                      const wordIndex = words.length - i - 1;
                      const word = words[wordIndex];
                      const score = wordScores[wordIndex];

                      return (
                        <span key={i}>
                          <span
                            className={cn({ "font-bold": score > word.length })}
                          >
                            {word[0].toUpperCase()}
                            {word.slice(1)}
                          </span>
                          {i < words.length - 1 ? ", " : " "}
                        </span>
                      );
                    })
                  : "Begin met spel(l)en!"}
              </span>
            </AccordionTrigger>
            <AccordionContent className="w-full p-4 grid gap-2 text-base grid-cols-2 border-b max-h-[400px] overflow-y-scroll">
              {words?.map((w, i) => (
                <div key={w} className="">
                  <span
                    className={cn("mr-2", {
                      "font-bold": wordScores[i] > w.length,
                    })}
                  >
                    {w[0].toUpperCase() + w.slice(1)}
                  </span>
                  <span className="text-muted-foreground">
                    {wordScore({ word: w, options: options ?? "" })}
                  </span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
