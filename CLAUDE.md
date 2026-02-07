# CLAUDE.md

## Project Overview

This is an **Astro + Fleek Starter Kit** — a minimal static site template built with Astro and designed for deployment on Fleek (IPFS-based decentralized hosting). It serves as a landing page with links to Fleek and Astro documentation resources.

- **Framework**: Astro 2.3.0
- **Output mode**: Static (SSG)
- **Package manager**: pnpm
- **TypeScript**: Enabled (strict mode via `astro/tsconfigs/strict`)

## Project Structure

```
src/
├── components/
│   └── Card.astro          # Reusable card component (props: title, body, href, icon)
├── layouts/
│   └── Layout.astro         # Base HTML layout with global styles and custom Manrope font
├── pages/
│   └── index.astro          # Single landing page with logo grid and card links
├── resources/
│   ├── addIcon.svg          # SVG icons and logos used in pages
│   ├── astroIcon.svg
│   ├── astroLogo.svg
│   ├── fleekIcon.svg
│   └── fleekLogo.svg
└── env.d.ts                 # Astro client type references
public/
├── favicon.svg
└── fonts/
    └── Manrope.ttf          # Custom font file
```

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (localhost:4321) |
| `pnpm build` | Build static site to `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro` | Run Astro CLI commands (e.g., `pnpm astro add`, `pnpm astro check`) |

## Architecture & Conventions

### Astro Components
- All UI is built with `.astro` single-file components (no React/Vue/Svelte)
- Components use **scoped `<style>` blocks** for CSS (no Tailwind or CSS framework)
- The Layout component applies global styles via the `is:global` directive
- Component props are defined using TypeScript interfaces in the frontmatter

### Styling
- **Dark theme**: Background `#0C0C0C`, light gray text (`#e5e7eb`, `#9ca3af`)
- **Custom font**: Manrope (loaded from `public/fonts/Manrope.ttf`)
- **No CSS framework**: Native CSS with scoped styles per component
- Layout uses flexbox and CSS Grid for positioning

### Static Assets
- SVG icons/logos live in `src/resources/` (imported into components)
- Public static files (favicon, fonts) live in `public/`

### Configuration
- `astro.config.mjs` — Astro config (static output, no integrations)
- `tsconfig.json` — Extends `astro/tsconfigs/strict`

## Deployment

This project is designed for **Fleek** deployment (IPFS-based hosting):
1. `fleek sites init` — Initialize Fleek site config
2. `fleek sites deploy` — Deploy `dist/` to IPFS
3. `fleek sites ci` — Set up CI/CD
4. `fleek domains create` — Add custom domains

Build output directory: `dist/`

## Key Notes for AI Assistants

- There is **no testing framework** configured — no Vitest, Jest, or test files exist
- There are **no linting or formatting tools** configured (no ESLint, Prettier)
- The only dependency is `astro` itself — this is intentionally minimal
- There are **no content collections** — all content is hardcoded in page/component files
- There are **no environment variables** in use, though `.env` is gitignored
- The project has a single page (`index.astro`) and one reusable component (`Card.astro`)
- When adding new pages, place them in `src/pages/` following Astro's file-based routing
- When adding new reusable components, place them in `src/components/`
