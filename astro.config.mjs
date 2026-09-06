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
		sitemap({
			filter: (page) => !page.includes('/_plantilla') && !page.includes('/503') && !page.includes('/contact-success'),
			changefreq: 'weekly',
			priority: 0.8,
			lastmod: new Date(),
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		react()
	],
});
