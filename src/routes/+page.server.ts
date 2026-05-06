import type { PageServerLoad } from './$types';
import { getLatestArticles, type Article } from '$lib/articles';

export const load = (async () => {
	try {
		return { articles: getLatestArticles(3) };
	} catch {
		return { articles: [] as Article[] };
	}
}) satisfies PageServerLoad;
