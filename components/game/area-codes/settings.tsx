"use client";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { AppStore } from "@/lib/store";
import { AreaCodesSliceName } from "@/lib/store/game/area-codes";
import { useAppStore } from "@/lib/store/provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function AreaCodesSettings<TName extends AreaCodesSliceName<AppStore>>({
  href,
  store,
  className,
}: {
  href: string;
  store: TName;
  className?: string;
}) {
  const router = useRouter();

  const [reset, canResume] = useAppStore((s) => [
    s[store].reset,
    s[store].guesses.length > 0,
  ]);

  const form = useAppForm({
    onSubmit: () => {
      reset();
      handleResume();
    },
  });

  const handleResume = () => {
    router.push(href);
  };

  return (
    <form.Form form={form} className={cn("space-y-6", className)}>
      <div className="flex gap-4 max-sm:flex-col max-sm:justify-stretch justify-end">
        {canResume && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleResume}
          >
            Resume
          </Button>
        )}
        <form.Submit size="lg">Start game</form.Submit>
      </div>
    </form.Form>
  );
}
