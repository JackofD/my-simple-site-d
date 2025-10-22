<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Articles</h1>

<div class="articles-container">
    {#if data?.debug?.error}
    <div class="error">
        <h2>Error loading articles:</h2>
        <pre>{data.debug.error}</pre>
        {#if data.debug.stack}
            <details>
                <summary>Stack trace</summary>
                <pre>{data.debug.stack}</pre>
            </details>
        {/if}
    </div>
{:else}
    {#if data.articles.length}
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
                </article>
            {/each}
        </div>
    {:else}
        <p>No articles found.</p>
    {/if}

    <details class="debug-details">
        <summary>Debug Information</summary>
        <div class="debug-info">
            <p>Pattern used: <code>{data.debug?.pattern || 'No pattern'}</code></p>
            <p>Files found: {data.debug?.filesFound || 0}</p>
            
            {#if data.debug?.paths?.length}
                <h3>Found paths:</h3>
                <ul>
                    {#each data.debug.paths as path}
                        <li><code>{path}</code></li>
                    {/each}
                </ul>
            {/if}
        </div>
    </details>
{/if}
</div>

<style>
    .articles-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }

    .article-preview {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }

    .article-preview:last-child {
        border-bottom: none;
    }

    .article-preview h2 {
        margin: 0;
    }

    .article-preview a {
        color: inherit;
        text-decoration: none;
    }

    .article-preview a:hover {
        text-decoration: underline;
    }

    .article-preview time {
        display: block;
        color: #666;
        margin: 0.5rem 0;
        font-size: 0.9rem;
    }

    .description {
        margin: 0.5rem 0 0;
        color: #444;
        line-height: 1.4;
    }

    .debug-details {
        margin-top: 3rem;
        border-top: 1px solid #eee;
        padding-top: 1rem;
    }

    .debug-info {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
        margin: 1rem 0;
        font-size: 0.9rem;
    }

    .error {
        background: #fff0f0;
        padding: 1rem;
        border-radius: 4px;
        margin: 1rem 0;
    }

    pre {
        white-space: pre-wrap;
        background: #fff;
        padding: 0.5rem;
        border-radius: 2px;
        font-size: 0.9rem;
    }
</style>