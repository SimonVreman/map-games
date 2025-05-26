export type PatternEntry<
  TPatterns extends Record<string, unknown> = Record<string, never>
> = {
  name: string;
  paths: Path2D[];
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
  path: Path2D;
  fill?: string;
}[];
