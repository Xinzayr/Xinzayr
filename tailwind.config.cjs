/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
				'sans': ['Space Grotesk', 'Poppins', 'Inter', 'system-ui', 'Segoe UI Emoji', 'Noto Color Emoji', 'sans-serif'],
				'serif': ['Playfair Display', 'Georgia', 'serif'],
				'display': ['Playfair Display', 'serif'],
				'body': ['Poppins', 'Inter', 'sans-serif'],
				'emoji': ['Segoe UI Emoji', 'Noto Color Emoji', 'Twemoji Mozilla', 'Apple Color Emoji', 'Segoe UI Symbol', 'sans-serif'],
			},
			backdropBlur: {
				xs: '2px',
			},
			colors: {
				// Paleta ópalo negro y perla
				'opal': {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#020617',
				},
				'pearl': {
					50: '#fdfdf9',
					100: '#fffef7',
					200: '#fefce8',
					300: '#fef3c7',
					400: '#fde68a',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
					950: '#451a03',
				},
				'black-pure': '#000000',
				'black-opal': '#0f0f23',
				'black-deep': '#0a0a0a',
				'gold': {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
				// Colores pastel
				'pastel': {
					pink: '#fce7f3',
					purple: '#f3e8ff',
					blue: '#dbeafe',
					green: '#d1fae5',
					yellow: '#fef3c7',
					orange: '#fed7aa',
				},
				// Colores neón
				'neon': {
					pink: '#ff006e',
					purple: '#8338ec',
					blue: '#3a86ff',
					green: '#06ffa5',
					yellow: '#ffbe0b',
					orange: '#fb5607',
				},
				'glass': 'rgba(255, 255, 255, 0.1)',
				'glass-border': 'rgba(255, 255, 255, 0.2)',
				'glass-hover': 'rgba(255, 255, 255, 0.15)',
				'acrylic': 'rgba(255, 255, 255, 0.05)',
				'acrylic-border': 'rgba(255, 255, 255, 0.1)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'pulse-slow': 'pulse 3s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s ease-in-out infinite',
				'gradient': 'gradient 15s ease infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glow: {
					'from': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' },
					'to': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				gradient: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
			},
			backgroundImage: {
				'gradient-opal': 'linear-gradient(135deg, #000000 0%, #0f0f23 25%, #1a1a2e 50%, #16213e 75%, #0f3460 100%)',
				'gradient-pearl': 'linear-gradient(135deg, rgba(240, 240, 240, 0.08) 0%, rgba(230, 230, 230, 0.12) 25%, rgba(220, 220, 220, 0.06) 50%, rgba(200, 200, 200, 0.1) 100%)',
				'gradient-gold': 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 193, 7, 0.08) 25%, rgba(255, 235, 59, 0.06) 50%, rgba(255, 223, 0, 0.12) 100%)',
				'gradient-neon': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
				'gradient-pastel': 'linear-gradient(45deg, #fce7f3, #f3e8ff, #dbeafe)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
