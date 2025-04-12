"use client";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useAppStore } from "@/lib/store/provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function BrazilTelephoneCodesSettings({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();

  const [reset, canResume] = useAppStore((s) => [
    s.brazilTelephoneCodes.reset,
    s.brazilTelephoneCodes.guesses.length > 0,
  ]);

  const form = useAppForm({
    onSubmit: () => {
      reset();
      handleResume();
    },
  });

  const handleResume = () => {
    router.push("/brazil-telephone-codes/play");
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
