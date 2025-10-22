<script>
    /** @type {import('./$types').PageData} */
    export let data;

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // Store for the loaded markdown component
    const Content = writable(null);

    onMount(async () => {
        if (data.article?.slug) {
            // Use import.meta.glob to find the correct markdown file
            const modules = import.meta.glob('../../../content/articles/*.md');
            const matchPath = Object.keys(modules).find(path =>
                path.includes(`${data.article.slug}.md`)
            );
            if (matchPath) {
                const mod = await modules[matchPath]();
                Content.set(mod && mod.default ? mod.default : null);
            }
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
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .article-container {
        margin-bottom: 2rem;
    }

    header {
        margin-bottom: 2rem;
    }

    h1 {
        margin: 0 0 0.5rem 0;
    }

    time {
        display: block;
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .description {
        font-size: 1.1rem;
        color: #444;
        line-height: 1.4;
        margin: 1rem 0;
    }

    .error {
        background: #fff0f0;
        padding: 1.5rem;
        border-radius: 4px;
        margin: 1rem 0;
    }

    .error h1 {
        color: #c00;
        font-size: 1.5rem;
    }

    pre {
        background: #fff;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 0.9rem;
    }

    a {
        color: #0066cc;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>