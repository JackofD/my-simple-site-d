import type { PageServerLoad } from './$types';
import { getAllArticles, type Article } from '$lib/articles';

export const load = (async () => {
	try {
		return { articles: getAllArticles() };
	} catch {
		return { articles: [] as Article[] };
	}
}) satisfies PageServerLoad;
