import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	
	// Filtrar borradores y archivos plantilla (empezando con _)
	const validPosts = posts
		.filter((post) => !post.data.draft && !post.id.startsWith('_'))
		.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: `<language>es-ES</language>`,
		items: validPosts.map((post) => {
			const cleanSlug = post.id.replace(/\.(md|mdx)$/, '');
			return {
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: `/blog/${cleanSlug}/`,
				categories: post.data.tags || [post.data.category || 'General'],
				author: post.data.author || 'Xinzayr',
			};
		}),
	});
}
