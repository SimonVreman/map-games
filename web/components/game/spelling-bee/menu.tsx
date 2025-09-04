import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/provider";
import { ChevronLeft, RotateCwIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useLayoutEffect } from "react";

export function SpellingBeeMenu({ wordlist }: { wordlist: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [reset, start, options] = useAppStore((s) => [
    s.spellingBee.reset,
    s.spellingBee.start,
    s.spellingBee.options,
  ]);

  const handleQuit = () =>
    router.push(pathname.split("/").slice(0, -1).join("/"));
  const handleReset = useCallback(() => {
    reset();
    start({ wordlist });
  }, [reset, start, wordlist]);

  useLayoutEffect(() => {
    if (options == null) handleReset();
  }, [options, handleReset]);

  return (
    <div className="w-full max-w-lg flex justify-between mb-4">
      <Button variant="ghost" onClick={handleQuit}>
        <ChevronLeft />
        <span className="sr-only">back</span>
      </Button>

      <Button variant="ghost" onClick={handleReset}>
        <span className="sr-only">reset</span>
        <RotateCwIcon />
      </Button>
    </div>
  );
}
