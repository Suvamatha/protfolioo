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

## Live Flutter demos (FlutterShow)

Live demos come from FlutterShow (https://flutter-app-demo-web.vercel.app). The site reads
`<FlutterShow>/demos/index.json` and matches each project by its GitHub `repo`. **You never need
demo IDs.**

### Add a new project — no code help needed

1. Build it: open FlutterShow → **New Project** → paste the GitHub URL. Wait ~5 minutes.
   → It shows up automatically in the **Playground** section of this site.
2. Want it as a big featured project? Add one object to `projects` in `src/data/content.ts`:

```ts
{
  name: "My New App",
  oneLiner: "One sentence about it.",
  tech: ["Flutter", "Dart"],
  challenge: "The hardest part and how you solved it.",
  repo: "https://github.com/Suvamatha/my_new_app",   // ← the demo is found from this
  linkLabel: "View on GitHub",
  visual: "wellspring",            // "wellspring" | "flood" | "realEstate" (background art)
},
```

Each project's phone shows, in order: the live demo → your `screenshots` → a "coming soon" screen.

- **Private app / no public code?** Put screenshots in `public/projects/` and add
  `screenshots: ["/projects/app-1.png", "/projects/app-2.png"]`. They play as a slideshow.
- **Hide a demo from the Playground:** add its repo URL to `fluttershow.hideFromPlayground`.
- **Different FlutterShow?** Set `VITE_FLUTTERSHOW_URL` (see `.env.example`).

Dev server runs on port 5174, so it never clashes with FlutterShow on 5173.
