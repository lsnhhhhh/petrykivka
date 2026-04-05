import type { Locale } from './translations';

/**
 * Витягує slug без locale-префікса з master.id
 * "uk/tetyana-pata" → "tetyana-pata"
 * "en/tetyana-pata" → "tetyana-pata"
 */
export function getSlugFromId(id: string): string {
  return id.replace(/^(uk|en)\//, '');
}

/**
 * Витягує locale з master.id
 * "uk/tetyana-pata" → "uk"
 */
export function getLocaleFromId(id: string): Locale {
  const match = id.match(/^(uk|en)\//);
  return (match?.[1] as Locale) ?? 'uk';
}

/**
 * Будує URL для контенту з урахуванням locale
 * ('masters', 'uk/tetyana-pata', 'uk') → '/masters/tetyana-pata'
 * ('masters', 'en/tetyana-pata', 'en') → '/en/masters/tetyana-pata'
 */
export function getContentUrl(
  collection: string,
  id: string,
  locale?: Locale
): string {
  const slug = getSlugFromId(id);
  const lang = locale ?? getLocaleFromId(id);
  if (lang === 'en') return `/en/${collection}/${slug}`;
  return `/${collection}/${slug}`;
}

/**
 * Фільтрує колекцію по locale
 */
export function filterByLocale<T extends { id: string }>(
  items: T[],
  locale: Locale
): T[] {
  return items.filter(item => item.id.startsWith(`${locale}/`));
}