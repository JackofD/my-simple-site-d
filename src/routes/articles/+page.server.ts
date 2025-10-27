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

export const load = (async () => {
  try {
    const modules = import.meta.glob<ArticleModule>(
      "../../content/articles/*.md",
      { eager: true }
    );

    // Map the modules to article data
    const articles = Object.entries(modules)
      .map(([path, module]) => {
        const slug = path.split("/").pop()?.replace(".md", "");

        if (!module?.metadata || !slug) {
          return null;
        }

        return {
          slug,
          ...module.metadata,
        };
      })
      .filter(
        (article): article is ArticleMetadata & { slug: string } =>
          article !== null
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { articles };
  } catch (error) {
    return { articles: [] as Array<ArticleMetadata & { slug: string }> };
  }
}) satisfies PageServerLoad;
