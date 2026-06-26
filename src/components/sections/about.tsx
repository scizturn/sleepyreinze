import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Section } from "@/components/sections/section";
import { siteConfig } from "@/lib/site-config";

const facts = [
  { label: "Role", value: siteConfig.role },
  { label: "Location", value: siteConfig.location },
  { label: "Status", value: "Open to commissions" },
  { label: "Focus", value: "Web / Frontend" },
];

export function About() {
  return (
    <Section id="about" index="02" eyebrow="Profile プロフィール" label="Web Developer">
      <div className="flex flex-col gap-16">
        <RevealText
          text="A hybrid of design and code — I build fast, modern web experiences and craft motion graphics and visuals, with care for detail, rhythm, and the small things that make work feel polished."
          className="max-w-5xl font-medium leading-[1.06] tracking-tight text-[clamp(1.6rem,4.4vw,3.1rem)]"
        />

        <div className="grid gap-12 border-t border-border/60 pt-10 md:grid-cols-12">
          <Reveal className="flex flex-col items-start gap-8 md:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {siteConfig.about}
            </p>
            <PillLink href="#contact" variant="solid">
              Get in touch
            </PillLink>
          </Reveal>

          <dl className="flex flex-col gap-px self-start md:col-span-5">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3"
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
