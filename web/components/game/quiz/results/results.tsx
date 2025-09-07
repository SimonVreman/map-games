import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { QuizStatistics } from "./statistics";
import { SharedScore } from "./schema";
import { toast } from "sonner";
import { useQuizStore } from "@/lib/store/quiz-provider";

export function QuizResults() {
  const router = useRouter();
  const [open, reset, stats] = useQuizStore((s) => [
    s.nextSubjects.length === 0 && s.stats.total > 0,
    s.reset,
    s.stats,
  ]);

  const statistics = {
    accuracy: (stats.correct / stats.total) * 100,
    mistakes: stats.incorrect,
    hints: stats.usedHints,
    maxStreak: stats.maxStreak,
  };

  return (
    <Dialog open={open}>
      <DialogContent canClose={false}>
        <DialogHeader>
          <div className="flex min-w-0 items-center justify-between gap-2 text-start">
            <div>
              <DialogTitle>Results</DialogTitle>
              <DialogDescription>
                You can probably do better (or faster). Go again!
              </DialogDescription>
            </div>

            <ShareButton statistics={statistics} />
          </div>
        </DialogHeader>

        <QuizStatistics statistics={statistics} />

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

function ShareButton({
  statistics,
}: {
  statistics: Omit<z.infer<typeof SharedScore>, "version">;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const response = await fetch(
      `${window.location.origin}/${
        window.location.pathname.split("/")[1]
      }/share/api`,
      {
        method: "post",
        body: JSON.stringify({
          version: 1,
          ...statistics,
        } satisfies z.infer<typeof SharedScore>),
      }
    );

    if (!response.ok) {
      toast.error("Failed to create share link");
      setLoading(false);
      return;
    }

    const data = {
      title: "Can you beat my score?",
      url: `${window.location.origin}${(await response.json()).url}`,
    } as const;

    if (typeof navigator.share !== "undefined") {
      try {
        await navigator.share(data);
      } catch {}
    } else {
      await navigator.clipboard.writeText(data.url);
      toast.info("Copied share link to clipboard");
    }

    setLoading(false);
  };

  return (
    <Button size="sm" onClick={handleClick} loading={loading}>
      <ShareIcon className="mr-1 h-4 w-4" />
      Share
    </Button>
  );
}
