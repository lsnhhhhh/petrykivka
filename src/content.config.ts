import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';

const localeSchema = z.enum(['uk', 'en']).default('uk');

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: image().optional(),
    locale: localeSchema,
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
    links: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),
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
    locale: localeSchema,
    homepageFeatured: z.boolean().optional(),
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
    locale: localeSchema,
    featured: z.boolean().optional(),
    featuredOrder: z.number().optional(),
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
     'Schools',
     'Museums',
     'Private Collections',
     'Organizations & Institutions',
    ]),
    location: z.string().optional(),
    founded: z.string().optional(),
    closed: z.string().optional(),
    photo: image().optional(),
    masters: z.array(z.string()).optional(),
    website: z.string().optional(),
    address: z.string().optional(),
    galleryGroups: z.array(z.object({
      title: z.string(),
      items: z.array(z.object({
        image: image(),
        caption: z.string().optional(),
      })),
    })).optional(),
    locale: localeSchema,
  }),
});

const materials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/materials' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum([
      'Галереї',
      'Статті',
      'Майстер-класи',
      'Відео',
    ]),
    cover: image().optional(),
    videoUrl: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    author: z.string().optional(),
    source: z.string().optional(),
    sourceUrl: z.string().optional(),
    masters: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    lessons: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      videoUrl: z.string(),
    })).optional(),
    sources: z.array(z.object({
      id: z.string(),
      title: z.string(),
    })).optional(),
    images: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).optional(),
    locale: localeSchema,
    homepageFeatured: z.boolean().optional(),
  }),
});

const artworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artworks' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    master: z.string(),
    year: z.string().optional(),
    decade: z.string().optional(),
    subject: z.array(z.string()).optional(),
    medium: z.string().optional(),
    dimensions: z.string().optional(),
    location: z.string().optional(),
    elements: z.array(z.string()).optional(),
    image: image(),
    description: z.string().optional(),
    locale: localeSchema,
    dateAdded: z.string().optional(),
    featured: z.boolean().optional(),
    featuredOrder: z.number().optional(),
    featuredCaption: z.object({
      uk: z.string(),
      en: z.string(),
    }).optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.string(),
    type: z.enum(['exhibition', 'article', 'event', 'workshop', 'video', 'media']),
    title: z.string(),
    source: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    image: z.string().optional(),
    locale: z.enum(['uk', 'en']),
  }),
});


const XLSX_URL = new URL('./data/masters-registry.xlsx', import.meta.url);
 
const _list = (v?: string) => (v ?? '').split(';').map((s) => s.trim()).filter(Boolean);
const _bool = (v?: string) => ['true', '1', 'так', 'yes', 'x'].includes((v ?? '').trim().toLowerCase());
const _num = (v?: string) => { const m = String(v ?? '').match(/\d{4}/); return m ? parseInt(m[0], 10) : undefined; };
const _str = (v?: string) => { const t = (v ?? '').trim(); return t === '' ? undefined : t; };
 
function _transform(row: Record<string, string>) {
  return {
    name: row.name?.trim() ?? '',
    gender: _str(row.gender),
    generation: _str(row.generation) ?? 'unknown',
    born: _str(row.born),
    died: _str(row.died),
    solo: _bool(row.solo),
    village: _str(row.village),
    region: _str(row.region),
    country: _str(row.country) ?? 'Україна',
    currentPlace: _str(row.current_place),
    base: _str(row.base) ?? 'petrykivka',
    center: _list(row.center),
    nsum: _bool(row.nsum),
    nsumSince: _str(row.nsum_since),
    honoredArtist: _bool(row.honored_artist),
    teachers: _list(row.teachers),
    students: _list(row.students),
    school: _str(row.school),
    activeFrom: _num(row.active_from),
    activeTo: _num(row.active_to),
    occupation: _list(row.occupation),
    style: _list(row.style),
    exhibitions: _list(row.exhibitions),
    awards: _list(row.awards),
    collections: _list(row.collections),
    books: _list(row.books),
    articles: _list(row.articles),
    family: _list(row.family),
    links: _list(row.links),
    website: _str(row.website),
    photo: _str(row.photo),
    signature: _str(row.signature),
    updated: _str(row.updated),
    notes: _str(row.notes),
  };
}
 
// 3) Колекція:
const registry = defineCollection({
  loader: {
    name: 'masters-registry',
    load: async ({ store, parseData, generateDigest }) => {
      const buf = readFileSync(fileURLToPath(XLSX_URL));
      const wb = XLSX.read(buf, { type: 'buffer' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '', raw: false });
      store.clear();
      const seen = new Set<string>();
      for (const row of rows) {
        const id = String(row.id ?? '').trim();
        if (!id) continue;
        if (seen.has(id)) { console.warn(`[registry] duplicate id "${id}" — пропускаю`); continue; }
        seen.add(id);
        const parsed = await parseData({ id, data: _transform(row) });
        store.set({ id, data: parsed, digest: generateDigest(parsed) });
      }
      console.log(`[registry] завантажено майстрів: ${seen.size}`);
    },
  },
  // Поля "м'які" (string), щоб одруківка в одному з сотень рядків НЕ ламала білд.
  schema: z.object({
    name: z.string(),
    gender: z.string().optional(),
    generation: z.string().default('unknown'),
    born: z.string().optional(),
    died: z.string().optional(),
    solo: z.boolean().default(false),
    village: z.string().optional(),
    region: z.string().optional(),
    country: z.string().default('Україна'),
    currentPlace: z.string().optional(),
    base: z.string().default('petrykivka'),
    center: z.array(z.string()).default([]),
    nsum: z.boolean().default(false),
    nsumSince: z.string().optional(),
    honoredArtist: z.boolean().default(false),
    teachers: z.array(z.string()).default([]),
    students: z.array(z.string()).default([]),
    school: z.string().optional(),
    activeFrom: z.number().optional(),
    activeTo: z.number().optional(),
    occupation: z.array(z.string()).default([]),
    style: z.array(z.string()).default([]),
    exhibitions: z.array(z.string()).default([]),
    awards: z.array(z.string()).default([]),
    collections: z.array(z.string()).default([]),
    books: z.array(z.string()).default([]),
    articles: z.array(z.string()).default([]),
    family: z.array(z.string()).default([]),
    links: z.array(z.string()).default([]),
    website: z.string().optional(),
    photo: z.string().optional(),
    signature: z.string().optional(),
    updated: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const collections = { blog, masters, books, centers, materials, artworks, news, registry };