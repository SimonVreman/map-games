import type {
  QuizRegistry,
  QuizSubject,
  QuizSubset,
  QuizTarget,
} from "./types";

export function generateQuizMeta({ registry }: { registry: QuizRegistry }) {
  return `import { QuizSubject, QuizSubset, QuizTarget } from "@/types/registry";

${generateSubjects(registry.subjects)}

${generateTargets(registry.targets)}

${generateSubsets(
  registry.subsets ?? [
    { id: "all", label: "All", subjects: registry.subjects.map((s) => s.id) },
  ]
)}

export const ${registry.name} = { subjects, targets, subsets };
`;
}

function generateSubjects(subjects: QuizSubject[]) {
  return `const subjects: Record<string, QuizSubject> = {
${subjects
  .map(
    (s) =>
      `  ${s.id}: {
    ${"svg" in s ? `svg: ${JSON.stringify(s.svg)}` : ""}
  }`
  )
  .join(",\n")}
};`;
}

function generateTargets(targets: QuizTarget[]) {
  return `const targets: QuizTarget[] = [
${targets
  .map(
    (t) => `  {
    id: "${t.id}",
    subjects: ${JSON.stringify(t.subjects.map((s) => s.id))},
  }`
  )
  .join(",\n")}
];`;
}

function generateSubsets(subsets: QuizSubset[]) {
  return `const subsets: QuizSubset[] = [
${subsets
  .map(
    (s) => `  {
    id: "${s.id}",
    label: "${s.label}",
    subjects: ${JSON.stringify(s.subjects)},
  }`
  )
  .join(",\n")}
];`;
}
