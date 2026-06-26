/**
 * Central place for all personal/site data.
 * Edit these values — every page and component reads from here.
 */
export const siteConfig = {
  name: "Tegar Ardyansyah",
  handle: "sleepyreinze",
  role: "Developer & Motion Designer",
  // Short intro shown in the hero section.
  tagline:
    "Hybrid developer and designer — I build fast web experiences and craft motion & graphic design.",
  // Longer "about me" copy.
  about:
    "I'm a hybrid developer and designer from Indonesia — I build modern, performant websites and web apps, and I craft motion graphics and graphic design. I care about clean interfaces, snappy load times, and visuals that move. I'm currently opening up for freelance project commissions — web, motion, design, or all three.",
  location: "Indonesia",
  // Used for SEO metadata and the contact button.
  email: "bimotyastomo@gmail.com",
  // Set this once you deploy (used for SEO/Open Graph absolute URLs).
  url: "https://sleepyreinze.dev",
  socials: {
    github: "https://github.com/scizturn",
    gitlab: "https://gitlab.com/scizturn", // TODO: confirm your real GitLab username
    linkedin: "https://www.linkedin.com/in/sleepyreinze", // TODO: confirm
    instagram: "https://www.instagram.com/sleepyreinze", // TODO: confirm
    x: "https://x.com/sleepyreinze", // TODO: confirm
  },
} as const;

/** In-page navigation. `href` values are anchor IDs on the home page. */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

/** Grouped tech/skills. `icon` maps to a lucide icon name in skills.tsx. */
export const skillGroups = [
  {
    title: "Design & Motion",
    icon: "Clapperboard",
    items: [
      "Motion Graphics",
      "After Effects",
      "Premiere Pro",
      "Photoshop",
      "Illustrator",
      "Figma",
    ],
  },
  {
    title: "Web Development",
    icon: "Code2",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Bots & Automation",
    icon: "Layers",
    items: ["Discord.js", "Node.js", "TypeScript", "REST APIs"],
  },
  {
    title: "Data & ML",
    icon: "Server",
    items: ["Python", "scikit-learn", "Data analysis", "Confusion matrix"],
  },
  {
    title: "Tooling",
    icon: "Palette",
    items: ["Git", "GitHub", "GitLab", "Vercel"],
  },
] as const;

/** A portfolio project. `href` is a live demo (optional), `repo` is source (optional). */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo: string;
  featured: boolean;
};

/**
 * Portfolio projects. `tags` are tech used; `href`/`repo` are optional links.
 * Add a live `href` once a project is deployed.
 */
export const projects: Project[] = [
  {
    title: "Vivian Ticketing Bot",
    description:
      "A Discord ticketing bot that automates support requests — opening, tracking, and closing tickets inside a server.",
    tags: ["TypeScript", "Discord.js", "Node.js"],
    href: "",
    repo: "https://github.com/scizturn/Vivian-Ticketing-Bot-Discord",
    featured: true,
  },
  {
    title: "Spotify Algorithm",
    description:
      "An exploration of Spotify's recommendation system — analysing how tracks are suggested and surfaced.",
    tags: ["Python", "Data analysis"],
    href: "",
    repo: "https://github.com/scizturn/SpotifyAlgorithm",
    featured: true,
  },
  {
    title: "Kaori Kyou Widget",
    description:
      "An interactive widget application built with JavaScript for embedding dynamic content.",
    tags: ["JavaScript"],
    href: "",
    repo: "https://github.com/scizturn/Kaori-Kyou-Widget",
    featured: false,
  },
  {
    title: "Nochizuu Bot",
    description:
      "A multipurpose Discord bot handling automation and community features for servers.",
    tags: ["JavaScript", "Discord.js"],
    href: "",
    repo: "https://github.com/scizturn/Nochizuuubot",
    featured: false,
  },
  {
    title: "Confusion Matrix",
    description:
      "A machine-learning evaluation tool for visualising classification model performance.",
    tags: ["Python", "Machine learning"],
    href: "",
    repo: "https://github.com/scizturn/Confusion-Matrix",
    featured: false,
  },
  {
    title: "ProgramingWeb",
    description:
      "University web-programming coursework — foundational HTML/CSS web pages and exercises.",
    tags: ["HTML", "CSS"],
    href: "",
    repo: "https://github.com/scizturn/ProgramingWeb",
    featured: false,
  },
];

/** Services offered — the basis for the upcoming "project order" flow. */
export const services = [
  {
    title: "Motion Graphics",
    icon: "Clapperboard",
    description:
      "Animated graphics, logo stings, social motion, and explainer animation with rhythm and intent.",
  },
  {
    title: "Graphic Design",
    icon: "PenTool",
    description:
      "Brand visuals, posters, social assets, and layout — clean, considered, and on-brand.",
  },
  {
    title: "Landing Pages",
    icon: "Rocket",
    description:
      "High-converting, responsive landing pages that load fast and look sharp on every device.",
  },
  {
    title: "Web Applications",
    icon: "Layers",
    description:
      "Full-stack web apps with clean UI, sensible architecture, and maintainable code.",
  },
  {
    title: "Performance & SEO",
    icon: "Gauge",
    description:
      "Audits and improvements for Core Web Vitals, accessibility, and search visibility.",
  },
  {
    title: "Bots & Automation",
    icon: "Bot",
    description:
      "Discord bots and automation that handle support, moderation, and community workflows end to end.",
  },
  {
    title: "Data & ML Tools",
    icon: "LineChart",
    description:
      "Small data and machine-learning tools — analysis, evaluation, and visualisation built in Python.",
  },
  {
    title: "Maintenance & Support",
    icon: "Wrench",
    description:
      "Ongoing care for an existing site or app — updates, fixes, and improvements as it grows.",
  },
] as const;

export type SiteConfig = typeof siteConfig;
