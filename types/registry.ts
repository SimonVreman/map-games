export type PatternEntry<
  TPatterns extends Record<string, unknown> = Record<string, unknown>
> = {
  name: string;
  paths: string[];
  meta: {
    north: number;
    south: number;
    east: number;
    west: number;
    x: number;
    y: number;
  };
  subjects: (keyof TPatterns)[];
  transform: [number, number, number, number, number, number];
};

export type Pattern = {
  path: string;
  fill?: string;
}[];
