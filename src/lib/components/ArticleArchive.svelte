<script lang="ts">
	import type { Article } from '$lib/articles';
	import ArticleCard from './ArticleCard.svelte';

	export let articles: Article[];
	export let title: string = 'From the Archive';
</script>

<section class="archive">
	<header class="archive__header">
		<h2 class="archive__title">{title}</h2>
	</header>

	{#if articles.length}
		<div class="archive__grid">
			{#each articles as article (article.slug)}
				<ArticleCard {article} />
			{/each}
		</div>
	{:else}
		<p class="archive__empty">No articles to show.</p>
	{/if}
</section>

<style>
	.archive {
		background: rgba(255, 253, 247, 0.55);
		backdrop-filter: saturate(140%) blur(14px);
		-webkit-backdrop-filter: saturate(140%) blur(14px);
		border: var(--border-width) solid var(--color-border-soft);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-md);
		padding: var(--space-2xl);
		margin: var(--space-2xl) 0;
	}

	.archive__header {
		text-align: center;
		margin-bottom: var(--space-2xl);
	}

	.archive__title {
		font-size: var(--font-size-2xl);
		letter-spacing: -0.015em;
		font-style: italic;
		color: var(--color-accent);
	}

	.archive__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: var(--space-lg);
	}

	.archive__empty {
		text-align: center;
		color: var(--color-text-muted);
		padding: var(--space-xl) 0;
	}

	@media (max-width: 900px) {
		.archive {
			padding: var(--space-xl);
		}

		.archive__header {
			margin-bottom: var(--space-xl);
		}
	}

	@media (max-width: 600px) {
		.archive {
			padding: var(--space-lg);
			border-radius: var(--radius-lg);
			margin: var(--space-xl) 0;
		}

		.archive__title {
			font-size: var(--font-size-xl);
		}

		.archive__grid {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}
	}
</style>
