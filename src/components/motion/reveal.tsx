"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Pre-create motion components at module scope (the react-hooks/static-components
// rule forbids calling motion() during render). Add tags here as needed.
const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  section: motion.section,
} as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds to delay the animation (use for manual staggering). */
  delay?: number;
  /** Which element to render. Defaults to "div". */
  as?: keyof typeof MOTION_TAGS;
  className?: string;
};

/**
 * Fades + slides its children up when scrolled into view (once).
 * Falls back to a plain fade when the user prefers reduced motion.
 */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
