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
      'Перше покоління',
      'Друге покоління',
      'Третє покоління',
      'Четверте покоління',
      'Пяте покоління',
      'Самоучки',
      'Дослідники петриківського розпису',
    ]),
    photo: image().optional(),
    born: z.string().optional(),
    died: z.string().optional(),
    period: z.string().optional(),
    center: z.string().optional(),
    teachers: z.array(z.string()).optional(),
    influenced: z.array(z.string()).optional(),
    technique: z.array(z.string()).optional(),
    school: z.array(z.string()).optional(),
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

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string().optional(),
    year: z.string().optional(),
    publisher: z.string().optional(),
    language: z.union([z.string(), z.array(z.string())]).optional(),
    category: z.enum([
      'Альбоми',
      'Альбоми про майстрів',
      'Мистецтвознавчі дослідження',
      'Оздоблені розписом',
      'Наукові статті',
      'Інше',
    ]),
    cover: image().optional(),
    masters: z.array(z.string()).optional(),
    externalUrl: z.string().optional(),
    pdfUrl: z.string().optional(),
  }),
});

const centers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/centers' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    category: z.enum([
      'Школи',
      'Музеї',
      'Приватні колекції',
      'Організації та установи',
    ]),
    location: z.string().optional(),
    founded: z.string().optional(),
    photo: image().optional(),
    masters: z.array(z.string()).optional(),
    website: z.string().optional(),
    address: z.string().optional(),
  }),
});

const materials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/materials' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum([
    'Галереї',
    'Лонгріди',
    'Майстер-класи',
    'Відео',
  ]),
    cover: image().optional(),
    videoUrl: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    masters: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { blog, masters, books, centers, materials };