type QuizSubjectBase = {
  id: string;
};

export type LabelQuizSubject = QuizSubjectBase & {
  label: string;
};

export type VectorQuizSubject = QuizSubjectBase & {
  svg: string;
};

export type RasterQuizSubject = QuizSubjectBase & {
  image: string;
};

export type QuizSubject =
  | LabelQuizSubject
  | VectorQuizSubject
  | RasterQuizSubject;

export type QuizTarget = {
  id: string;
  label: string;
  subjects: QuizSubject[];
  tapArea?: boolean;
  transform?: {
    scale?: number;
    ox?: number;
    oy?: number;
  };
};

export type QuizSubset = {
  id: string;
  label: string;
  subjects: string[];
};

export type QuizRegistry = {
  name: string;
  size?: { width: number; height: number };
  subjects: QuizSubject[];
  targets: QuizTarget[];
  subsets?: QuizSubset[];
};

export type QuizDefinition = {
  slug: string;
  meta: (output: string) => Promise<unknown>;
  subjects: (output: string) => Promise<unknown>;
  targets?: (output: string) => Promise<unknown>;
};
