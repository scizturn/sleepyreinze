"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Drifts its children vertically as the block scrolls through the viewport,
 * for a subtle depth/parallax effect. No-ops under reduced motion.
 */
export function Parallax({
  children,
  className,
  amount = 40,
}: {
  children: ReactNode;
  className?: string;
  /** Total vertical travel in px (split +/- around centre). */
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
