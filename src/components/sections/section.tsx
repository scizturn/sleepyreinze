import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  /** Two-digit marker shown in the editorial label, e.g. "02". */
  index?: string;
  /** Left-hand eyebrow; rendered after a "©" flourish. */
  eyebrow?: string;
  /** Right-hand role/discipline label, e.g. "Web Developer". */
  label?: string;
  title?: string;
  description?: string;
  /** Render the title as an oversized headline that bleeds off the edges. */
  huge?: boolean;
  /** Hide the default heading block (when a section renders its own header). */
  bare?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

/**
 * Editorial section shell. The header is a justified mono bar —
 * `© Eyebrow`  ···  `(WDX® — NN)` · `Label` — over a hairline, matching the
 * reference template's section headers, followed by the heading block.
 */
export function Section({
  id,
  index,
  eyebrow,
  label,
  title,
  description,
  huge = false,
  bare = false,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1480px] scroll-mt-20 px-6 py-20 sm:py-28 lg:py-32",
        className,
      )}
    >
      {!bare && (
        <Reveal className="mb-12 flex flex-col gap-8">
          {eyebrow && (
            <div className="flex flex-col gap-2 border-b border-border/60 pb-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[0.7rem] sm:tracking-[0.2em]">
              <span>© {eyebrow}</span>
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {index && <span className="whitespace-nowrap">(WDX® — {index})</span>}
                {label && (
                  <span className="whitespace-nowrap text-foreground">
                    {label}
                  </span>
                )}
              </span>
            </div>
          )}
          {huge ? (
            <div className="-mx-6 overflow-hidden">
              <h2 className="whitespace-nowrap px-6 font-semibold leading-[0.82] tracking-tighter text-[clamp(3rem,15vw,13rem)]">
                {title}
              </h2>
            </div>
          ) : (
            title && (
              <h2 className="max-w-4xl text-balance text-5xl font-semibold tracking-tighter sm:text-7xl">
                {title}
              </h2>
            )
          )}
          {description && (
            <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      )}
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
