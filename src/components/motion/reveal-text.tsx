"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Big display heading whose words brighten one-by-one from dim to full as the
 * block scrolls through the viewport — the template's signature "Text Opacity
 * Letters" reveal (here done per word for performance). Pass the copy as `text`.
 */
export function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          reduce={!!reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="inline-block">
      <motion.span style={reduce ? undefined : { opacity }} className="inline-block">
        {children}
      </motion.span>
      {/* preserve the inter-word space */}
      <span className="inline-block">&nbsp;</span>
    </span>
  );
}
