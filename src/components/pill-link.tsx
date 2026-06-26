import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  /** "solid" = filled, "outline" = bordered (default). */
  variant?: "solid" | "outline";
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className">;

/**
 * Rounded-full, uppercase mono link button — the editorial "pill" CTA used
 * across the site (e.g. CONTACT, SEE WORKS).
 */
export function PillLink({
  href,
  children,
  variant = "outline",
  className,
  ...props
}: PillLinkProps) {
  const styles =
    variant === "solid"
      ? "bg-foreground text-background hover:bg-foreground/85"
      : "border border-border text-foreground hover:bg-foreground hover:text-background";

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
        styles,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
