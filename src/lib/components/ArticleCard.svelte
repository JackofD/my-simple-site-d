<script lang="ts">
	import type { Article } from '$lib/articles';
	export let article: Article;
</script>

<article class="article-card">
	<h3>
		<a href="/articles/{article.slug}">{article.title}</a>
	</h3>
	{#if article.date}
		<time datetime={article.date}>
			{new Date(article.date).toLocaleDateString()}
		</time>
	{/if}
	{#if article.description}
		<p class="description">{article.description}</p>
	{/if}
	<a class="read-more" href="/articles/{article.slug}">Read more →</a>
</article>

<style>
	.article-card {
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		box-shadow: var(--shadow-sm);
		transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		height: 100%;
	}

	.article-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--color-accent-soft);
	}

	h3 {
		font-size: var(--font-size-xl);
		margin: 0;
		line-height: var(--line-height-snug);
	}

	h3 a {
		color: var(--color-text);
		text-decoration: none;
	}

	h3 a:hover {
		color: var(--color-accent);
	}

	time {
		display: inline-block;
		color: var(--color-text-subtle);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.description {
		color: var(--color-text-muted);
		line-height: var(--line-height-normal);
		margin: 0;
	}

	.read-more {
		margin-top: auto;
		padding-top: var(--space-sm);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-accent);
		letter-spacing: 0.02em;
	}

	.read-more:hover {
		color: var(--color-accent-hover);
	}
</style>
