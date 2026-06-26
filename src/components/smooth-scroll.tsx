"use client";

import { useEffect } from "react";

// Eased programmatic scroll (easeInOutCubic) so nav clicks glide instead of jump.
function scrollToY(to: number, duration: number) {
  const start = window.scrollY;
  const change = to - start;
  let startTime: number | null = null;
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(now: number) {
    if (startTime === null) startTime = now;
    const t = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + change * ease(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/**
 * Intercepts clicks on in-page anchor links (`#id`) and smooth-scrolls to the
 * target, accounting for the sticky header, instead of letting the browser jump.
 * Updates the URL hash without a jump. Falls back to an instant jump under
 * reduced motion. Mounted once in the root layout.
 */
export function SmoothScroll() {
  useEffect(() => {
    const HEADER_OFFSET = 72;

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const el = id === "top" ? document.body : document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const targetY =
        id === "top"
          ? 0
          : el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      history.pushState(null, "", href);

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) window.scrollTo(0, targetY);
      else scrollToY(targetY, 850);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
