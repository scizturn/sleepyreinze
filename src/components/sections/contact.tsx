"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SocialLinks } from "@/components/social-links";
import { Section } from "@/components/sections/section";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  const [sent, setSent] = useState(false);

  // No backend yet: compose a prefilled email and hand off to the mail client.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact コンタクト"
      label="Say hello"
      title="Let's build something"
      description="Got a project, a question, or just want to say hi? Send a message and I'll reply soon."
    >
      <div className="grid gap-12 border-t border-border/60 pt-10 md:grid-cols-5">
        <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project…"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit">
                  <Send className="size-4" />
                  Send message
                </Button>
                {sent && (
                  <span className="text-sm text-muted-foreground">
                    Opening your email app…
                  </span>
                )}
              </div>
            </form>
        </div>

        <div className="flex flex-col gap-8 md:col-span-2">
          <div className="flex flex-col gap-px">
            <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium transition-colors hover:text-muted-foreground"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Location
              </span>
              <span className="text-sm font-medium">{siteConfig.location}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Find me online
            </span>
            <SocialLinks />
          </div>
        </div>
      </div>
    </Section>
  );
}
