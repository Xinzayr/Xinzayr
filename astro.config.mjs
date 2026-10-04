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
	// Cabeceras de seguridad para cumplimiento GDPR/ePrivacy y protección general
	headers: [
		{
			source: '/(.*)',
			headers: [
				{ key: 'X-Content-Type-Options', value: 'nosniff' },
				{ key: 'X-Frame-Options', value: 'DENY' },
				{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
				{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
				{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
				{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://api.lanyard.rest https://www.google-analytics.com https://region1.google-analytics.com https://*.clarity.ms; frame-src https://www.googletagmanager.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';" },
			],
		},
	],
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
