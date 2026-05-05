<script lang="ts">
	import type { PageData } from './$types';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
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
				{#each data.articles as article (article.slug)}
					<ArticleCard {article} />
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
