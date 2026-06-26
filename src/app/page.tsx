import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/motion/marquee";

const techMarquee = [
  "After Effects",
  "Premiere Pro",
  "Photoshop",
  "Illustrator",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Marquee items={techMarquee} />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
