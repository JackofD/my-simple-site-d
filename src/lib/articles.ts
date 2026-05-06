export interface Article {
	slug: string;
	title: string;
	date: string;
	description: string;
}

interface ArticleModule {
	metadata: Omit<Article, 'slug'>;
	default: unknown;
}

const modules = import.meta.glob<ArticleModule>('../content/articles/*.md', {
	eager: true
});

export function getAllArticles(): Article[] {
	return Object.entries(modules)
		.map(([path, module]) => {
			const slug = path.split('/').pop()?.replace('.md', '');
			if (!module?.metadata || !slug) return null;
			return { slug, ...module.metadata } satisfies Article;
		})
		.filter((article): article is Article => article !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestArticles(limit = 3): Article[] {
	return getAllArticles().slice(0, limit);
}
