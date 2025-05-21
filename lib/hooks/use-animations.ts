import { useCanvas } from "@/components/canvas/canvas-provider";
import {
  ActiveCanvasAnimation,
  CanvasAnimation,
  Renderer,
  Style,
} from "@/components/canvas/types";
import { formatCss, interpolate } from "culori";
import { RefObject, useCallback, useEffect, useRef } from "react";

const animate =
  ({
    animation,
    render,
    remove,
    style,
    ctx,
  }: {
    animation: CanvasAnimation;
    render: Renderer;
    remove: (raf: number) => void;
    ctx: CanvasRenderingContext2D;
    style: RefObject<Style>;
  }) =>
  (timestamp: number) => {
    const { start, end } = animation.timestamp;
    const t = Math.min((timestamp - start) / (end - start), 1);
    const fill = animation.fill;

    if (fill) {
      if (!fill.interpolator)
        fill.interpolator = interpolate([fill.from, fill.to], "oklch");

      const current = fill.interpolator(t);
      ctx.fillStyle = formatCss(current);
    }

    render({ ctx, scale: 1 / style.current.scale });

    if (t < 1)
      animation.raf = requestAnimationFrame(
        animate({ animation, render, remove, style, ctx })
      );
    else if (animation.raf) remove(animation.raf);
  };

export function useAnimations() {
  const animations = useRef<ActiveCanvasAnimation[]>([]);
  const {
    ctxs: [ctx],
    refs: { style },
  } = useCanvas();

  // Stop animations when unmounting
  useEffect(
    () => () => {
      animations.current.forEach(({ raf }) => {
        if (raf) cancelAnimationFrame(raf);
      });
      animations.current = [];
    },
    []
  );

  const removeByRaf = (raf: number) => {
    const currentIndex = animations.current.findIndex((a) => a.raf === raf);
    if (currentIndex !== -1) {
      cancelAnimationFrame(raf);
      animations.current.splice(currentIndex, 1);
    }
  };

  const start = useCallback(
    ({
      animation,
      render,
    }: {
      animation: CanvasAnimation;
      render: Renderer;
    }) => {
      if (!ctx) return;

      const currentIndex = animations.current.findIndex(
        (a) => a.subject === animation.subject
      );

      animation.raf = requestAnimationFrame(
        animate({ animation, render, remove: removeByRaf, style, ctx })
      );

      if (currentIndex !== -1) {
        const { raf } = animations.current[currentIndex];
        if (raf) cancelAnimationFrame(raf);
        animations.current[currentIndex] = animation as ActiveCanvasAnimation;
      } else {
        animations.current.push(animation as ActiveCanvasAnimation);
      }
    },
    [ctx, style]
  );

  const getActive = useCallback(
    () => animations.current.map((a) => a.subject),
    []
  );

  return {
    animations,
    startAnimation: start,
    getActiveAnimations: getActive,
  };
}
