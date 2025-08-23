import { Loader2Icon } from "lucide-react";

export default function GameLoading() {
  return (
    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 p-4 flex items-center justify-center flex-col gap-2">
      <Loader2Icon className="animate-spin" />
      <span>Loading game... </span>
    </div>
  );
}
