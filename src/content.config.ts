import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
			category: z.string().optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			shortDescription: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			imageUrl: z.string().optional(), // Para imágenes externas desde GitHub
			tags: z.array(z.string()),
			stack: z.array(z.string()),
			category: z.string(),
			year: z.number(),
			repositoryUrl: z.string().optional(),
			demoUrl: z.string().optional(),
			featured: z.boolean().default(false),
		}),
});

const tools = defineCollection({
	loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			shortDescription: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()),
			category: z.string(),
			featured: z.boolean().default(false),
			slug: z.string(),
		}),
});

export const collections = { blog, projects, tools };
