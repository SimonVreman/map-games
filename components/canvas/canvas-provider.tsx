import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Renderer, Style, ViewBox } from "./types";
import { produce, enableMapSet } from "immer";

enableMapSet();

type CanvasContext = {
  refs: {
    canvas: RefObject<HTMLCanvasElement | null>;
    style: RefObject<Style>;
  };
  ctx: CanvasRenderingContext2D | null;
  viewBox: ViewBox;
  update: () => void;
  addRenderer: (key: string, r: Renderer) => void;
  removeRenderer: (key: string) => void;
};

const CanvasContext = createContext<CanvasContext>({} as CanvasContext);

export function CanvasProvider({
  canvas,
  style,
  viewBox,
  baseRenderer,
  children,
}: {
  canvas: RefObject<HTMLCanvasElement | null>;
  style: RefObject<Style>;
  viewBox: ViewBox;
  baseRenderer: () => void;
  children?: React.ReactNode;
}) {
  const [renderers, setRenderers] = useState(new Map<string, Renderer>());

  const render = useCallback(() => {
    const ctx = canvas.current?.getContext("2d", { alpha: false }) ?? null;
    if (!ctx) return;

    const bounding = canvas.current?.parentElement?.getBoundingClientRect();
    const aspect = bounding ? bounding.width / bounding.height : 1;

    baseRenderer();
    renderers.forEach((r) =>
      r({ ctx, scale: 1 / (aspect * style.current.scale) })
    );
  }, [baseRenderer, canvas, renderers, style]);

  useEffect(() => render(), [render]);

  const addRenderer = useCallback(
    (key: string, r: Renderer) =>
      setRenderers(
        produce((m) => {
          m.set(key, r);
        })
      ),
    []
  );

  const removeRenderer = useCallback(
    (key: string) =>
      setRenderers(
        produce((m) => {
          m.delete(key);
        })
      ),
    []
  );

  return (
    <CanvasContext.Provider
      value={{
        refs: { canvas, style },
        ctx: canvas.current?.getContext("2d", { alpha: false }) ?? null,
        viewBox,
        update: render,
        addRenderer,
        removeRenderer,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(CanvasContext);

  if (!context)
    throw new Error("useCanvas must be used within a CanvasProvider");

  return context;
}
