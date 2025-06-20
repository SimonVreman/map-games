"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PlayButton({ slug }: { slug: string }) {
  return (
    <div className="flex max-sm:flex-col max-sm:justify-stretch justify-end not-prose">
      <Button size="lg" asChild>
        <Link href={`/${slug}/play`}>Start</Link>
      </Button>
    </div>
  );
}
