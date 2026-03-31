# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/site built with **SvelteKit v2** (Svelte 5), **TypeScript**, and **mdsvex** for markdown-based articles. No runtime dependencies — dev-only tooling.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type-check with svelte-check
npm run check:watch  # Type-check in watch mode
npm run prepare      # Sync SvelteKit types
```

No test runner is configured.

## Architecture

### Routing (file-based)

- `/` — Home page (`src/routes/+page.svelte`)
- `/articles` — Article listing (`src/routes/articles/+page.svelte`)
- `/articles/[slug]` — Individual article (`src/routes/articles/[slug]/`)

### Content System

Markdown articles live in `src/content/articles/*.md` with YAML frontmatter (`title`, `date`, `description`). They are auto-discovered via `import.meta.glob()` — no manual registration needed.

mdsvex compiles `.md` files into Svelte components. The layout for rendered articles is `src/routes/articles/_article.svelte`. This is configured in `svelte.config.js`.

### Data Loading

- `articles/+page.server.ts` — Globs all markdown files, extracts frontmatter, sorts by date descending
- `articles/[slug]/+page.server.ts` — Loads a single article by slug from the glob
- `articles/[slug]/+page.svelte` — Client-side dynamic import of the markdown component

### Key Config

- `svelte.config.js` — mdsvex preprocessor setup, maps `.md` layout to `_article.svelte`, enables `.md` extensions
- `$lib` path alias maps to `src/lib/`
