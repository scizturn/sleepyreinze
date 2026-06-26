"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin progress bar pinned to the top of the viewport that fills as the page
 * scrolls. Hidden under reduced motion. Mounted once in the root layout.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-foreground/70 motion-reduce:hidden"
    />
  );
}
