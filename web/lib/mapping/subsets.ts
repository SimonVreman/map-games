export type QuizSubset<TSubject extends string = string> = {
  name: string;
  label: string;
  subjects: TSubject[];
};
