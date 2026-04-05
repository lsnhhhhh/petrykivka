// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'uk',
		locales: ['uk', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});