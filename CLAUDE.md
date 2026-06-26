# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above carries Next.js 16's "this is NOT the Next.js you know" warning — heed it. When unsure about an App Router API, check `node_modules/next/dist/docs/` rather than relying on training data.

## Project

Personal portfolio site for Tegar Ardyansyah (`sleepyreinze`). Currently a single-page portfolio with social/contact links. Planned: a "project commissions / order" flow and motion-based animations — keep new code structured so those can be added without a rewrite.

## Commands

- `pnpm dev` — start the dev server (Turbopack) at http://localhost:3000
- `pnpm build` — production build; runs TypeScript type-checking as part of the build (there is no separate `typecheck` script — use `pnpm build` to catch type errors)
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (flat config, `eslint-config-next`)

This repo uses **pnpm**. Use `pnpm dlx shadcn@latest add <component>` to pull in new UI primitives.

## Stack

- **Next.js 16** App Router + **React 19**, TypeScript, `src/` dir, import alias `@/*` → `src/*`
- **Tailwind CSS v4** (config-less; theme lives in `src/app/globals.css` via `@theme`/CSS variables, not a `tailwind.config.js`)
- **shadcn/ui** built on **Base UI** (`@base-ui/react`) — NOT Radix. This is the most important thing to know (see below).
- **lucide-react v1** for icons
- Turbopack for dev and build

## Design language

The site follows a **dark editorial** direction (inspired by the "Palmer"/"Akihiko" Framer template). Key traits:
- **Dark by default** (`defaultTheme="dark"` in the layout) on a near-black background; theme tokens in `globals.css` are pure greys (`oklch(x 0 0)`) — **monochrome only, no colored accents**. A light theme still exists via the toggle.
- **Heavy, oversized display type**: headings use `font-bold`/`font-extrabold` with `tracking-tighter`. The hero wordmark and the "huge" section titles use viewport-relative sizes (`text-[clamp(...,Xvw,...)]`). Pass `huge` to `Section` for the oversized titles that **bleed off the edges** (e.g. "Selected Works©", "Services").
- **Mono micro-labels**: section eyebrows are `font-mono uppercase tracking-[0.2em]` with two-digit markers `(01)` and `™`/`®`/`©` flourishes.
- **Pill CTAs**: use `PillLink` (`src/components/pill-link.tsx`) for link buttons — rounded-full, uppercase mono. `solid` = filled, `outline` = bordered. Prefer this over shadcn `Button` for navigation/links.
- **Thin border rules** (`border-border/60`) separate sections; projects render as **image tiles** with placeholder thumbnails (swap in real screenshots later).

When adding sections, reuse `Section` (pass `index`, `eyebrow`, and `huge` where appropriate) and follow this vocabulary. The layout container is `max-w-7xl`.

## Animation

Uses **Motion** (`motion` package, import from `motion/react`). Reusable primitives live in `src/components/motion/`:
- `Reveal` — fade + slide-up on scroll (`whileInView`, fires once); pass `delay` for manual stagger and `as` for the element (`div`/`li`/`span`/`section`). Motion components are pre-created at module scope in a `MOTION_TAGS` map — **do not call `motion(tag)` during render** (the `react-hooks/static-components` lint rule rejects it; add new tags to the map instead).
- `AnimatedLines` — staggered line-by-line mask reveal for big headings (hero).
- `Marquee` — infinite horizontal scroll strip.

All three respect `prefers-reduced-motion` via `useReducedMotion`. `Section` wraps its heading in `Reveal` automatically, so any section built with it animates on scroll.

**Base UI buttons as links:** when a `Button` uses `render={<a … />}`, also pass `nativeButton={false}` — otherwise Base UI warns at runtime about losing native button semantics.

## Critical conventions

**Base UI, not Radix.** The shadcn components here wrap `@base-ui/react`. The composition API differs from older shadcn/Radix code:
- To render a component as a different element (e.g. a `Button` as an `<a>`), use the **`render` prop**, NOT `asChild`:
  ```tsx
  <Button render={<a href="..." target="_blank" rel="noreferrer" />}>Label</Button>
  ```
  `asChild` does not exist and will fail type-checking.

**lucide-react v1 has no brand icons.** `Github`, `Linkedin`, `Instagram`, Twitter/X etc. were removed. Brand glyphs are hand-rolled inline SVGs in `src/components/social-links.tsx`. Add new brand marks there as inline SVGs; only import generic UI icons from `lucide-react` (verify an export exists before importing — many names changed).

**Single source of personal data.** All name, role, tagline, email, URL, and social links live in `src/lib/site-config.ts`. Edit content there — pages/components read from it and SEO metadata in `src/app/layout.tsx` is derived from it. Don't hardcode these values in components. `siteConfig.url` must be set to the real deployed origin for Open Graph/`metadataBase` to be correct.

**All brand icons live in `src/components/brand-icons.tsx`** — import `GithubIcon`/`LinkedinIcon`/`InstagramIcon`/`XIcon` from there, do not duplicate the SVGs.

**Theme toggle is CSS-driven, not state-driven.** `src/components/theme-toggle.tsx` renders both Sun and Moon and toggles visibility with the `dark:` variant. Don't reintroduce a `mounted`/`useState`-in-`useEffect` pattern — the `react-hooks/set-state-in-effect` lint rule (enforced in `pnpm lint`) rejects it. Theme is provided by `next-themes` via `ThemeProvider` (`attribute="class"`) in the root layout, which also sets `suppressHydrationWarning` on `<html>`.

## Layout

- `src/app/layout.tsx` — root layout; `ThemeProvider`, `SiteHeader`, `SiteFooter`, fonts (**Inter** for sans/display via `next/font`, Geist Mono for labels — Inter matches the reference Framer template), SEO metadata derived from `siteConfig`
- `src/app/page.tsx` — composes the page from section components (server component)
- `src/lib/site-config.ts` — all content data: `siteConfig`, `navLinks`, `skillGroups`, `projects`, `services`. **Edit content here.** Section components map the string `icon` fields to lucide components via a local `icons` record.
- `src/components/sections/*` — one component per page section (`hero`, `about`, `skills`, `projects`, `services`, `contact`); `section.tsx` is the shared heading/shell wrapper
- `src/components/site-header.tsx` / `site-footer.tsx` — nav (with mobile menu) and footer
- `src/components/ui/*` — shadcn primitives (generated; prefer re-running shadcn to update over heavy hand-editing)
- `src/lib/utils.ts` — `cn()` class-merge helper

The contact form (`sections/contact.tsx`) has **no backend** — it composes a `mailto:` link on submit. Wire it to a real endpoint (e.g. a Next.js route handler or a form service) when you want server-side delivery.
