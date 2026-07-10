// src/data/publications-schema.ts
// Словники, хелпери та UI-рядки для Реєстру публікацій.
// Патерн повністю аналогічний src/data/registry-schema.ts (Реєстр майстрів).

export type Locale = 'uk' | 'en';

// ---------- Типи видань ----------
export const TYPES = {
  book: { uk: 'Книга', en: 'Book' },
  album: { uk: 'Альбом', en: 'Album' },
  catalog: { uk: 'Каталог', en: 'Catalog' },
  postcard_set: { uk: 'Листівки', en: 'Postcards' },
  thesis_abstract: { uk: 'Автореферат', en: 'Thesis abstract' },
  article: { uk: 'Стаття', en: 'Article' },
  web: { uk: 'Веб-ресурс', en: 'Web resource' },
  archive: { uk: 'Архівне джерело', en: 'Archival source' },
  other: { uk: 'Інше', en: 'Other' },
} as const;

export type PublicationType = keyof typeof TYPES;

export function typeLabel(type: string, locale: Locale): string {
  const t = TYPES[type as PublicationType];
  return t ? t[locale] : type;
}

// Групування типів для фасету "Вид видання" (щоб не плодити занадто дрібні чекбокси)
export const TYPE_GROUPS = {
  print: { uk: 'Книги, альбоми, каталоги', en: 'Books, albums, catalogs', types: ['book', 'album', 'catalog', 'thesis_abstract', 'other'] },
  postcard_set: { uk: 'Листівки', en: 'Postcards', types: ['postcard_set'] },
  article: { uk: 'Статті', en: 'Articles', types: ['article'] },
  web: { uk: 'Веб-ресурси', en: 'Web resources', types: ['web'] },
  archive: { uk: 'Архівні джерела', en: 'Archival sources', types: ['archive'] },
} as const;

// ---------- Тема ----------
export const TOPICS = {
  general: { uk: 'Загальні питання', en: 'General topics' },
  personalia: { uk: 'Персоналії', en: 'Personalia' },
} as const;

export function topicLabel(topic: string, locale: Locale): string {
  const t = TOPICS[topic as keyof typeof TOPICS];
  return t ? t[locale] : topic;
}

// ---------- Періоди (десятиліття) ----------
export function decadeOf(year: number | string | undefined): string | null {
  if (!year) return null;
  const y = typeof year === 'string' ? parseInt(year, 10) : year;
  if (!y || Number.isNaN(y)) return null;
  return `${Math.floor(y / 10) * 10}`;
}

export function decadeLabel(decade: string, locale: Locale): string {
  return locale === 'uk' ? `${decade}-ті` : `${decade}s`;
}

// ---------- Доступність ----------
export type Availability = 'download' | 'view' | 'web' | 'none';

export function availabilityOf(rec: { download_url?: string; view_url?: string; web_url?: string }): Availability {
  if (rec.download_url) return 'download';
  if (rec.view_url) return 'view';
  if (rec.web_url) return 'web';
  return 'none';
}

export const AVAILABILITY = {
  download: { uk: 'Є файл (PDF)', en: 'File available (PDF)' },
  view: { uk: 'Є онлайн-перегляд', en: 'Available online' },
  web: { uk: 'Є посилання', en: 'Link available' },
  none: { uk: 'Лише бібліографічний опис', en: 'Bibliographic record only' },
} as const;

export function availabilityLabel(a: Availability, locale: Locale): string {
  return AVAILABILITY[a][locale];
}

// ---------- UI-рядки ----------
export const STR = {
  uk: {
    pageTitle: 'Реєстр публікацій',
    pageIntro: 'Покажчик книг, альбомів, каталогів, статей та веброресурсів про петриківський розпис.',
    searchPlaceholder: 'Пошук за автором, назвою, джерелом…',
    filterType: 'Вид видання',
    filterPeriod: 'Період',
    filterTopic: 'Тема',
    filterAvailability: 'Доступність',
    filterLanguage: 'Мова',
    noneOption: 'Усі',
    resultsCount: (n: number) => `Знайдено: ${n}`,
    noResults: 'Нічого не знайдено. Спробуйте змінити фільтри або пошуковий запит.',
    clearFilters: 'Скинути фільтри',
    sortBy: 'Сортувати',
    sortYearDesc: 'Рік (спочатку нові)',
    sortYearAsc: 'Рік (спочатку старі)',
    sortAuthor: 'Автор (А–Я)',
    sortTitle: 'Назва (А–Я)',
    download: 'Завантажити',
    view: 'Переглянути',
    webLink: 'Перейти',
    mentionedPersons: 'Згадуються',
    existingBookCta: 'Детальніше про видання →',
    backLink: '← До реєстру публікацій',
    tabBooks: 'Обрані видання',
    tabRegistry: 'Реєстр публікацій',
    page: 'Сторінка',
  },
  en: {
    pageTitle: 'Publications registry',
    pageIntro: 'An index of books, albums, catalogs, articles and web sources about Petrykivka painting.',
    searchPlaceholder: 'Search by author, title, source…',
    filterType: 'Publication type',
    filterPeriod: 'Period',
    filterTopic: 'Topic',
    filterAvailability: 'Availability',
    filterLanguage: 'Language',
    noneOption: 'All',
    resultsCount: (n: number) => `Found: ${n}`,
    noResults: 'Nothing found. Try adjusting the filters or search query.',
    clearFilters: 'Clear filters',
    sortBy: 'Sort by',
    sortYearDesc: 'Year (newest first)',
    sortYearAsc: 'Year (oldest first)',
    sortAuthor: 'Author (A–Z)',
    sortTitle: 'Title (A–Z)',
    download: 'Download',
    view: 'View',
    webLink: 'Open',
    mentionedPersons: 'Mentions',
    existingBookCta: 'More about this book →',
    backLink: '← Back to publications registry',
    tabBooks: 'Featured books',
    tabRegistry: 'Publications registry',
    page: 'Page',
  },
} as const;

export function t(locale: Locale, key: keyof typeof STR['uk']) {
  return STR[locale][key];
}