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
  paths: {
    path: string;
    fill?: PatternFill;
    image?: {
      // x, y, w, h
      sprite: string;
      source: [number, number, number, number];
      destination: [number, number, number, number];
    };
  }[];
};

export type Sprites = Record<
  string,
  { objectUrl: string; bitmap: ImageBitmap }
>;
