import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { useRouter } from "next/navigation";

export function QuizResults<TName extends QuizSliceName<AppStore>>({
  store,
}: {
  store: TName;
}) {
  const router = useRouter();
  const [open, reset] = useAppStore((s) => [
    s[store].nextSubjects.length === 0 && s[store].stats.total > 0,
    s[store].reset,
  ]);

  return (
    <Dialog open={open}>
      <DialogContent canClose={false}>
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
          <DialogDescription>
            You can probably do better (or faster). Go again!
          </DialogDescription>
        </DialogHeader>

        <Statistics store={store} />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => reset()}>Play again</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Statistics<TName extends QuizSliceName<AppStore>>({
  store,
}: {
  store: TName;
}) {
  const stats = useAppStore((s) => s[store].stats);

  const accuracy = ((stats.correct / stats.total) * 100).toLocaleString(
    undefined,
    { maximumFractionDigits: 1, minimumFractionDigits: 1 }
  );
  const mistakes = stats.incorrect;
  const usedHints = stats.usedHints;
  const longestStreak = stats.maxStreak;

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatBlock stat={accuracy} unit="%" label="Accuracy" />
      <StatBlock stat={longestStreak.toString()} label="Longest streak" />
      <StatBlock stat={usedHints ? "Yes" : "No"} label="Used hints" />
      <StatBlock stat={mistakes.toString()} label="Mistakes" />
    </div>
  );
}

function StatBlock({
  stat,
  unit,
  label,
}: {
  stat: string;
  unit?: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="text-2xl font-medium">
        {stat}
        <span className="text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}
