import { useCanvas } from "@/components/canvas/canvas-provider";
import {
  CanvasAnimation,
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

const animate = ({
  t,
  animation,
  ...args
}: { t: number; animation: CanvasAnimation } & Parameters<Renderer>[0]) => {
  const fill = animation.fill;

  if (fill) args.ctx.fillStyle = formatCss(fill.interpolator(t));

  animation.render(args);
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

export function useAnimations(key: RendererKey) {
  const animations = useRef<CanvasAnimation[]>([]);
  const raf = useRef<number | null>(null);
  const { update, addRenderer, removeRenderer } = useCanvas();

  const start = useCallback(
    (animation: CanvasAnimation) => {
      const index = animations.current.findIndex(
        (a) => a.subject === animation.subject
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

  const getActive = useCallback(
    () => animations.current.map((a) => a.subject),
    []
  );

  useEffect(() => {
    const animationKey = {
      key: key.key + ":animated",
      layer: key.layer,
      order: (key.order ?? 0) + 1,
    };
    const render: Renderer = ({ ctx, scale }) => {
      const timestamp = documentTime();

      for (const animation of animations.current) {
        const { start, end } = animation.timestamp;
        const progress = Math.min((timestamp - start) / (end - start), 1);
        const t = easeinOutSine(progress);

        animate({ t, animation, ctx, scale });
      }
    };

    addRenderer({ render, ...animationKey });
    return () => removeRenderer(animationKey);
  }, [addRenderer, removeRenderer, key]);

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
    getActiveAnimations: getActive,
  };
}
