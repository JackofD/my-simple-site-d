import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			layout: {
				articles: process.cwd() + '/src/routes/articles/_article.svelte'
			}
		})
	]
};

export default config;
