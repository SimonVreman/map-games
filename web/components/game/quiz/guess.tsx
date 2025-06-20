import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { QuizSliceName } from "@/lib/store/slice/quiz-slice";
import { toast } from "sonner";

function stringifyMissed(missed: string[]) {
  if (missed.length === 0) return "";
  if (missed.length === 1) return missed[0];
  if (missed.length <= 4)
    return `${missed.slice(0, -1).join(", ")} and ${missed[missed.length - 1]}`;
  return `${missed.slice(0, 4).join(", ")} and ${missed.length - 4} others`;
}

export function useHandleQuizGuess<TName extends QuizSliceName<AppStore>>({
  store,
}: {
  store: TName;
}) {
  const guess = useAppStore((s) => s[store].guess);

  return {
    handleGuess: (target: string) => {
      const { isCorrect, remaining } = guess(target);

      if (isCorrect === null || (isCorrect && remaining.length > 0)) return;

      toast.getToasts().forEach((t) => toast.dismiss(t.id));

      if (isCorrect) {
        toast.success("Correct", { duration: 6000 });
        return;
      }

      toast.error("Incorrect", {
        duration: 6000,
        description: `You missed ${stringifyMissed(remaining)}`,
      });
    },
  };
}
