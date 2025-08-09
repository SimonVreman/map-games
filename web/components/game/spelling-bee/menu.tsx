import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/provider";
import { ChevronLeft, RotateCwIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function SpellingBeeMenu({ wordlist }: { wordlist: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [reset, start] = useAppStore((s) => [
    s.spellingBee.reset,
    s.spellingBee.start,
  ]);

  const handleQuit = () =>
    router.push(pathname.split("/").slice(0, -1).join("/"));
  const handleReset = () => {
    reset();
    start({ wordlist });
  };

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
