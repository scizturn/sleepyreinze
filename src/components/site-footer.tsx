import { ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { PillLink } from "@/components/pill-link";
import { CyclingWord } from "@/components/motion/cycling-word";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = 2026; // bump as needed; avoids hydration drift from new Date()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-[1480px] px-6">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border/60 py-16 sm:flex-row sm:items-end">
          <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-tighter sm:text-6xl">
            Let&apos;s make something worth{" "}
            <CyclingWord
              words={["shipping.", "keeping.", "sharing.", "building."]}
            />
          </h2>
          <PillLink href={`mailto:${siteConfig.email}`} variant="solid">
            Start a project
            <ArrowUpRight className="size-4" />
          </PillLink>
        </div>

        {/* Full-bleed wordmark */}
        <div className="overflow-hidden py-10">
          <a
            href="#top"
            className="block whitespace-nowrap font-semibold leading-[0.8] tracking-tighter text-[clamp(3rem,16vw,14rem)] text-foreground"
          >
            {siteConfig.handle}
            <span className="align-top text-[0.26em] font-medium text-muted-foreground">
              ™
            </span>
          </a>
        </div>

        {/* Meta row */}
        <div className="flex flex-col gap-8 border-t border-border/60 py-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            <p className="max-w-sm text-sm text-muted-foreground">
              {siteConfig.role} · {siteConfig.location}. Open for project
              commissions.
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.15em]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              © {year} {siteConfig.name}®
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
