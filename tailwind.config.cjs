/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");

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
				'serif': ['Playfair Display', 'Georgia', 'serif'],
				'display': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				'emoji': ['Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', 'sans-serif'],
			},
			backdropBlur: {
				xs: '4px',
				apple: '20px',
			},
			colors: {
				'black-pure': '#000000',
				'apple-dark': '#000000',
				'apple-surface': '#121214',
				'apple-card': 'rgba(28, 28, 30, 0.75)',
				'apple-border': 'rgba(255, 255, 255, 0.08)',
				'apple-border-hover': 'rgba(255, 255, 255, 0.2)',
				// Tonos pasteles y grises elegantes estilo Apple
				'pastel': {
					blue: '#8ab4f8',
					purple: '#b39ddb',
					mint: '#a8d5ba',
					rose: '#f48fb1',
					amber: '#ffb74d',
					gray: '#9aa0a6',
				},
				'cyber': {
					purple: '#b39ddb',
					blue: '#8ab4f8',
					cyan: '#a8d5ba',
					pink: '#f48fb1',
					green: '#a8d5ba',
				},
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow-cyber': 'glow-cyber 3s ease-in-out infinite alternate',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' },
				},
				'glow-cyber': {
					'0%': { boxShadow: '0 0 15px rgba(138, 180, 248, 0.08), inset 0 0 10px rgba(138, 180, 248, 0.02)' },
					'100%': { boxShadow: '0 0 25px rgba(179, 157, 219, 0.15), inset 0 0 15px rgba(179, 157, 219, 0.04)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			backgroundImage: {
				'gradient-cyber': 'linear-gradient(135deg, #8ab4f8, #b39ddb, #a8d5ba)',
				'gradient-cyber-subtle': 'linear-gradient(135deg, rgba(138, 180, 248, 0.06), rgba(179, 157, 219, 0.06))',
				'gradient-dark': 'radial-gradient(circle at top, #161619 0%, #000000 100%)',
				'apple-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		heroui()
	],
}
