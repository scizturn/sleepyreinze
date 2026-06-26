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
 * Oversized scrolling display headline — the template's "Ticker Header"
 * (e.g. "Selected Works©"). Crawls at a base velocity and speeds up / reverses
 * with scroll velocity, so it reacts as you scroll. Static under reduced motion.
 */
export function Ticker({
  text,
  baseVelocity = -3,
  className,
}: {
  text: string;
  /** Base % of the track travelled per second; negative scrolls left. */
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  // 4 copies => track is 4x one copy; wrap over a 25% span loops seamlessly.
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

  const item = (
    <span
      className={`block whitespace-nowrap pr-[0.18em] font-medium leading-none tracking-tighter text-[clamp(3rem,9vw,8.5rem)] ${className ?? ""}`}
    >
      {text}
    </span>
  );

  return (
    <div className="relative flex w-full flex-nowrap overflow-hidden">
      <motion.div className="flex flex-nowrap" style={reduce ? undefined : { x }}>
        {item}
        {item}
        {item}
        {item}
      </motion.div>
    </div>
  );
}
