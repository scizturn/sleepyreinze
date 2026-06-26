import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  GitlabIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  type BrandIconProps,
} from "@/components/brand-icons";
import { siteConfig } from "@/lib/site-config";

const links: { label: string; href: string; Icon: ComponentType<BrandIconProps> }[] = [
  { label: "GitHub", href: siteConfig.socials.github, Icon: GithubIcon },
  { label: "GitLab", href: siteConfig.socials.gitlab, Icon: GitlabIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: "X", href: siteConfig.socials.x, Icon: XIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
];

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <Button
            variant="outline"
            size="icon"
            aria-label={label}
            nativeButton={false}
            render={
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
              />
            }
          >
            <Icon className="size-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
