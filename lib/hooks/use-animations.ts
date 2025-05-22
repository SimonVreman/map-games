import { useCanvas } from "@/components/canvas/canvas-provider";
import {
  ActiveCanvasAnimation,
  CanvasAnimation,
  Renderer,
} from "@/components/canvas/types";
import { formatCss, interpolate } from "culori";
import { useCallback, useEffect, useRef } from "react";
import { documentTime, oklchEqual } from "../utils";

const animate =
  ({
    animation,
    render,
    remove,
    getRenderScale,
    ctx,
  }: {
    animation: CanvasAnimation;
    render: Renderer;
    remove: (raf: number) => void;
    getRenderScale: () => number;
    ctx: CanvasRenderingContext2D;
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

    render({ ctx, scale: getRenderScale() });

    if (t < 1)
      animation.raf = requestAnimationFrame(
        animate({ animation, render, remove, getRenderScale, ctx })
      );
    else if (animation.raf) remove(animation.raf);
  };

function mergeAnimations(
  current: ActiveCanvasAnimation | null,
  next: CanvasAnimation
): CanvasAnimation {
  if (!current) return next;

  const elapsed = documentTime() - current.timestamp.start;
  const currentDuration = current.timestamp.end - current.timestamp.start;
  const nextDuration = next.timestamp.end - next.timestamp.start;
  const progress = Math.min(elapsed / currentDuration, 1);

  if (next.fill && current.fill) {
    // If reverse, correct progress
    if (
      oklchEqual(next.fill.from, current.fill.to) &&
      oklchEqual(next.fill.to, current.fill.from)
    )
      next.timestamp.end = next.timestamp.start + progress * nextDuration;

    // Interpolate the fill color
    next.fill.from = current.fill.interpolator?.(progress) ?? current.fill.from;
  }

  cancelAnimationFrame(current.raf);

  return next;
}

export function useAnimations() {
  const animations = useRef<ActiveCanvasAnimation[]>([]);
  const {
    ctxs: [ctx],
    getRenderScale,
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

      const index = animations.current.findIndex(
        (a) => a.subject === animation.subject
      );

      animation = mergeAnimations(
        index !== -1 ? animations.current[index] : null,
        animation
      );

      animation.raf = requestAnimationFrame(
        animate({ animation, render, remove: removeByRaf, getRenderScale, ctx })
      );

      const started = animation as ActiveCanvasAnimation;
      if (index !== -1) animations.current[index] = started;
      else animations.current.push(started);
    },
    [ctx, getRenderScale]
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
