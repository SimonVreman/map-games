import type {
  QuizRegistry,
  QuizSubject,
  QuizSubset,
  QuizTarget,
} from "./types";

function validateSubsetSubjects({
  subsets,
  subjects,
}: {
  subsets: QuizSubset[];
  subjects: QuizSubject[];
}) {
  const invalidSubjects = subsets.flatMap((s) =>
    s.subjects.filter((sub) => !subjects.find((su) => su.id === sub))
  );

  if (invalidSubjects.length > 0)
    throw new Error(
      "Subsets contain unknown subjects: " + invalidSubjects.join(", ")
    );

  const duplicateSubjects = subsets
    .flatMap((s) => s.subjects)
    .reduce((acc: Record<string, number>, subject) => {
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});

  const duplicates = Object.entries(duplicateSubjects).filter(
    ([, count]) => count > 1
  );

  if (duplicates.length > 0)
    throw new Error(
      "Subsets contain duplicate subjects: " +
        duplicates.map(([subj]) => subj).join(", ")
    );

  const missingSubjects = subjects
    .map((s) => s.id)
    .filter(
      (subj) => !subsets.some((subset) => subset.subjects.includes(subj))
    );

  if (missingSubjects.length > 0)
    console.warn(
      "Some subjects are not included in any subset: " +
        missingSubjects.join(", ")
    );
}

export function generateQuizMeta({ registry }: { registry: QuizRegistry }) {
  validateSubsetSubjects({
    subsets: registry.subsets ?? [],
    subjects: registry.subjects,
  });

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
      `  "${s.id}": {
    ${
      "svg" in s
        ? `svg: ${JSON.stringify(s.svg)}`
        : "label" in s
        ? `label: ${JSON.stringify(s.label)}`
        : ""
    }
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
