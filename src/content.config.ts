import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: image().optional(),
  }),
});

const masters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/masters' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    category: z.enum([
      'Старі майстри',
      'Друге покоління',
      'Третє покоління',
      'Сучасні майстри',
      'Мистецтвознавці',
    ]),
    photo: image().optional(),
    born: z.string().optional(),
    died: z.string().optional(),
    gallery: z.array(image()).optional(),
  }),
});

export const collections = { blog, masters };
