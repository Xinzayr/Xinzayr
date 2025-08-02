/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
			backdropBlur: {
				xs: '2px',
			},
			colors: {
				'glass': 'rgba(255, 255, 255, 0.1)',
				'glass-border': 'rgba(255, 255, 255, 0.2)',
				'glass-hover': 'rgba(255, 255, 255, 0.15)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glow: {
					'from': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' },
					'to': { boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
