<script>
    import { page } from '$app/stores';
    
    // The slug will be available as $page.params.slug
    // We'll use this to load the corresponding markdown file
</script>

<article class="article-container">
    <!-- Content will be rendered here -->
    <div class="article-content">
        <!-- Markdown content will be rendered here -->
    </div>
</article>

<style>
    .article-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .article-content {
        line-height: 1.6;
    }
</style>