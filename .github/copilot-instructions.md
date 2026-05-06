# Copilot Instructions

## Project Context
- This repository is a personal blog/site built with SvelteKit v2 (Svelte 5), TypeScript, and mdsvex.
- The site uses markdown-based articles and has no runtime dependencies (dev tooling only).
- Favor minimal dependencies and keep implementation simple.

## Core Commands
- `npm run dev` starts the dev server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build.
- `npm run check` runs `svelte-check` type checks.
- `npm run check:watch` runs checks in watch mode.
- `npm run prepare` syncs SvelteKit types.
- There is no test runner configured. Use `npm run check` as the primary validation step.

## Architecture
- File-based routes:
  - `/` -> `src/routes/+page.svelte`
  - `/articles` -> `src/routes/articles/+page.svelte`
  - `/articles/[slug]` -> `src/routes/articles/[slug]/`
- Articles are markdown files in `src/content/articles/*.md` with YAML frontmatter keys: `title`, `date`, `description`.
- Article files are auto-discovered via `import.meta.glob()`; do not add manual registration lists.
- mdsvex compiles `.md` files into Svelte components.
- The markdown layout for articles is `src/routes/articles/_article.svelte` and is wired in `svelte.config.js`.

## Data Loading Expectations
- `src/routes/articles/+page.server.ts` should glob all markdown files, extract frontmatter, and sort by date descending.
- `src/routes/articles/[slug]/+page.server.ts` should load a single article by slug from the glob.
- `src/routes/articles/[slug]/+page.svelte` should dynamically import and render the markdown component client-side.

## Editing Guidelines For This Repo
- Preserve existing route structure and mdsvex content flow.
- Keep changes scoped and avoid broad refactors unless requested.
- Maintain TypeScript safety and SvelteKit conventions.
- When changing content loading, ensure slug handling and date sorting behavior stay correct.
- If changing markdown/frontmatter behavior, keep compatibility with existing article files.
