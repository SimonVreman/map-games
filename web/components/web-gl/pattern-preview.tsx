import { QuizSubject } from "@/types/registry";

export function PatternPreview<TMap extends Record<string, QuizSubject>>({
  subjects,
  subject: subjectKey,
}: {
  subjects: TMap;
  subject?: keyof TMap;
}) {
  const pattern = subjectKey ? subjects[subjectKey] : null;

  if (!pattern) return null;

  if (pattern.svg)
    return (
      <div
        className="w-32 bg-secondary"
        dangerouslySetInnerHTML={{ __html: pattern.svg }}
      />
    );

  return <span>not implemented</span>;
}
