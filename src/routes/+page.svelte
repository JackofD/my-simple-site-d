<script lang="ts">
	import type { PageData } from './$types';
	import ArticleArchive from '$lib/components/ArticleArchive.svelte';
	export let data: PageData;
</script>

<section class="hero">
	<h1 class="hero__title">
		Welcome to <span class="hero__title--accent">SvelteKit</span>
	</h1>
	<p class="hero__lede">
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
</section>

<ArticleArchive articles={data.articles} />

<style>
	.hero {
		max-width: var(--content-max);
		margin: 0 auto;
		padding: var(--space-3xl) 0;
		text-align: center;
	}

	.hero__title {
		font-size: var(--font-size-4xl);
		line-height: var(--line-height-tight);
		letter-spacing: -0.025em;
		margin-bottom: var(--space-lg);
	}

	.hero__title--accent {
		display: block;
		color: var(--color-accent);
		font-style: italic;
	}

	.hero__lede {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
	}

	.hero__lede a {
		font-weight: var(--font-weight-semibold);
		border-bottom: var(--border-width) solid var(--color-accent-soft);
	}

	.hero__lede a:hover {
		border-bottom-color: var(--color-accent);
	}

	@media (max-width: 600px) {
		.hero {
			padding: var(--space-xl) 0;
		}

		.hero__title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
