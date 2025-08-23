"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GameErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 p-4 flex items-center justify-center flex-col gap-2">
      <XIcon />
      <span className="text-center">
        Something went wrong while loading the game.
      </span>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
