# Suvam Shrestha — Flutter Developer Portfolio

A React + TypeScript + Tailwind CSS v4 personal portfolio, built with `motion/react` for animation.

## Stack
- React 19 + TypeScript, bundled with Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `motion/react` for scroll reveals, hero entrance, and micro-interactions
- `react-icons` (Phosphor set) for icons
- Self-hosted fonts via `@fontsource` (Outfit + Manrope)

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Editing content

Almost everything text-based (name, bio, skills, projects, experience, contact links)
lives in **`src/data/content.ts`** — edit that one file to update the site without
touching components.

Things still marked as placeholders to fill in yourself:
- `profile.linkedin` — add your LinkedIn URL
- Any project links you'd rather swap or add (Real Estate app currently has no
  public link since it was built during an internship)

## Project structure

```
src/
  data/content.ts       <- all editable copy & links
  components/           <- one component per section + shared Reveal/Magnetic helpers
  index.css             <- Tailwind v4 theme tokens (colors, fonts)
```

## Design notes
- Palette: warm paper background, cobalt blue + clay orange + sage accents (no dark-navy/purple gradients).
- Typography: Outfit (display) + Manrope (body).
- Motion respects `prefers-reduced-motion` throughout.
