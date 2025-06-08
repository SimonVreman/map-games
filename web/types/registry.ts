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
  tiny?: boolean;
};

export type PatternFill =
  | string
  | {
      type: "gradient";
      start: { x: number; y: number };
      end: { x: number; y: number };
      stops: { offset: number; color: string }[];
    };

export type Pattern = {
  background: { light: string; dark: string };
  paths: { path: string; fill?: PatternFill }[];
};
