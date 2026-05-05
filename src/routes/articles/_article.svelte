<script lang="ts">
	export const title: string = '';
	export const date: string = '';
</script>

<article class="article-container">
	<div class="article-content">
		<slot />
	</div>
</article>

<style>
	.article-container {
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.article-content {
		font-size: var(--font-size-md);
		line-height: var(--line-height-relaxed);
		color: var(--color-text);
	}

	.article-content :global(h1) {
		font-size: var(--font-size-3xl);
		margin: var(--space-2xl) 0 var(--space-md);
		letter-spacing: -0.02em;
	}

	.article-content :global(h1:first-child) {
		margin-top: 0;
	}

	.article-content :global(h2) {
		font-size: var(--font-size-2xl);
		margin: var(--space-2xl) 0 var(--space-md);
		letter-spacing: -0.015em;
	}

	.article-content :global(h3) {
		font-size: var(--font-size-xl);
		margin: var(--space-xl) 0 var(--space-sm);
	}

	.article-content :global(p) {
		margin: 0 0 var(--space-md);
	}

	.article-content :global(a) {
		color: var(--color-accent);
		border-bottom: var(--border-width) solid var(--color-accent-soft);
		transition: border-color 0.15s ease;
	}

	.article-content :global(a:hover) {
		border-bottom-color: var(--color-accent);
	}

	.article-content :global(ul),
	.article-content :global(ol) {
		margin: 0 0 var(--space-md);
		padding-left: var(--space-lg);
	}

	.article-content :global(li) {
		margin-bottom: var(--space-xs);
	}

	.article-content :global(blockquote) {
		margin: var(--space-lg) 0;
		padding: var(--space-md) var(--space-lg);
		border-left: var(--border-width-thick) solid var(--color-accent);
		background: var(--color-surface-soft);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		color: var(--color-text-muted);
		font-style: italic;
	}

	.article-content :global(code) {
		background: var(--color-surface-soft);
		border: var(--border-width) solid var(--color-border-soft);
		padding: 0.1em 0.4em;
		border-radius: var(--radius-sm);
		font-size: 0.9em;
		color: var(--color-accent-strong);
	}

	.article-content :global(pre) {
		background: var(--color-surface-soft);
		border: var(--border-width) solid var(--color-border-soft);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		overflow-x: auto;
		margin: var(--space-md) 0;
	}

	.article-content :global(pre code) {
		background: transparent;
		border: none;
		padding: 0;
		color: var(--color-text);
		font-size: var(--font-size-sm);
	}

	.article-content :global(hr) {
		border: none;
		border-top: var(--border-width) solid var(--color-border);
		margin: var(--space-2xl) 0;
	}

	.article-content :global(img) {
		max-width: 100%;
		border-radius: var(--radius-md);
		margin: var(--space-lg) 0;
	}
</style>
