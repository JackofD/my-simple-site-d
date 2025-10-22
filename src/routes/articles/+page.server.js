/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    const modules = import.meta.glob('../../content/articles/*.md', { eager: true });

    // Map the modules to article data
    const articles = Object.entries(modules)
      .map(([path, mod]) => {
        /** @type {any} */
        const module = mod;
        const slug = path.split('/').pop()?.replace('.md', '');

        if (!module?.metadata) {
          console.error('No metadata found for', path);
          return null;
        }

        return {
          slug,
          ...module.metadata
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      articles,
      debug: {
        pattern: '../../content/articles/*.md',
        filesFound: Object.keys(modules).length,
        paths: Object.keys(modules)
      }
    };
  } catch (error) {
    console.error('Error loading articles:', error);
    return {
      articles: [],
      debug: {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }
    };
  }
}