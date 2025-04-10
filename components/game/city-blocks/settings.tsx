"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useAppStore } from "@/lib/store/provider";
import { cn } from "@/lib/utils";
import { FlameIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]),
});

const options = {
  easy: { blockSize: 8 },
  medium: { blockSize: 5 },
  hard: { blockSize: 2 },
} as const;

export function CityBlocksSettings({ className }: { className?: string }) {
  const router = useRouter();

  const [setOptions, reset, canResume] = useAppStore((s) => [
    s.cityBlocks.setOptions,
    s.cityBlocks.reset,
    s.cityBlocks.cities.length > 0,
  ]);

  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      difficulty: "easy",
    },
    onSubmit: ({ value }) => {
      reset();
      setOptions(options[value.difficulty as keyof typeof options]);
      handleResume();
    },
  });

  const handleResume = () => {
    router.push("/city-blocks/play");
  };

  return (
    <form.Form form={form} className={cn("space-y-6", className)}>
      <form.AppField name="difficulty">
        {(field) => (
          <field.Item className="space-y-3">
            <field.Label className="sr-only">
              Choose your difficulty
            </field.Label>
            <field.Control>
              <RadioGroup
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                onBlur={field.handleBlur}
                className="grid gap-2 grid-cols-3 text-center"
              >
                <field.Item>
                  <field.Control className="hidden">
                    <RadioGroupItem value="easy" />
                  </field.Control>
                  <field.Label
                    className={cn(
                      "border border-input flex flex-col items-center justify-center gap-1 px-2 py-4 rounded-md hover:bg-green-50 dark:hover:bg-green-950 transition-colors",
                      {
                        "border-green-700 bg-green-50 dark:bg-green-950":
                          field.state.value === "easy",
                      }
                    )}
                  >
                    <SparklesIcon className="size-8 stroke-1 text-green-700" />
                    <p className="text-lg font-medium text-foreground">Easy</p>
                    <p className="text-muted-foreground">
                      Perfect for beginners
                    </p>
                  </field.Label>
                </field.Item>
                <field.Item>
                  <field.Control className="hidden">
                    <RadioGroupItem value="medium" />
                  </field.Control>
                  <field.Label
                    className={cn(
                      "border border-input flex flex-col items-center justify-center gap-1 px-2 py-4 rounded-md hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-colors",
                      {
                        "border-yellow-700 bg-yellow-50 dark:bg-yellow-950":
                          field.state.value === "medium",
                      }
                    )}
                  >
                    <FlameIcon className="size-8 stroke-1 text-yellow-700" />
                    <p className="text-lg font-medium text-foreground">
                      Medium
                    </p>
                    <p className="text-muted-foreground">Balanced challenge</p>
                  </field.Label>
                </field.Item>
                <field.Item>
                  <field.Control className="hidden">
                    <RadioGroupItem value="hard" />
                  </field.Control>
                  <field.Label
                    className={cn(
                      "border border-input flex flex-col items-center justify-center gap-1 px-2 py-4 rounded-md hover:bg-red-50 dark:hover:bg-red-950 transition-colors",
                      {
                        "border-red-700 bg-red-50 dark:bg-red-950":
                          field.state.value === "hard",
                      }
                    )}
                  >
                    <FlameIcon className="size-8 stroke-1 text-red-700" />
                    <p className="text-lg font-medium text-foreground">Hard</p>
                    <p className="text-muted-foreground">Close to impossible</p>
                  </field.Label>
                </field.Item>
              </RadioGroup>
            </field.Control>
            <field.Message />
          </field.Item>
        )}
      </form.AppField>

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
