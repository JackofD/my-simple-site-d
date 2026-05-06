# "From the Archive" Section Component

## Context

The user wants a reusable section component that displays a given list of articles (typically the three most recent). It should be droppable into any page, accept its data via props (so the host page controls what's shown), have a glassmorphic background that visually separates it from the page background — similar to the sticky header's translucent treatment — and behave well on mobile.

The site is small SvelteKit + mdsvex. Articles live as `.md` files in `src/content/articles/` and are discovered via `import.meta.glob(..., { eager: true })`. The glob/parse/sort logic currently lives only in [`src/routes/articles/+page.server.ts`](../src/routes/articles/+page.server.ts), so we'll extract it once to share.

Theme tokens (colors, spacing, radii, fonts, shadows) already exist in [`src/app.css`](../src/app.css). The header's glass treatment in [`src/routes/+layout.svelte`](../src/routes/+layout.svelte) (`rgba(...)` + `backdrop-filter: blur(8px)`) is the reference for the section background.

### Decisions confirmed with user
- **API:** Component accepts the article list as a prop (data-driven, not self-loading).
- **Initial placement:** Home page, below the hero. Component is general-purpose — can be added to any page.
- **Card visual:** Extract a shared `ArticleCard` component so the section and the `/articles` page share one source of truth.
- **No "View all" link** at the bottom of the section.
- **Section title:** "From the Archive" (configurable via prop).

## Approach

### 1. Extract shared article-loading helper — `src/lib/articles.ts`
Exports:
- `Article` type: `{ slug: string; title: string; date: string; description: string }`
- `getAllArticles(): Article[]` — eager `import.meta.glob('../content/articles/*.md', { eager: true })`, parses frontmatter, filters invalid, sorts by date desc.
- `getLatestArticles(limit = 3): Article[]` — convenience wrapper over `getAllArticles().slice(0, limit)`.

`eager: true` bundles statically, so this works in server load files and client components alike. Refactor [`src/routes/articles/+page.server.ts`](../src/routes/articles/+page.server.ts) to use `getAllArticles()` instead of inlining the logic.

### 2. Extract `ArticleCard` — `src/lib/components/ArticleCard.svelte`
Move the card markup + scoped styles currently inside [`src/routes/articles/+page.svelte`](../src/routes/articles/+page.svelte) into a shared component.
- Props: `article: Article`.
- Renders the same warm card visible today (title, date eyebrow, description, "Read more →").
- Used by both the listing page and the new section.

### 3. Build the section — `src/lib/components/ArticleArchive.svelte`
Pure presentation. No data loading inside.
- Props:
  - `articles: Article[]` (required) — caller decides how many.
  - `title?: string` (default `"From the Archive"`).
- Renders a `<section>` containing:
  - `<h2>` styled with the serif font + italic accent (matching home hero treatment).
  - Responsive grid of `<ArticleCard>` for each article in `articles`.
- **Glassmorphic surface:**
  - `background: rgba(255, 253, 247, 0.55);` (semi-transparent `--color-surface`).
  - `backdrop-filter: saturate(140%) blur(14px);` plus `-webkit-` prefix.
  - `border: var(--border-width) solid var(--color-border-soft);`
  - `border-radius: var(--radius-xl);`
  - `box-shadow: var(--shadow-md);`
  - Padding scales: `--space-2xl` desktop → `--space-xl` tablet → `--space-lg` mobile.
- **Responsive grid:**
  - `grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));` — naturally drops from 3-up → 2-up → 1-up.
  - Gap: `--space-lg`.
  - Title centers and downsizes on narrow viewports.

### 4. Wire it onto the home page
- New: `src/routes/+page.server.ts` — load latest 3 articles via `getLatestArticles(3)`, return `{ articles }`.
- Modify [`src/routes/+page.svelte`](../src/routes/+page.svelte): accept `data: PageData`, render `<ArticleArchive articles={data.articles} />` below the existing hero. Hero text stays untouched.

### Files to create / modify
- **New:** `src/lib/articles.ts`
- **New:** `src/lib/components/ArticleCard.svelte`
- **New:** `src/lib/components/ArticleArchive.svelte`
- **New:** `src/routes/+page.server.ts`
- **Modify:** `src/routes/+page.svelte` (add section below hero)
- **Modify:** `src/routes/articles/+page.server.ts` (use shared helper)
- **Modify:** `src/routes/articles/+page.svelte` (use `ArticleCard`)

## Theme variables used
All styling continues to flow through tokens defined in [`src/app.css`](../src/app.css#L7) — `--color-surface`, `--color-border-soft`, `--color-accent`, `--space-*`, `--radius-xl`, `--shadow-md`, `--font-heading`. No new tokens needed.

## Verification
1. `npm run check` — 0 errors / 0 warnings.
2. `npm run dev` and visually confirm at `http://localhost:5173`:
   - "From the Archive" section renders below the home hero.
   - Section shows exactly 3 articles, newest first (current data: May 1, Apr 28, Apr 25).
   - Glass surface is visible — translucent panel reads clearly against the page background.
   - Cards link through to the correct `/articles/[slug]`.
   - Resize: at ~< 700 px the grid collapses to 1 column; padding/typography stay readable.
   - At tablet width the cards land 2-up before stacking.
3. Confirm `/articles` page still renders correctly after the `ArticleCard` extraction (regression check).
4. Confirm the component is genuinely portable: drop `<ArticleArchive articles={...} />` into another route as a smoke test if desired (manual / not required).
