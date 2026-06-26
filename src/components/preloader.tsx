"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { siteConfig } from "@/lib/site-config";

/**
 * Intro overlay shown on page load: a counter races 000 → 100 while a bar fills
 * under the wordmark, then the whole panel wipes up to reveal the page — the
 * template's "Loader" moment. Locks scroll while loading; skipped entirely under
 * reduced motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) =>
    Math.round(v).toString().padStart(3, "0"),
  );
  const width = useTransform(count, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const controls = animate(count, 100, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => setTimeout(() => setDone(true), 280),
    });
    return () => {
      controls.stop();
      root.style.overflow = "";
    };
  }, [reduce, count]);

  if (reduce) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-background px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-semibold leading-none tracking-tighter text-[clamp(2.5rem,11vw,9rem)]"
          >
            {siteConfig.handle}
            <span className="align-top text-[0.26em] font-medium text-muted-foreground">
              ™
            </span>
          </motion.span>

          <div className="flex w-full max-w-md items-center gap-4">
            <div className="relative h-px flex-1 overflow-hidden bg-border">
              <motion.div
                style={{ width }}
                className="absolute inset-y-0 left-0 bg-foreground"
              />
            </div>
            <motion.span className="font-mono text-xs tabular-nums text-muted-foreground">
              {label}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
