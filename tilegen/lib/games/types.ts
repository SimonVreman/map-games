import type { Svg } from "../svg-geojson/types";

type QuizSubjectBase = {
  id: string;
};

export type LabelQuizSubject = QuizSubjectBase & {
  label: string;
};

export type VectorQuizSubject = QuizSubjectBase & {
  svg: Svg;
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
  transform?: {
    scale?: number;
    ox?: number;
    oy?: number;
  };
};

export type QuizRegistry = {
  size: { width: number; height: number };
  subjects: QuizSubject[];
  targets: QuizTarget[];
};
