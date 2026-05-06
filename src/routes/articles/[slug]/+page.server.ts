import type { PageServerLoad } from "./$types";

interface ArticleMetadata {
  title: string;
  date: string;
  description: string;
}

interface ArticleModule {
  metadata: ArticleMetadata;
  default: any;
}

interface ArticleData {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface ErrorResponse {
  message: string;
  stack?: string;
}

export const load = (async ({ params }) => {
  try {
    // Import all markdown files
    const modules = import.meta.glob<ArticleModule>(
      "../../../content/articles/*.md",
      { eager: true }
    );

    // Find the module matching our slug
    const matchingPath = Object.keys(modules).find((path) =>
      path.includes(`${params.slug}.md`)
    );

    if (!matchingPath) {
      throw new Error(`Article "${params.slug}" not found`);
    }

    const module = modules[matchingPath];

    if (!module?.metadata) {
      throw new Error(`No metadata found for article "${params.slug}"`);
    }

    const article: ArticleData = {
      slug: params.slug,
      title: module.metadata.title,
      date: module.metadata.date,
      description: module.metadata.description,
    };

    return { article };
  } catch (error) {
    console.error("Error loading article:", error);
    // Return error details instead of throwing
    const errorResponse: ErrorResponse = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };

    return {
      article: null as ArticleData | null,
      error: errorResponse,
    };
  }
}) satisfies PageServerLoad;
