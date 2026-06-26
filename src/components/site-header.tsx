"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto grid w-full max-w-[1480px] grid-cols-2 items-start gap-4 px-6 py-4 md:grid-cols-3">
        {/* Brand */}
        <a href="#top" className="text-lg font-semibold tracking-tight">
          {siteConfig.handle}
          <span className="align-super text-xs text-muted-foreground">®</span>
        </a>

        {/* Quick links (desktop) */}
        <div className="hidden flex-col gap-1.5 md:flex">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            Quick Links
          </span>
          <nav className="flex flex-wrap gap-x-1.5 text-sm">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-muted-foreground"
              >
                {link.label}
                {i < navLinks.length - 1 ? "," : ""}
              </a>
            ))}
          </nav>
        </div>

        {/* Based-in + role (desktop) */}
        <div className="hidden items-start justify-end gap-4 md:flex">
          <div className="flex flex-col gap-1.5 text-right">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Based in {siteConfig.location}
            </span>
            <span className="text-sm">{siteConfig.role}</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center justify-end gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 md:hidden",
          open ? "max-h-80" : "max-h-0 border-t-0",
        )}
      >
        <nav className="mx-auto flex w-full max-w-[1480px] flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
