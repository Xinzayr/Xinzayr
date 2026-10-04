/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
				'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			colors: {
				// Pastel accents as Tailwind colors for utility classes
				pastel: {
					blue: '#8ab4f8',
					purple: '#b39ddb',
					mint: '#a8d5ba',
					rose: '#f48fb1',
					amber: '#ffb74d',
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	]
}
