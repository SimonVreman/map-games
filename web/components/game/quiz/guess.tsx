import { useQuizStore } from "@/lib/store/quiz-provider";
import { QuizSubject } from "@/types/registry";
import { toast } from "sonner";

function stringifyMissed({
  missed: missedRaw,
  subjects,
}: {
  missed: string[];
  subjects: Record<string, QuizSubject>;
}) {
  const missed = missedRaw.map((m) => {
    const subject = subjects[m];
    return "label" in subject ? subject.label : m;
  });

  if (missed.length === 0) return "";
  if (missed.length === 1) return missed[0];
  if (missed.length <= 4)
    return `${missed.slice(0, -1).join(", ")} and ${missed[missed.length - 1]}`;
  return `${missed.slice(0, 4).join(", ")} and ${missed.length - 4} others`;
}

export function useHandleQuizGuess({
  subjects,
}: {
  subjects: Record<string, QuizSubject>;
}) {
  const guess = useQuizStore((s) => s.guess);

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
        description: `You missed ${stringifyMissed({
          missed: remaining,
          subjects,
        })}`,
      });
    },
  };
}
