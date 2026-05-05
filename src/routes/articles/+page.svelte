<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section class="articles">
	<header class="articles__header">
		<h1>Articles</h1>
	</header>

	<div class="articles-container">
		{#if !data.articles || !Array.isArray(data.articles)}
			<div class="error">
				<h2>Sorry, we couldn't load the articles.</h2>
				<p>Please try again later. If the problem persists, contact the site administrator.</p>
			</div>
		{:else if data.articles.length}
			<div class="articles-list">
				{#each data.articles as article}
					<article class="article-preview">
						<h2>
							<a href="/articles/{article.slug}">{article.title}</a>
						</h2>
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
				{/each}
			</div>
		{:else}
			<p class="empty">No articles found.</p>
		{/if}
	</div>
</section>

<style>
	.articles {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	.articles__header {
		text-align: center;
		margin-bottom: var(--space-2xl);
	}

	.articles__header h1 {
		font-size: var(--font-size-3xl);
	}

	.articles-container {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	.articles-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: var(--space-lg);
	}

	.article-preview {
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		box-shadow: var(--shadow-sm);
		transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.article-preview:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--color-accent-soft);
	}

	.article-preview h2 {
		font-size: var(--font-size-xl);
		margin: 0;
		line-height: var(--line-height-snug);
	}

	.article-preview h2 a {
		color: var(--color-text);
		text-decoration: none;
	}

	.article-preview h2 a:hover {
		color: var(--color-accent);
	}

	.article-preview time {
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

	.empty {
		text-align: center;
		color: var(--color-text-muted);
		padding: var(--space-2xl) 0;
	}

	.error {
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		border-left: var(--border-width-thick) solid var(--color-accent-strong);
		padding: var(--space-lg);
		border-radius: var(--radius-md);
	}

	.error h2 {
		font-size: var(--font-size-lg);
		margin-bottom: var(--space-xs);
	}

	@media (max-width: 600px) {
		.articles-list {
			grid-template-columns: 1fr;
		}
	}
</style>
