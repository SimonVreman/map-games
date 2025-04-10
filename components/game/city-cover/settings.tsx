"use client";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useAppStore } from "@/lib/store/provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { GameSettingsBase, gameSettingsBaseSchema } from "../settings-base";

const options = {
  easy: { bandSize: 6 },
  medium: { bandSize: 3 },
  hard: { bandSize: 1 },
} as const;

export function CityCoverSettings({ className }: { className?: string }) {
  const router = useRouter();

  const [setOptions, reset, canResume] = useAppStore((s) => [
    s.cityCover.setOptions,
    s.cityCover.reset,
    s.cityCover.cities.length > 0,
  ]);

  const form = useAppForm({
    validators: { onChange: gameSettingsBaseSchema },
    defaultValues: { difficulty: "easy" },
    onSubmit: ({ value }) => {
      reset();
      setOptions(options[value.difficulty as keyof typeof options]);
      handleResume();
    },
  });

  const handleResume = () => {
    router.push("/city-cover/play");
  };

  return (
    <form.Form form={form} className={cn("space-y-6", className)}>
      <GameSettingsBase form={form} />
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
