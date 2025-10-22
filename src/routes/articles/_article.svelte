<script>
    // This layout will be used for all markdown articles
    import { page } from '$app/stores';
</script>

<article class="article-container">
    <header class="article-header">
        <h1>{$$props.title}</h1>
        <time datetime={$$props.date}>{new Date($$props.date).toLocaleDateString()}</time>
    </header>

    <div class="article-content">
        <slot />
    </div>
</article>

<style>
    .article-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .article-header {
        margin-bottom: 2rem;
    }

    .article-header h1 {
        margin-bottom: 0.5rem;
    }

    .article-header time {
        color: #666;
    }

    .article-content {
        line-height: 1.6;
    }

    .article-content :global(h2) {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .article-content :global(p) {
        margin-bottom: 1rem;
    }
</style>