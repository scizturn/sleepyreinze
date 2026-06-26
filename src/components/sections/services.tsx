import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/sections/section";
import { services } from "@/lib/site-config";

const bannerWords = [
  "Precise",
  "Structured",
  "Focused",
  "Fast",
  "Maintainable",
  "Accessible",
];

export function Services() {
  return (
    <Section
      id="services"
      index="05"
      eyebrow="Capabilities サービス内容"
      label="Digital Execution"
      title={`Services (${String(services.length).padStart(2, "0")})`}
      huge
    >
      <div className="flex flex-col gap-14">
        <Reveal className="-mx-6">
          <Marquee items={bannerWords} />
        </Reveal>

        {/* Numbered service rows */}
        <div className="border-t border-border/60">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.05}
              className="grid items-baseline gap-x-6 gap-y-2 border-b border-border/60 py-8 md:grid-cols-12"
            >
              <span className="font-mono text-xs text-muted-foreground md:col-span-1">
                ({String(i + 1).padStart(2, "0")})
              </span>
              <h3 className="text-2xl font-medium tracking-tight md:col-span-4 sm:text-3xl">
                {service.title}
              </h3>
              <p className="max-w-xl text-muted-foreground md:col-span-7">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-medium tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-sm text-muted-foreground">
              Tell me about it and I&apos;ll get back to you within a day or two.
            </p>
          </div>
          <PillLink href="#contact" variant="solid">
            Start a project
            <ArrowRight className="size-4" />
          </PillLink>
        </div>
      </div>
    </Section>
  );
}
