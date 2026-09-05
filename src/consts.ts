// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Xinzayr - Desarrollador Junior';
export const SITE_DESCRIPTION = '¡Bienvenido a mi portafolio! Soy un desarrollador junior aprendiendo React, Node.js y otros lenguajes.';

// URLs y recursos externos
export const EXTERNAL_RESOURCES = {
	GITHUB_MEDIA_BASE: 'https://raw.githubusercontent.com/xinzayr/xinzayr/main',
	GRAVATAR_BASE: 'https://gravatar.com',
	GITHUB_API: 'https://api.github.com',
	GITHUB_USERNAME: import.meta.env?.GITHUB_USERNAME || process.env.GITHUB_USERNAME || 'xinzayr',
	GITHUB_PROFILE: 'https://github.com/xinzayr',
	DISCORD_USER_ID: import.meta.env?.DISCORD_USER_ID || process.env.DISCORD_USER_ID || '',
	SPOTIFY_CLIENT_ID: import.meta.env?.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID || '',
	GITHUB_TOKEN: import.meta.env?.GITHUB_TOKEN || process.env.GITHUB_TOKEN || '',

	// Redes sociales
	TWITTER: 'https://x.com/xinzayr',
	X_TWITTER: 'https://x.com/xinzayr',
	LINKEDIN: 'https://linkedin.com/in/johnny-bryan-alvarez-veliz-565544282',
	DISCORD_INVITE: 'https://discord.gg/xinzayr',
	INSTAGRAM: 'https://instagram.com/xinzayr',

	// Opciones de apoyo y donaciones
	PAYPAL: 'https://paypal.me/xinzayr',
	KOFI: 'https://ko-fi.com/xinzayr',
	PATREON: 'https://patreon.com/xinzayr',
	BUYMEACOFFEE: 'https://buymeacoffee.com/xinzayr',
	GITHUB_SPONSORS: 'https://github.com/sponsors/xinzayr'
};

// Información personal
export const PERSONAL_INFO = {
	name: 'Xinzayr',
	username: import.meta.env?.GITHUB_USERNAME || process.env.GITHUB_USERNAME || 'xinzayr',
	email: 'contact@xinzayr.xyz',
	gravatar: 'xinzayr',
	location: 'Ecuador',
	timezone: 'America/Guayaquil',
	bio: 'Desarrollador Junior aprendiendo de todo y todos.',
	github: 'https://github.com/xinzayr',
	linkedin: 'https://linkedin.com/in/johnny-bryan-alvarez-veliz-565544282',
	twitter: 'https://x.com/xinzayr',
	x: 'https://x.com/xinzayr',
	discord: 'https://discord.gg/xinzayr',
	instagram: 'https://instagram.com/xinzayr'
};

// Configuración de APIs
export const API_CONFIG = {
	github: {
		baseUrl: 'https://api.github.com',
		username: import.meta.env?.GITHUB_USERNAME || process.env.GITHUB_USERNAME || 'xinzayr',
		token: import.meta.env?.GITHUB_TOKEN || process.env.GITHUB_TOKEN
	},
	discord: {
		userId: import.meta.env?.DISCORD_USER_ID || process.env.DISCORD_USER_ID
	},
	spotify: {
		clientId: import.meta.env?.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID
	},
	blogger: {
		blogUrl: 'https://blog.xinzayr.xyz',
		apiKey: import.meta.env?.BLOGGER_API_KEY || process.env.BLOGGER_API_KEY || '',
		blogId: import.meta.env?.BLOGGER_BLOG_ID || process.env.BLOGGER_BLOG_ID || '',
		feedUrl: 'https://blog.xinzayr.xyz/feeds/posts/default?alt=json',
		feedRssUrl: 'https://blog.xinzayr.xyz/feeds/posts/default'
	}
};
