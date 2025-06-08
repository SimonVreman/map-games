"use client";

import { Button } from "@/components/ui/button";
import { AppStore } from "@/lib/store";
import { GroupPinSliceName } from "@/lib/store/slice/group-pin";
import { useAppStore } from "@/lib/store/provider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function GroupPinSettings<TName extends GroupPinSliceName<AppStore>>({
  slug,
  store,
}: {
  slug: string;
  store: TName;
}) {
  const router = useRouter();
  const href = `/${slug}/play`;

  const [reset, canResume] = useAppStore((s) => [
    s[store].reset,
    s[store].guessed.length > 0 || s[store].streak > 0,
  ]);

  const handleStart = () => {
    reset();
    router.push(href);
  };

  return (
    <div className="flex gap-4 max-sm:flex-col max-sm:justify-stretch justify-end not-prose">
      {canResume && (
        <Button variant="secondary" size="lg" asChild>
          <Link href={href}>Resume</Link>
        </Button>
      )}
      <Button size="lg" onClick={handleStart}>
        Start game
      </Button>
    </div>
  );
}
