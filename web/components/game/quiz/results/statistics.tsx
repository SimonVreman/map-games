import { SharedScore } from "./schema";
import { z } from "zod";

export function QuizStatistics({
  statistics,
}: {
  statistics: Omit<z.infer<typeof SharedScore>, "version">;
}) {
  const accuracy = statistics.accuracy.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });

  return (
    <div className="grid grid-cols-2 gap-4 not-prose">
      <StatBlock stat={accuracy} unit="%" label="Accuracy" />
      <StatBlock
        stat={statistics.maxStreak.toString()}
        label="Longest streak"
      />
      <StatBlock stat={statistics.hints ? "Yes" : "No"} label="Used hints" />
      <StatBlock stat={statistics.mistakes.toString()} label="Mistakes" />
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
