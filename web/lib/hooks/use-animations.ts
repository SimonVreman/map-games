import { useCanvas } from "@/components/canvas/canvas-provider";
import {
  CanvasAnimation,
  ExtendedRenderer,
  Renderer,
  RendererKey,
} from "@/components/canvas/types";
import { formatCss } from "culori";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { documentTime } from "../utils";
import { mergeAnimations } from "@/components/canvas/animation";

function easeinOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

const interpolate = ({
  t,
  animation,
  ctx,
}: {
  t: number;
  animation: CanvasAnimation;
  ctx: CanvasRenderingContext2D;
}) => {
  const fill = animation.fill;
  if (fill) ctx.fillStyle = formatCss(fill.interpolator(t));
};

const tick =
  ({
    raf,
    animations,
    update,
  }: {
    raf: RefObject<number | null>;
    animations: RefObject<CanvasAnimation[]>;
    update: () => void;
  }) =>
  (t: number) => {
    animations.current = animations.current.filter((a) => a.timestamp.end > t);

    update();

    raf.current =
      animations.current.length > 0
        ? requestAnimationFrame(tick({ raf, animations, update }))
        : null;
  };

export function useAnimations<TItem>({
  key,
  renderBase,
  renderStatic,
  items,
}: {
  key: RendererKey;
  renderBase: ExtendedRenderer<{ item: TItem }>;
  renderStatic: ExtendedRenderer<{ item: TItem }>;
  items: TItem[];
}) {
  const animations = useRef<CanvasAnimation[]>([]);
  const raf = useRef<number | null>(null);
  const { update, addRenderer, removeRenderer } = useCanvas();

  const start = useCallback(
    (animation: CanvasAnimation) => {
      const index = animations.current.findIndex(
        (a) => a.index === animation.index
      );

      animation = mergeAnimations(
        index !== -1 ? animations.current[index] : null,
        animation
      );

      if (index !== -1) animations.current[index] = animation;
      else animations.current.push(animation);

      if (raf.current != null) return;
      raf.current = requestAnimationFrame(
        tick({ raf, animations, update: () => update(key.layer) })
      );
    },
    [update, key.layer]
  );

  useEffect(() => {
    const render: Renderer = ({ ctx, scale }) => {
      const timestamp = documentTime();

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const animation = animations.current.find((a) => a.index === i);

        if (animation) {
          const { start, end } = animation.timestamp;
          const progress = Math.min((timestamp - start) / (end - start), 1);
          const t = easeinOutSine(progress);

          interpolate({ t, animation, ctx });
        } else {
          renderStatic({ item, ctx, scale });
        }

        renderBase({ item, ctx, scale });
      }
    };

    addRenderer({ render, ...key });
    return () => removeRenderer(key);
  }, [addRenderer, removeRenderer, key, items, renderBase, renderStatic]);

  useEffect(() => {
    if (raf.current == null) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(
      tick({ raf, animations, update: () => update(key.layer) })
    );
  }, [update, key.layer]);

  return {
    animations,
    startAnimation: start,
  };
}
