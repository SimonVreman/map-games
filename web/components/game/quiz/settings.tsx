import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useQuizStore } from "@/lib/store/quiz-provider";
import { cn } from "@/lib/utils";
import { QuizSubset } from "@/types/registry";
import { useRouter } from "next/navigation";
import { z } from "zod";

export function QuizSettings({ subsets }: { subsets: QuizSubset[] }) {
  const open = useQuizStore(
    (s) => s.nextSubjects.length === 0 && s.stats.total === 0
  );

  return (
    <Dialog open={open}>
      <DialogContent canClose={false}>
        <DialogHeader>
          <DialogTitle>Start a new game</DialogTitle>
          <DialogDescription>
            Do you want to practice, or go for a perfect score?
          </DialogDescription>
        </DialogHeader>
        <SettingsForm subsets={subsets} />
      </DialogContent>
    </Dialog>
  );
}

const SettingsSchema = z.object({
  mode: z.enum(["quiz", "practice", "infinite"]),
  subsets: z
    .array(z.object({ id: z.string(), enabled: z.boolean() }))
    .refine((arr) => arr.some((s) => s.enabled), {
      message: "At least one subset must be enabled",
    }),
});

type Mode = z.infer<typeof SettingsSchema>["mode"];

function SettingsForm({ subsets }: { subsets: QuizSubset[] }) {
  const router = useRouter();
  const [start, mode, subsetsEnabled] = useQuizStore((s) => [
    s.start,
    s.mode,
    s.subsetsEnabled,
  ]);

  const form = useAppForm({
    validators: { onChange: SettingsSchema },
    defaultValues: {
      mode: mode ?? ("quiz" as Mode),
      subsets: subsets.map((s) => ({
        id: s.id,
        enabled: subsetsEnabled.includes(s.id),
      })),
    },
    onSubmit: ({ value: { mode, subsets } }) => {
      start({
        mode,
        subsetsEnabled: subsets.filter((s) => s.enabled).map((s) => s.id),
      });
    },
  });

  return (
    <form.Form form={form} className="space-y-6">
      <form.AppField name="mode">
        {(field) => (
          <field.Item>
            <field.Label className="sr-only">mode</field.Label>
            <field.Control>
              <Tabs
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value as Mode)}
                onBlur={field.handleBlur}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                  <TabsTrigger value="infinite">Infinite</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="quiz"
                  className="text-muted-foreground text-sm"
                >
                  Check what you know, and which ones you have to practice.
                </TabsContent>
                <TabsContent
                  value="practice"
                  className="text-muted-foreground text-sm"
                >
                  Similar to quiz mode, but if you answer incorrectly you will
                  be asked again later.
                </TabsContent>
                <TabsContent
                  value="infinite"
                  className="text-muted-foreground text-sm"
                >
                  Never ending. Go for the highest streak, or just keep going
                  without interruptions.
                </TabsContent>
              </Tabs>
            </field.Control>
          </field.Item>
        )}
      </form.AppField>

      {subsets.length > 1 && (
        <form.AppField name="subsets" mode="array">
          {(field) => (
            <field.Item>
              <field.Label>What do you want to practice?</field.Label>

              <div className="divide-y">
                {field.state.value.map((_, i) => {
                  const subset = subsets.find(
                    (s) => s.id === field.state.value[i].id
                  );
                  return (
                    <form.Field key={i} name={`subsets[${i}].enabled`}>
                      {(subField) => {
                        return (
                          <field.Item className="py-2">
                            <div className="flex items-center justify-between gap-2">
                              <field.Label
                                className={cn("font-normal", {
                                  "text-muted-foreground":
                                    !subField.state.value,
                                })}
                              >
                                {subset?.label}
                                <span className="ml-1 text-muted-foreground text-xs">
                                  ({subset?.subjects.length ?? "-"})
                                </span>
                              </field.Label>
                              <field.Control>
                                <Switch
                                  checked={subField.state.value}
                                  onCheckedChange={subField.handleChange}
                                />
                              </field.Control>
                            </div>
                          </field.Item>
                        );
                      }}
                    </form.Field>
                  );
                })}
              </div>
              <field.Message />
            </field.Item>
          )}
        </form.AppField>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button variant="secondary" onClick={() => router.back()} type="button">
          Back
        </Button>
        <form.Submit>Start</form.Submit>
      </div>
    </form.Form>
  );
}
