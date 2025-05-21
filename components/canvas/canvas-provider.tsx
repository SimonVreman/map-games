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

type RendererEntry = { key: string; order: number; render: Renderer };
type OrderlessRendererEntry = Omit<RendererEntry, "order"> & {
  order?: number;
};

type CanvasContext = {
  refs: {
    base: RefObject<HTMLDivElement | null>;
    style: RefObject<Style>;
    layers: RefObject<HTMLCanvasElement | null>[];
  };
  ctxs: (CanvasRenderingContext2D | null)[];
  viewBox: ViewBox;
  update: (layer: number, from?: number) => void;
  updateAll: () => void;
  addRenderer: (layer: number, r: OrderlessRendererEntry) => void;
  removeRenderer: (layer: number, key: string) => void;
};

const CanvasContext = createContext<CanvasContext>({} as CanvasContext);

export function CanvasProvider({
  base,
  layers,
  style,
  viewBox,
  transform,
  children,
}: {
  base: RefObject<HTMLDivElement | null>;
  layers: RefObject<HTMLCanvasElement | null>[];
  style: RefObject<Style>;
  viewBox: ViewBox;
  transform: (ctx: CanvasRenderingContext2D) => void;
  children?: React.ReactNode;
}) {
  const [ctxs, setCtxs] = useState<(CanvasRenderingContext2D | null)[]>([]);
  const [renderers, setRenderers] = useState(
    new Map<number, RendererEntry[]>()
  );

  const updateCtxs = useCallback(() => {
    const newCtxs = layers.map(
      (layer, i) => layer.current?.getContext("2d", { alpha: i > 0 }) ?? null
    );
    setCtxs(newCtxs);
  }, [layers]);

  const render = useCallback(
    (layer: number, from: number = 0) => {
      const canvas = layers[layer];
      const ctx = ctxs[layer];

      if (!ctx) return;

      const bounding = canvas.current?.parentElement?.getBoundingClientRect();
      const aspect = bounding ? bounding.width / bounding.height : 1;
      const scale = 1 / (aspect * style.current.scale);

      if (from === 0) transform(ctx);

      for (const { order, render } of renderers.get(layer) ?? []) {
        if (order < from) continue;
        render({ ctx, scale });
      }
    },
    [transform, renderers, style, layers, ctxs]
  );

  const renderAll = useCallback(() => {
    for (let i = 0; i < ctxs.length; i++) render(i);
  }, [render, ctxs]);

  const addRenderer = useCallback(
    (layer: number, r: OrderlessRendererEntry) =>
      setRenderers(
        produce((m) => {
          const list = m.get(layer) ?? [];
          const item = { order: 0, ...r };
          const index = list.findIndex((e) => e.key === r.key);

          if (index === -1) list.push(item);
          else list[index] = item;

          list.sort((a, b) => a.order - b.order);
          m.set(layer, list);
        })
      ),
    []
  );

  const removeRenderer = useCallback(
    (layer: number, key: string) =>
      setRenderers(
        produce((m) => {
          let list = m.get(layer);
          list = list?.filter((e) => e.key !== key);
          if (list?.length === 0) m.delete(layer);
          else if (list != null) m.set(layer, list);
        })
      ),
    []
  );

  useEffect(() => updateCtxs(), [updateCtxs]);
  useEffect(() => renderAll(), [renderAll]);

  return (
    <CanvasContext.Provider
      value={{
        refs: { base, style, layers },
        ctxs,
        viewBox,
        update: render,
        updateAll: renderAll,
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
