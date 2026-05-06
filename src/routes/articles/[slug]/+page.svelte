<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	interface ArticleData {
		slug: string;
		title: string;
		date: string;
		description: string;
	}

	interface ErrorResponse {
		message: string;
		stack?: string;
	}

	interface PageDataType {
		article: ArticleData | null;
		error?: ErrorResponse;
	}

	export let data: PageDataType;

	interface MDSveXModule {
		default: typeof SvelteComponent;
		metadata: {
			title: string;
			date: string;
			description: string;
		};
	}

	const Content: Writable<typeof SvelteComponent | null> = writable(null);

	onMount(async () => {
		const article = data.article;
		if (!article) return;

		try {
			const modules = import.meta.glob<MDSveXModule>('../../../content/articles/*.md');
			const matchPath = Object.keys(modules).find((path) =>
				path.includes(`${article.slug}.md`)
			);
			if (matchPath) {
				const mod = await modules[matchPath]();
				if (mod?.default && typeof mod.default === 'function') {
					Content.set(mod.default);
				} else {
					Content.set(null);
				}
			}
		} catch (error) {
			console.error('Error loading article content:', error);
			Content.set(null);
		}
	});
</script>

<div class="container">
	{#if data.error}
		<div class="error">
			<h1>Error Loading Article</h1>
			<p>{data.error.message}</p>
			{#if data.error.stack}
				<details>
					<summary>Technical Details</summary>
					<pre>{data.error.stack}</pre>
				</details>
			{/if}
			<p>
				<a href="/articles">← Back to Articles</a>
			</p>
		</div>
	{:else if data.article}
		<article class="article-container">
			<header>
				<h1>{data.article.title}</h1>
				{#if data.article.date}
					<time datetime={data.article.date}>
						{new Date(data.article.date).toLocaleDateString()}
					</time>
				{/if}
				{#if data.article.description}
					<p class="description">{data.article.description}</p>
				{/if}
			</header>
			{#if typeof $Content === 'function'}
				<div class="article-content">
					<svelte:component this={$Content} />
				</div>
			{:else if $Content === null}
				<p>Sorry, there was a problem rendering this article.</p>
			{:else}
				<p>Loading content...</p>
			{/if}
		</article>
	{:else}
		<p>Article not found. <a href="/articles">← Back to Articles</a></p>
	{/if}
</div>

<style>
	.container {
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.article-container {
		margin-bottom: var(--space-2xl);
	}

	header {
		margin-bottom: var(--space-2xl);
		padding-bottom: var(--space-xl);
		border-bottom: var(--border-width) solid var(--color-border-soft);
	}

	h1 {
		margin: 0 0 var(--space-md) 0;
		font-size: var(--font-size-3xl);
		letter-spacing: -0.02em;
	}

	time {
		display: inline-block;
		color: var(--color-text-subtle);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin-bottom: var(--space-md);
	}

	.description {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-snug);
		margin: var(--space-md) 0 0 0;
		font-style: italic;
	}

	.error {
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		border-left: var(--border-width-thick) solid var(--color-accent-strong);
		padding: var(--space-xl);
		border-radius: var(--radius-md);
	}

	.error h1 {
		color: var(--color-accent-strong);
		font-size: var(--font-size-xl);
		margin-bottom: var(--space-sm);
	}

	pre {
		background: var(--color-surface-soft);
		border: var(--border-width) solid var(--color-border-soft);
		padding: var(--space-md);
		border-radius: var(--radius-sm);
		overflow-x: auto;
		font-size: var(--font-size-sm);
	}

	a {
		color: var(--color-accent);
	}

	a:hover {
		color: var(--color-accent-hover);
	}

	@media (max-width: 600px) {
		h1 {
			font-size: var(--font-size-2xl);
		}
	}
</style>
