import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const previewsMap: Record<string, any> = {};

  for (const post of posts) {
    const rawId = post.id;
    const cleanSlug = rawId.replace(/\.(md|mdx)$/, '');

    const postData = {
      id: cleanSlug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      heroImage: post.data.heroImage?.src || null,
      tags: post.data.tags || [],
      category: post.data.category || 'General',
      author: post.data.author || 'Xinzaýr',
      readingTime: post.data.readingTime || '3 min lectura',
    };

    previewsMap[rawId] = postData;
    previewsMap[cleanSlug] = postData;
  }

  return new Response(JSON.stringify(previewsMap), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
