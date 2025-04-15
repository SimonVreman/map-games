"use client";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { AppStore } from "@/lib/store";
import { GroupPinSliceName } from "@/lib/store/slice/group-pin";
import { useAppStore } from "@/lib/store/provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function GroupPinSettings<TName extends GroupPinSliceName<AppStore>>({
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
    s[store].guessed.length > 0 || s[store].streak > 0,
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
