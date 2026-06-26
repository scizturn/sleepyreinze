import { ArrowUpRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/motion/reveal";
import { Ticker } from "@/components/motion/ticker";
import { Tilt } from "@/components/motion/tilt";
import { Section } from "@/components/sections/section";
import { projects, siteConfig } from "@/lib/site-config";

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Featured Projects プロジェクト"
      label="Creative Development"
    >
      <div className="flex flex-col gap-14">
        {/* Scrolling ticker headline */}
        <Reveal className="-mx-6 overflow-hidden border-y border-border/60 py-3">
          <Ticker text="Selected Works©   " />
        </Reveal>

        {/* Intro + link to everything */}
        <div className="flex max-w-xl flex-col items-start gap-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            A mix of web builds, motion, and design experiments — ideas turned
            into fast, polished, real things. More lives on my GitHub.
          </p>
          <PillLink href={siteConfig.socials.github} variant="solid">
            See all works
            <ArrowUpRight className="size-4" />
          </PillLink>
        </div>

        {/* Compact card grid */}
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const number = String(i + 1).padStart(2, "0");
            const href = project.href || project.repo;
            return (
              <Reveal key={project.title} delay={(i % 3) * 0.06}>
                <a
                  href={href || undefined}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group block"
                >
                  <Tilt max={5}>
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[10px] border border-border/60 bg-gradient-to-br from-card to-background">
                      <span className="font-semibold leading-none tracking-tighter text-[clamp(3rem,7vw,5rem)] text-muted-foreground/15 transition-transform duration-500 group-hover:scale-105">
                        {number}
                      </span>
                      <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur transition-colors group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </Tilt>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                        {project.tags[0]}
                      </span>
                      <h3 className="mt-0.5 truncate text-base font-medium tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      ({number})
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-3 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground/70">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
