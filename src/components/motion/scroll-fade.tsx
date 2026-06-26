"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Scroll-linked drift + fade. As the block scrolls up out of view it translates
 * by `y` px and fades to `minOpacity`, giving the page a sense of depth. No-ops
 * under reduced motion.
 */
export function ScrollFade({
  children,
  className,
  y = -70,
  minOpacity = 0.25,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  minOpacity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const ty = useTransform(scrollYProgress, [0, 1], [0, y]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, minOpacity]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y: ty, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
