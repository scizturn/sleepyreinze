"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

// Wrap v into the [min, max) range (for seamless looping).
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Infinite horizontal keyword strip. Crawls at a base velocity and reacts to
 * scroll velocity (speeds up / flips direction). Static under reduced motion.
 *
 * - `tone="default"`: thin bordered strip, muted mono labels with ✦ separators.
 * - `tone="solid"`: filled light bar with black Title-Case labels (the
 *   template's hero keyword banner).
 */
export function Marquee({
  items,
  baseVelocity = -2,
  tone = "default",
}: {
  items: string[];
  /** Base % of the track travelled per second; negative scrolls left. */
  baseVelocity?: number;
  tone?: "default" | "solid";
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const solid = tone === "solid";

  const group = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <span
          key={i}
          className={
            solid
              ? "flex items-center gap-16 whitespace-nowrap pr-16 text-base font-semibold tracking-tight"
              : "flex items-center gap-12 whitespace-nowrap pr-12 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground"
          }
        >
          {item}
          {!solid && (
            <span aria-hidden className="text-foreground/30">
              ✦
            </span>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={
        solid
          ? "relative flex overflow-hidden bg-[oklch(0.8_0_0)] py-3 text-black"
          : "relative flex overflow-hidden border-y border-border/60 py-5"
      }
    >
      <motion.div className="flex flex-nowrap" style={reduce ? undefined : { x }}>
        {group}
        {group}
        {group}
        {group}
      </motion.div>
    </div>
  );
}
