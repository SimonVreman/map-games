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
import { isMobileWidth } from "@/lib/utils";

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
  getRenderScale: () => number;
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

  const getRenderScale = useCallback(() => {
    const multiplier = isMobileWidth() ? 1.5 : 1;
    const aspect = viewBox.width / viewBox.height;
    return multiplier / (aspect * style.current.scale);
  }, [viewBox, style]);

  const render = useCallback(
    (layer: number, from: number = 0) => {
      const ctx = ctxs[layer];
      if (!ctx) return;

      if (from === 0) transform(ctx);

      const scale = getRenderScale();

      for (const { order, render } of renderers.get(layer) ?? []) {
        if (order < from) continue;
        render({ ctx, scale });
      }
    },
    [transform, renderers, ctxs, getRenderScale]
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

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => renderAll();

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [renderAll]);

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
        getRenderScale,
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
