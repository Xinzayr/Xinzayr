// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://xinzayr.github.io',
	integrations: [
		mdx(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
		react()
	],
});
