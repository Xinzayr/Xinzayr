// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { remarkWikilinks } from './src/plugins/remark-wikilinks.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://xinzayr.github.io',
	markdown: {
		remarkPlugins: [remarkWikilinks],
	},
	image: {
		domains: ['bp.blogspot.com', '1.bp.blogspot.com', '2.bp.blogspot.com', '3.bp.blogspot.com', '4.bp.blogspot.com'],
	},
	integrations: [
		mdx(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
		react()
	],
});
