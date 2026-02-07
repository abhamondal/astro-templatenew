# Test Coverage Analysis

## Current State: No Tests Exist

This codebase currently has **zero test coverage**. There are:

- No test files (`*.test.*`, `*.spec.*`)
- No test runner configured (no Vitest, Jest, Playwright, etc.)
- No testing dependencies in `package.json`
- No test scripts in `package.json`
- No CI/CD pipeline to enforce testing

---

## Codebase Summary

| Area | Files | Description |
|------|-------|-------------|
| Pages | `src/pages/index.astro` | Single homepage with 4 Card components |
| Layouts | `src/layouts/Layout.astro` | Base HTML layout with global styles |
| Components | `src/components/Card.astro` | Reusable card with props: `title`, `body`, `href`, `icon` |
| Config | `astro.config.mjs` | Static output mode |
| Assets | 6 SVGs, 1 font | Static resources |

---

## Recommended Test Coverage Areas

### 1. Build Verification (Priority: HIGH)

**Why:** The most fundamental test — does the project build successfully?

**What to test:**
- `astro build` completes without errors
- Output directory (`dist/`) is generated
- `index.html` is produced in `dist/`

**Suggested tool:** A simple npm script + shell assertion, or Vitest with a build helper.

---

### 2. Component Rendering Tests (Priority: HIGH)

**Why:** The `Card` component has a TypeScript `Props` interface that enforces a contract. Tests should verify the component renders correctly with valid props.

**What to test:**
- `Card.astro` renders an `<a>` tag with the correct `href`
- `Card.astro` renders the `title` inside an `<h2>`
- `Card.astro` renders the `body` inside a `<p>`
- `Card.astro` renders an `<img>` with the correct `icon` src
- `Layout.astro` sets the `<title>` element from props
- `Layout.astro` includes the viewport meta tag
- `Layout.astro` includes the favicon link

**Suggested tool:** [Astro Container API](https://docs.astro.build/en/reference/container-reference/) (available in Astro 4+) or rendering tests via Vitest with `@astrojs/test-utils`.

---

### 3. Page Integration Tests (Priority: HIGH)

**Why:** The index page composes multiple components and should produce correct, accessible HTML.

**What to test:**
- The page contains exactly 4 Card entries
- All external links (`docs.fleek.xyz`, `docs.astro.build`, `blog.fleek.xyz`, `astro.build/integrations`) are present and correct
- The `<ul>` has `role="list"` for accessibility
- Logos for Fleek and Astro are rendered
- The page title is "Welcome to Astro."

**Suggested tool:** Vitest + Cheerio (parse built HTML) or Playwright for browser-based checks.

---

### 4. Accessibility Tests (Priority: MEDIUM)

**Why:** The page has accessibility-relevant markup (e.g., `role="list"`) but may have gaps.

**What to test:**
- All `<img>` elements have `alt` attributes (currently missing on all images — this is a bug)
- Color contrast ratios meet WCAG AA for text (`#9ca3af` on `#0C0C0C` background)
- Page is navigable via keyboard
- Semantic HTML structure is correct

**Suggested tool:** [axe-core](https://github.com/dequelabs/axe-core) via Playwright or `jest-axe`.

---

### 5. Static Asset Validation (Priority: MEDIUM)

**Why:** The layout references a font at `/fonts/manrope.tff` but the actual file is `/fonts/Manrope.ttf` — there is both a **typo in the extension** (`.tff` vs `.ttf`) and a **case mismatch** (`manrope` vs `Manrope`). This means the custom font likely never loads.

**What to test:**
- All referenced assets (fonts, SVGs, favicon) exist at their expected paths
- Font file format declaration is correct (`format('tff')` should be `format('truetype')`)
- Favicon is accessible at `/favicon.svg`

**Suggested tool:** A custom Vitest test that verifies file existence, or a post-build link checker.

---

### 6. HTML Validity & SEO Tests (Priority: LOW)

**Why:** Ensures the generated HTML follows standards and has basic SEO elements.

**What to test:**
- Generated HTML passes W3C validation
- Page has a `<meta charset>` tag
- Page has a `<meta name="viewport">` tag
- Page has a `<title>` element
- Page has a `<meta name="description">` tag (currently missing)

**Suggested tool:** [html-validate](https://html-validate.org/) or a custom Vitest test on built output.

---

### 7. Visual Regression Tests (Priority: LOW)

**Why:** The template relies heavily on specific styling (dark theme, gradients, grid layout). Visual regressions could go unnoticed.

**What to test:**
- Homepage renders correctly at desktop viewport
- Homepage renders correctly at mobile viewport (responsive behavior is untested — the `.description` has a fixed `width: 752px` which will overflow on mobile)
- Card hover states work correctly

**Suggested tool:** Playwright with screenshot comparison or [Percy](https://percy.io/).

---

## Bugs Discovered During Analysis

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | **High** | `Layout.astro:28` | Font path is wrong: `src: url('/fonts/manrope.tff') format('tff')` should be `src: url('/fonts/Manrope.ttf') format('truetype')` |
| 2 | **Medium** | `Card.astro:15` | Duplicate `class` attribute on `<img>`: `class="card-icon"` and `class="icon"` |
| 3 | **Medium** | `index.astro`, `Card.astro` | All `<img>` tags are missing `alt` attributes (accessibility violation) |
| 4 | **Low** | `index.astro:79` | Fixed width `.description { width: 752px }` will cause horizontal overflow on smaller viewports |
| 5 | **Low** | `index.astro:20` | Typo: "cheking" should be "checking" |

---

## Recommended Test Stack

For an Astro project of this size, the following lightweight stack is recommended:

```
vitest              — Fast unit/integration test runner (native ESM, Vite-based)
@playwright/test    — End-to-end browser testing
axe-playwright      — Accessibility testing integration
```

### Suggested `package.json` additions:

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0",
    "cheerio": "^1.0.0-rc.12"
  },
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

---

## Suggested Implementation Order

1. **Add Vitest + build verification test** — ensures `astro build` works (catches breaking config changes)
2. **Add HTML output tests** — parse built HTML with Cheerio to verify structure
3. **Fix the bugs found above** — especially the font path and missing alt attributes
4. **Add Playwright e2e tests** — verify page renders in a real browser
5. **Add accessibility tests** — catch a11y violations automatically
6. **Add CI/CD pipeline** — run tests on every push via GitHub Actions
