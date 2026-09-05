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
				'black-pure': '#000000',
				'black-opal': '#050508',
				'black-deep': '#0A0A0A',
				'cyber': {
					purple: '#9d4edd',
					blue: '#4361ee',
					cyan: '#4cc9f0',
					pink: '#f72585',
					green: '#10b981',
				},
				'glass-dark': 'rgba(10, 10, 15, 0.4)',
				'glass-border': 'rgba(255, 255, 255, 0.05)',
				'glass-hover': 'rgba(20, 20, 30, 0.5)',
				'glass-border-hover': 'rgba(255, 255, 255, 0.1)',
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
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow-cyber': {
					'0%': { boxShadow: '0 0 10px rgba(67, 97, 238, 0.1), inset 0 0 10px rgba(67, 97, 238, 0.05)' },
					'100%': { boxShadow: '0 0 30px rgba(157, 78, 221, 0.3), inset 0 0 20px rgba(157, 78, 221, 0.1)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			backgroundImage: {
				'gradient-cyber': 'linear-gradient(135deg, #4361ee, #9d4edd, #f72585)',
				'gradient-cyber-subtle': 'linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(157, 78, 221, 0.1))',
				'gradient-dark': 'radial-gradient(circle at top, #0A0A0F 0%, #000000 100%)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		heroui()
	],
}
