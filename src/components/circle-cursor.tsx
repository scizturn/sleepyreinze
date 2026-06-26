"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Blend-mode circle that trails the pointer and grows over interactive targets
 * — the template's "Circle Cursor". CSS-gated so it only shows on fine-pointer
 * (mouse) devices and is hidden under reduced motion; pointer-events-none so it
 * never blocks clicks. Mounted once in the root layout.
 */
export function CircleCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setActive(!!target?.closest("a, button, [data-cursor='hover']"));
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      animate={{ scale: active ? 2.6 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-2.5 -mt-2.5 hidden size-5 rounded-full bg-white mix-blend-difference motion-reduce:!hidden [@media(pointer:fine)]:block"
    />
  );
}
