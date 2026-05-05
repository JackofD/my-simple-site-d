---
applyTo: "src/content/articles/**/*.md,src/routes/articles/**/*.ts,src/routes/articles/**/*.svelte,svelte.config.js"
description: "Use when editing article markdown, article routes, mdsvex config, or article loading logic in this SvelteKit blog."
---

## Article Content Rules
- Article markdown lives in `src/content/articles/*.md`.
- Frontmatter fields expected: `title`, `date`, `description`.
- Keep frontmatter values valid and consistent with existing article style.

## Article Runtime Rules
- Discovery uses `import.meta.glob()` from article content paths.
- Avoid introducing hard-coded article registries.
- Preserve date-descending ordering for article list pages.
- Keep slug-based loading behavior in `src/routes/articles/[slug]/+page.server.ts` stable.

## mdsvex Integration
- `.md` files are compiled and rendered as Svelte components.
- Keep article layout integration with `src/routes/articles/_article.svelte` intact.
- If changing `svelte.config.js`, preserve mdsvex `.md` extension and layout mapping behavior.
