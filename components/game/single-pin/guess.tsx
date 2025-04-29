import { AppStore } from "@/lib/store";
import { useAppStore } from "@/lib/store/provider";
import { SinglePinSliceName } from "@/lib/store/slice/single-pin";
import { toast } from "sonner";

export function useHandleSingleGuess<
  TName extends SinglePinSliceName<AppStore>
>({ store }: { store: TName }) {
  const [correct, guess, hints] = useAppStore((s) => [
    s[store].code,
    s[store].guess,
    s[store].hints,
  ]);

  return {
    handleGuess: (clicked: number) => {
      if (hints) return;

      const isCorrect = clicked === correct;

      toast.getToasts().forEach((t) => toast.dismiss(t.id));

      if (isCorrect) toast.success("Correct", { duration: 6000 });
      else toast.error("Incorrect", { duration: 6000 });

      guess(clicked);
    },
  };
}
