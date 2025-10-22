/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  try {
    // Import all markdown files
    const modules = import.meta.glob('../../../content/articles/*.md', { eager: true });

    // Find the module matching our slug
    const matchingPath = Object.keys(modules).find(path =>
      path.includes(`${params.slug}.md`)
    );

    if (!matchingPath) {
      throw new Error(`Article "${params.slug}" not found`);
    }

    /** @type {any} */
    const module = modules[matchingPath];

    if (!module?.metadata) {
      throw new Error(`No metadata found for article "${params.slug}"`);
    }

    return {
      article: {
        slug: params.slug,
        title: module.metadata.title,
        date: module.metadata.date,
        description: module.metadata.description
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