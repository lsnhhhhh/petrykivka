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
    period: z.string().optional(),
    center: z.string().optional(),
    teachers: z.array(z.string()).optional(),
    influenced: z.array(z.string()).optional(),
    technique: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    gallery: z.array(z.object({
      image: image(),
      caption: z.string().optional(),
    })).optional(),
    galleryGroups: z.array(z.object({
      title: z.string(),
      items: z.array(z.object({
        image: image(),
        caption: z.string().optional(),
      })),
    })).optional(),
  }),
});

export const collections = { blog, masters };