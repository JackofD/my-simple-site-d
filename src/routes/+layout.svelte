<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap"
	/>
</svelte:head>

<div class="page">
	<header class="site-header">
		<div class="site-header__inner">
			<a class="brand" href="/" aria-label="Home">
				<span class="brand__mark" aria-hidden="true">✦</span>
			</a>
			<nav class="primary-nav" aria-label="Primary">
				<a href="/">Home</a>
				<a href="/articles">Articles</a>
			</nav>
		</div>
	</header>

	<main class="site-main">
		<slot />
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: rgba(251, 243, 226, 0.85);
		backdrop-filter: saturate(140%) blur(8px);
		-webkit-backdrop-filter: saturate(140%) blur(8px);
		border-bottom: var(--border-width) solid var(--color-border-soft);
	}

	.site-header__inner {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 var(--space-xl);
		height: var(--header-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-family: var(--font-heading);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.brand:hover {
		color: var(--color-accent-hover);
	}

	.brand__mark {
		font-size: 1.1em;
		line-height: 1;
	}

	.primary-nav {
		display: flex;
		align-items: center;
		gap: var(--space-xl);
	}

	.primary-nav a {
		color: var(--color-text);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		padding: var(--space-2xs) 0;
		border-bottom: var(--border-width-thick) solid transparent;
		transition: color 0.15s ease, border-color 0.15s ease;
	}

	.primary-nav a:hover {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
	}

	.site-main {
		flex: 1;
		width: 100%;
		max-width: var(--container-max);
		margin: 0 auto;
		padding: var(--space-3xl) var(--space-xl);
	}

	@media (max-width: 600px) {
		.site-header__inner {
			padding: 0 var(--space-md);
		}

		.primary-nav {
			gap: var(--space-md);
		}

		.site-main {
			padding: var(--space-2xl) var(--space-md);
		}
	}
</style>
