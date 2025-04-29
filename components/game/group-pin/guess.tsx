import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { GroupPinSliceName } from "@/lib/store/slice/group-pin";
import { toast } from "sonner";

function stringifyMissed(missed: string[]) {
  if (missed.length === 0) return "";
  if (missed.length === 1) return missed[0];
  if (missed.length <= 4)
    return `${missed.slice(0, -1).join(", ")} and ${missed[missed.length - 1]}`;
  return `${missed.slice(0, 4).join(", ")} and ${missed.length - 4} others`;
}

export function useHandleGroupGuess<
  TName extends GroupPinSliceName<AppStore>,
  TTarget extends { name: string; subjects: readonly string[] }
>({ store, targets }: { store: TName; targets: readonly TTarget[] }) {
  const [guessed, guess, subject, maximum, hints] = useAppStore((s) => [
    s[store].guessed,
    s[store].guess,
    s[store].subject,
    s[store].maximum,
    s[store].hints,
  ]);

  return {
    handleGuess: (country: string) => {
      if (guessed.includes(country) || hints) return;

      const isCorrect = targets
        .find((v) => v.name === country)
        ?.subjects.includes((subject?.name || "") as never);

      guess(country);

      if (isCorrect && guessed.length < maximum - 1) return;

      toast.getToasts().forEach((t) => toast.dismiss(t.id));

      if (isCorrect) {
        toast.success("Correct", { duration: 6000 });
        return;
      }

      const missed = targets
        .filter(
          (v) =>
            !guessed.includes(v.name) &&
            subject &&
            v.subjects.includes(subject.name)
        )
        .map((v) => v.name);

      toast.error("Incorrect", {
        duration: 6000,
        description: `You missed ${stringifyMissed(missed)}`,
      });
    },
  };
}
