import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/sections/section";
import { skillGroups } from "@/lib/site-config";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Toolkit ツールキット"
      label="Stack"
      title="Capabilities"
    >
      <div className="border-t border-border/60">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 0.06}
            className="grid items-baseline gap-x-6 gap-y-3 border-b border-border/60 py-8 md:grid-cols-12"
          >
            <span className="font-mono text-xs text-muted-foreground md:col-span-1">
              ({String(i + 1).padStart(2, "0")})
            </span>
            <h3 className="text-2xl font-medium tracking-tight md:col-span-5 sm:text-3xl">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-muted-foreground md:col-span-6">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
