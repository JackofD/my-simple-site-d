<script lang="ts">
	import type { PageData } from './$types';
	import ArticleArchive from '$lib/components/ArticleArchive.svelte';
	export let data: PageData;
</script>

<section class="hero">
	<h1 class="hero__title">
		Welcome to 
		<div>
			<span class="hero__title--accent">Ars</span>
			<span class="hero__title--accent font-normal"> X </span>
			<span class="hero__title--accent">Illus</span>
		</div>
	</h1>
	<p class="hero__lede">
		Welcome to my journey of Progress 
	</p>
	<p class="hero__lede extra">
		<span class="font-bold">Ars:</span> Art, skill, craft. The pursuit of mastery and creativity in all things. 
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
		display: inline-block;
		color: var(--color-accent);
		font-style: italic;
	}

	.hero__lede {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
	}
	.hero__lede.extra {
		color: var(--color-accent);
		font-size: smaller;
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
