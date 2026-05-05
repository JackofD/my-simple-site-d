<script lang="ts">
    // This layout will be used for all markdown articles
    // Use exported props (Svelte 5 standard) instead of accessing $$props directly
    export let title: string;
    export let date: string;
</script>

<article class="article-container">
    <div class="article-content">
        <slot />
    </div>
</article>

<style>
    .article-container {
        max-width: 800px;
        margin: 0 auto;
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