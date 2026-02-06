# CLAUDE.md — AI Assistant Guide

## Project Overview

This is an **Astro + Fleek starter template** — a minimal static site built with Astro 2.x, designed for deployment on Fleek (IPFS-based hosting). It is a single-page landing template with a dark theme, not a content-driven site.

## Tech Stack

- **Framework:** Astro ^2.3.0 (static output mode, no SSR)
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Module System:** ES Modules (`"type": "module"`)
- **Package Manager:** pnpm (use `pnpm` for all install/run commands)
- **Styling:** Scoped vanilla CSS in `<style>` tags within `.astro` components
- **UI Frameworks:** None — pure Astro components only (no React/Vue/Svelte)
- **CSS Frameworks:** None (no Tailwind, Bootstrap, etc.)

## Commands

All commands run from the project root:

| Command | Action |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server (localhost:3000) |
| `pnpm build` | Build static site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro` | Run Astro CLI directly |

## Project Structure

```
/
├── public/                  # Static assets (served as-is)
│   ├── favicon.svg
│   └── fonts/
│       └── Manrope.ttf     # Custom font
├── src/
│   ├── components/          # Reusable Astro components
│   │   └── Card.astro       #   Card with icon, title, body, href
│   ├── layouts/             # Page layout wrappers
│   │   └── Layout.astro     #   Base HTML layout with <slot />
│   ├── pages/               # File-based routing (each file = a route)
│   │   └── index.astro      #   Landing page (the only route: /)
│   ├── resources/           # SVG assets used in components
│   │   ├── addIcon.svg
│   │   ├── astroIcon.svg
│   │   ├── astroLogo.svg
│   │   ├── fleekIcon.svg
│   │   └── fleekLogo.svg
│   └── env.d.ts             # Astro type definitions
├── astro.config.mjs         # Astro config (static output)
├── tsconfig.json            # TypeScript config (extends astro/strict)
├── package.json             # Dependencies and scripts
└── pnpm-lock.yaml           # Lockfile
```

## Architecture & Patterns

### Routing
- File-based routing via `src/pages/`. Each `.astro` or `.md` file becomes a route.
- Currently a single route: `index.astro` -> `/`
- No dynamic routes, API routes, or middleware.

### Component Conventions
- **Props:** Defined via TypeScript `interface Props {}` in the component frontmatter.
- **Layouts:** Use `<slot />` for content injection. The `Layout.astro` accepts a `title` prop.
- **Cards:** The `Card.astro` component accepts `title`, `body`, `href`, and `icon` string props.
- **SVGs:** Stored in `src/resources/` and imported as image sources (not inline SVG components).

### Styling Conventions
- All CSS is scoped within `<style>` tags in each `.astro` component.
- No global CSS files — global styles are in `Layout.astro`'s `<style is:global>`.
- Dark theme: background `#0C0C0C`, text `#e5e7eb` / `#9ca3af`.
- Custom font: Manrope loaded via `@font-face` from `/fonts/Manrope.ttf`.
- Gradient backgrounds and hover opacity transitions on cards.

### Build Configuration
- Output mode: `static` (pre-rendered HTML, no server runtime needed).
- Build output goes to `./dist/`.
- No Vite customization beyond Astro defaults.

## Development Notes

- No linter (ESLint) or formatter (Prettier) is configured. Follow existing code style.
- No test framework is set up. There are no tests to run.
- No `.env` files or environment variables are used.
- No content collections — this is a static template, not a blog/CMS site.
- The `.astro/` directory is auto-generated for TypeScript types; it is gitignored.

## Deployment

Target platform is **Fleek** (IPFS-based static hosting):
1. Run `fleek sites init` to create `fleek.json` config.
2. Set dist directory to `dist` and build command to `astro build`.
3. Deploy with `fleek sites deploy`.

Fleek also supports CI/CD (`fleek sites ci`) and custom domains (`fleek domains create`).

## Key Files to Know

| File | Purpose |
|---|---|
| `astro.config.mjs` | Astro framework configuration |
| `src/layouts/Layout.astro` | Base HTML template, global styles, meta tags |
| `src/pages/index.astro` | The single landing page |
| `src/components/Card.astro` | Reusable card component for link items |
| `tsconfig.json` | TypeScript strict config |
