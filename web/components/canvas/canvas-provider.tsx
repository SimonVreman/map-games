import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Bounds, Renderer, RendererKey, Style } from "./types";
import { produce, enableMapSet } from "immer";
import { isMobileWidth } from "@/lib/utils";

enableMapSet();

type OrderlessRendererEntry = RendererKey & { render: Renderer };
type RendererEntry = OrderlessRendererEntry & { order: number };

type CanvasContext = {
  refs: {
    style: RefObject<Style>;
    base: RefObject<HTMLDivElement | null>;
    layers: RefObject<HTMLCanvasElement | null>[];
  };
  ctxs: (CanvasRenderingContext2D | null)[];
  bounds: Bounds;
  update: (layer: number) => void;
  updateAll: () => void;
  addRenderer: (r: OrderlessRendererEntry) => void;
  removeRenderer: (r: { layer: number; key: string }) => void;
  getRenderScale: () => number;
};

const layerCtx = (l: RefObject<HTMLCanvasElement | null>, i: number) =>
  l.current?.getContext("2d", { alpha: i > 0 }) ?? null;

const CanvasContext = createContext<CanvasContext>({} as CanvasContext);

export function CanvasProvider({
  base,
  layers,
  bounds,
  defaultStyle,
  transform,
  children,
}: {
  base: RefObject<HTMLDivElement | null>;
  layers: RefObject<HTMLCanvasElement | null>[];
  bounds: Bounds;
  defaultStyle: Style;
  transform: (
    ctx: CanvasRenderingContext2D,
    style: Style,
    background?: boolean
  ) => void;
  children?: React.ReactNode;
}) {
  const style = useRef<Style>(defaultStyle);
  const raf = useRef<number | null>(null);
  const [ctxs, setCtxs] = useState<(CanvasRenderingContext2D | null)[]>([]);
  const [renderers, setRenderers] = useState(
    new Map<number, RendererEntry[]>()
  );

  const updateCtxs = useCallback(() => {
    const newCtxs = layers.map(layerCtx);
    setCtxs(newCtxs);
  }, [layers]);

  const getRenderScale = useCallback(() => {
    const multiplier = isMobileWidth() ? 1.5 : 1;
    return multiplier / style.current.scale;
  }, [style]);

  const render = useCallback(
    (layer: number) => {
      const ctx = layerCtx(layers[layer], layer);
      if (!ctx) return;

      transform(ctx, style.current, layer === 0);

      const scale = getRenderScale();
      const args = { ctx, scale };

      for (const { render } of renderers.get(layer) ?? []) render(args);
    },
    [transform, renderers, layers, getRenderScale]
  );

  const renderAll = useCallback(() => {
    if (raf.current != null) return;
    raf.current = requestAnimationFrame(() => {
      for (let i = 0; i < ctxs.length; i++) render(i);
      raf.current = null;
    });
  }, [render, ctxs]);

  const addRenderer = useCallback(
    (r: OrderlessRendererEntry) =>
      setRenderers(
        produce((m) => {
          const list = m.get(r.layer) ?? [];
          const item = { order: 0, ...r };
          const index = list.findIndex((e) => e.key === r.key);

          if (index === -1) list.push(item);
          else list[index] = item;

          list.sort((a, b) => a.order - b.order);
          m.set(r.layer, list);
        })
      ),
    []
  );

  const removeRenderer = useCallback(
    ({ layer, key }: { layer: number; key: string }) =>
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
    window.addEventListener("resize", renderAll);
    return () => {
      media.removeEventListener("change", listener);
      window.removeEventListener("resize", renderAll);
    };
  }, [renderAll]);

  return (
    <CanvasContext.Provider
      value={{
        refs: { base, layers, style },
        ctxs,
        update: render,
        updateAll: renderAll,
        bounds,
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
