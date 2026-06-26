import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { AnimatedLines } from "@/components/motion/animated-lines";
import { Marquee } from "@/components/motion/marquee";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ScrollFade } from "@/components/motion/scroll-fade";
import { Tilt } from "@/components/motion/tilt";
import { siteConfig } from "@/lib/site-config";

// Multi-line hero statement (revealed line-by-line), with a Japanese flourish
// on the last line — reflects the hybrid design + motion + code work.
const statement = [
  "Design, motion, and",
  "code — fast, clean,",
  "and built to leave",
  <span key="last">
    a bold <span className="text-muted-foreground">印象.</span>
  </span>,
];

const bannerWords = [
  "Motion Graphics",
  "Graphic Design",
  "Web Development",
  "Frontend",
  "Creative Engineering",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 sm:pt-24">
      {/* Top: statement + portrait reel */}
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-12 px-6 md:flex-row md:items-start md:justify-between">
        <Reveal className="max-w-2xl pt-2">
          <AnimatedLines
            className="block font-medium leading-[1.02] tracking-tight text-[clamp(2rem,4.8vw,3.4rem)]"
            lines={statement}
          />
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PillLink href={`mailto:${siteConfig.email}`} variant="solid">
              Contact
            </PillLink>
            <PillLink href="#projects">
              See works
              <ArrowDownRight className="size-4" />
            </PillLink>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="w-full shrink-0 md:w-72">
          <Parallax amount={28}>
            <Tilt max={7}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] border border-border/60 bg-card">
                <Image
                  src="/portrait.jpg"
                  alt={siteConfig.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 18rem"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/80 mix-blend-difference">
                  {siteConfig.handle}
                </span>
                <span className="absolute right-3 top-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/80 mix-blend-difference">
                  ™
                </span>
              </div>
            </Tilt>
          </Parallax>
        </Reveal>
      </div>

      {/* Solid light keyword banner */}
      <div className="mt-14 sm:mt-20">
        <Marquee items={bannerWords} tone="solid" />
      </div>

      {/* Full-bleed wordmark — oversized, bleeds off the bottom */}
      <ScrollFade className="mt-8 sm:mt-10" y={-90} minOpacity={0.25}>
        <div className="mx-auto w-full max-w-[1480px] overflow-hidden px-6">
          <AnimatedLines
            className="block font-bold leading-[0.74] tracking-tighter text-[clamp(3.5rem,19vw,17rem)]"
            lines={[
              <span key="mark">
                {siteConfig.handle}
                <span className="align-top text-[0.3em] font-semibold text-muted-foreground">
                  ™
                </span>
              </span>,
            ]}
          />
        </div>
      </ScrollFade>
    </section>
  );
}
