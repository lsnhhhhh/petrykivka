export type MaterialCategory = 'Майстер-класи' | 'Статті' | 'Галереї' | 'Відео';

export interface MaterialCategoryMeta {
  category: MaterialCategory;
  slug: string;
  icon: string;
  uk: string;
  en: string;
  descriptionUk: string;
  descriptionEn: string;
}

export const MATERIAL_CATEGORIES: MaterialCategoryMeta[] = [
  {
    category: 'Майстер-класи',
    slug: 'masterclasses',
    icon: '🎨',
    uk: 'Майстер-класи',
    en: 'Masterclasses',
    descriptionUk: 'Покрокові відеоуроки петриківського розпису',
    descriptionEn: 'Step-by-step Petrykivka painting video lessons',
  },
  {
    category: 'Статті',
    slug: 'articles',
    icon: '📝',
    uk: 'Статті',
    en: 'Articles',
    descriptionUk: 'Лонгріди про історію, техніку та майстрів',
    descriptionEn: 'Longreads on history, technique and masters',
  },
  {
    category: 'Галереї',
    slug: 'galleries',
    icon: '🖼️',
    uk: 'Галереї',
    en: 'Galleries',
    descriptionUk: 'Фотодобірки робіт та експозицій',
    descriptionEn: 'Photo collections of works and exhibitions',
  },
  {
    category: 'Відео',
    slug: 'video',
    icon: '🎬',
    uk: 'Відео',
    en: 'Videos',
    descriptionUk: 'Документальні та навчальні відео',
    descriptionEn: 'Documentary and educational videos',
  },
];

export function getCategoryBySlug(slug: string): MaterialCategoryMeta | undefined {
  return MATERIAL_CATEGORIES.find(c => c.slug === slug);
}

export function getCategoryMeta(category: string): MaterialCategoryMeta | undefined {
  return MATERIAL_CATEGORIES.find(c => c.category === category);
}

export function categoryLabel(category: string, locale: 'uk' | 'en'): string {
  const meta = getCategoryMeta(category);
  if (!meta) return category;
  return locale === 'en' ? meta.en : meta.uk;
}