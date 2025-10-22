/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  try {
    console.log('Loading article with slug:', params.slug);

    // Import all markdown files
    const modules = import.meta.glob('../../../content/articles/*.md', { eager: true });

    console.log('Available module paths:', Object.keys(modules));

    // Find the module matching our slug
    const matchingPath = Object.keys(modules).find(path =>
      path.includes(`${params.slug}.md`)
    );

    if (!matchingPath) {
      console.error('No matching article found for slug:', params.slug);
      throw new Error(`Article "${params.slug}" not found`);
    }

    console.log('Found matching path:', matchingPath);

    /** @type {any} */
    const module = modules[matchingPath];

    console.log('Module structure:', {
      hasMetadata: Boolean(module?.metadata),
      hasDefault: Boolean(module?.default),
      metadataKeys: module?.metadata ? Object.keys(module.metadata) : []
    });

    // Return minimal data first to check structure
    return {
      article: {
        slug: params.slug,
        title: module?.metadata?.title || 'Untitled',
        date: module?.metadata?.date,
        description: module?.metadata?.description,
        // Temporarily omit content to test metadata
        metadata: module?.metadata || {}
      }
    };
  } catch (error) {
    console.error('Error loading article:', error);
    // Return error details instead of throwing
    return {
      article: null,
      error: {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }
    };
  }
}