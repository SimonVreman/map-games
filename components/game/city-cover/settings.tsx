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
  easy: { bandSize: 6 },
  medium: { bandSize: 3 },
  hard: { bandSize: 1 },
} as const;

export function CityCoverSettings({ className }: { className?: string }) {
  const router = useRouter();
  const setOptions = useAppStore((state) => state.cityCover.setOptions);

  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      difficulty: "easy",
    },
    onSubmit: ({ value }) => {
      setOptions(options[value.difficulty as keyof typeof options]);
      router.push("/city-cover/play");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form className={cn("space-y-6", className)} onSubmit={handleSubmit}>
      <form.AppField
        name="difficulty"
        children={(field) => (
          <field.FormItem className="space-y-3">
            <field.FormLabel className="sr-only">
              Choose your difficulty
            </field.FormLabel>
            <field.FormControl>
              <RadioGroup
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                onBlur={field.handleBlur}
                className="grid gap-2 grid-cols-3 text-center"
              >
                <field.FormItem>
                  <field.FormControl className="hidden">
                    <RadioGroupItem value="easy" />
                  </field.FormControl>
                  <field.FormLabel
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
                  </field.FormLabel>
                </field.FormItem>
                <field.FormItem>
                  <field.FormControl className="hidden">
                    <RadioGroupItem value="medium" />
                  </field.FormControl>
                  <field.FormLabel
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
                  </field.FormLabel>
                </field.FormItem>
                <field.FormItem>
                  <field.FormControl className="hidden">
                    <RadioGroupItem value="hard" />
                  </field.FormControl>
                  <field.FormLabel
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
                  </field.FormLabel>
                </field.FormItem>
              </RadioGroup>
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
        )}
      />

      <Button type="submit" size={"lg"}>
        Start game
      </Button>
    </form>
  );
}
