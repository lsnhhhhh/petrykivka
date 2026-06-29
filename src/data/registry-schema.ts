// src/data/registry-schema.ts
// Контрольовані словники + UI-рядки для Реєстру майстрів.

export type Locale = 'uk' | 'en';

// Покоління = період, з якого майстер почав активно працювати.
export const GENERATIONS: Record<string, { uk: string; en: string; period?: { uk: string; en: string } }> = {
  'first':  { uk: 'Перше покоління',    en: 'First generation',  period: { uk: 'з 1910-х', en: 'from 1910s' } },
  'second': { uk: 'Друге покоління',    en: 'Second generation', period: { uk: 'з 1940-х', en: 'from 1940s' } },
  'third':  { uk: 'Третє покоління',    en: 'Third generation',  period: { uk: 'з 1960-х', en: 'from 1960s' } },
  'fourth': { uk: 'Четверте покоління', en: 'Fourth generation', period: { uk: 'з 1980-х', en: 'from 1980s' } },
  'fifth':  { uk: "П'яте покоління",    en: 'Fifth generation',  period: { uk: 'з 2000-х', en: 'from 2000s' } },
  'unknown':{ uk: 'Без покоління',      en: 'Unspecified' },
};

// Регіон = осередок творчості (де майстер працював/працює), не місце народження.
export const REGIONS: Record<string, { uk: string; en: string }> = {
  'petrykivka': { uk: 'Петриківка',          en: 'Petrykivka' },
  'kyiv':       { uk: 'Київ',                en: 'Kyiv' },
  'ukraine':    { uk: 'Інші міста України',  en: 'Other Ukrainian cities' },
  'world':      { uk: 'У світі',             en: 'Abroad' },
};

// Стиль — короткі мітки для фільтра (значення в даних — повні рядки).
export const STYLES: Record<string, { uk: string; en: string }> = {
  'традиційний петриківський розпис': { uk: 'Традиційний', en: 'Traditional' },
  'авторська інтерпретація':          { uk: 'Авторський',  en: 'Author’s' },
};

export const STATUS: Record<'nsum' | 'honored', { uk: string; en: string }> = {
  nsum:    { uk: 'Член НСХУ',            en: 'NUAU member' },
  honored: { uk: 'Заслужений майстер',   en: 'Honored Master' },
};

export function genLabel(id: string | undefined, locale: Locale): string {
  return GENERATIONS[id ?? 'unknown']?.[locale] ?? GENERATIONS.unknown[locale];
}
export function genPeriod(id: string | undefined, locale: Locale): string {
  return GENERATIONS[id ?? 'unknown']?.period?.[locale] ?? '';
}
// Повна мітка з періодом — для фільтра і профілю
export function genLabelFull(id: string | undefined, locale: Locale): string {
  const l = genLabel(id, locale); const p = genPeriod(id, locale);
  return p ? `${l} (${p})` : l;
}
export function regionLabel(id: string | undefined, locale: Locale): string {
  return REGIONS[id ?? 'petrykivka']?.[locale] ?? REGIONS.petrykivka[locale];
}
export function styleLabel(value: string, locale: Locale): string {
  return STYLES[value]?.[locale] ?? value;
}

export function prettifyId(id: string): string {
  return id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Роки життя: живий → тільки рік народження (без позначки-крапки)
export function yearsLabel(born: string | undefined, died: string | undefined, locale: Locale) {
  const yr = (s?: string) => { const m = String(s ?? '').match(/\d{4}/); return m ? m[0] : ''; };
  if (born && died) return { text: `${yr(born)}–${yr(died)}`, alive: false };
  if (born && !died) return { text: `${STR[locale].bornPrefix} ${yr(born)}`, alive: true };
  if (!born && died) return { text: `–${yr(died)}`, alive: false };
  return { text: STR[locale].yearsUnknown, alive: false };
}

export function formatDate(iso: string | undefined, locale: Locale): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : 'uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function parseLink(s: string): { label: string; url: string | null } {
  const i = s.indexOf('|');
  if (i !== -1) return { label: s.slice(0, i).trim(), url: s.slice(i + 1).trim() };
  if (/^https?:\/\//.test(s)) return { label: s.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), url: s };
  return { label: s, url: null };
}

export const STR = {
  uk: {
    tabBios: 'Обрані біографії',
    tabRegistry: 'Реєстр майстрів',
    title: 'Реєстр майстрів',
    subtitle: 'Повний покажчик майстрів петриківського розпису. Фільтруйте за поколінням, регіоном, осередком, стилем та статусом.',
    search: 'Пошук за іменем…',
    filters: 'Фільтри',
    reset: 'Скинути все',
    fGeneration: 'Покоління',
    fRegion: 'Регіон',
    fCenter: 'Осередок',
    fStyle: 'Стиль',
    fStatus: 'Статус',
    outsideCenters: 'Поза осередками',
    results: 'майстрів',
    noResults: 'Нічого не знайдено. Спробуйте змінити фільтри.',
    viewBio: 'Детальна біографія →',
    page: 'Сторінка', of: 'з', prev: '← Назад', next: 'Далі →',
    yearsUnknown: 'роки невідомі',
    bornPrefix: 'н.',
    backToRegistry: '← До реєстру',
    birthPlace: 'Місце народження',
    currentPlace: 'Нині живе і працює',
    active: 'Роки активності',
    school: 'Школа',
    center: 'Осередок',
    teachers: 'Учителі',
    students: 'Учні',
    occupation: 'Діяльність',
    style: 'Стиль',
    exhibitions: 'Виставки',
    awards: 'Нагороди та звання',
    collections: 'Зберігається в колекціях',
    books: 'Книги',
    articles: 'Статті',
    family: 'Родина',
    links: 'Посилання',
    website: 'Сайт',
    notes: 'Примітки',
    fullBio: 'Читати повну біографію →',
    updated: 'Інформацію оновлено',
  },
  en: {
    tabBios: 'Selected biographies',
    tabRegistry: 'Registry of masters',
    title: 'Registry of masters',
    subtitle: 'A complete index of Petrykivka painting masters. Filter by generation, region, centre, style and status.',
    search: 'Search by name…',
    filters: 'Filters',
    reset: 'Reset all',
    fGeneration: 'Generation',
    fRegion: 'Region',
    fCenter: 'Centre',
    fStyle: 'Style',
    fStatus: 'Status',
    outsideCenters: 'Outside centres',
    results: 'masters',
    noResults: 'Nothing found. Try changing the filters.',
    viewBio: 'Full biography →',
    page: 'Page', of: 'of', prev: '← Prev', next: 'Next →',
    yearsUnknown: 'dates unknown',
    bornPrefix: 'b.',
    backToRegistry: '← Back to registry',
    birthPlace: 'Birthplace',
    currentPlace: 'Lives and works',
    active: 'Active years',
    school: 'School',
    center: 'Centre',
    teachers: 'Teachers',
    students: 'Students',
    occupation: 'Occupation',
    style: 'Style',
    exhibitions: 'Exhibitions',
    awards: 'Awards & titles',
    collections: 'Held in collections',
    books: 'Books',
    articles: 'Articles',
    family: 'Family',
    links: 'Links',
    website: 'Website',
    notes: 'Notes',
    fullBio: 'Read the full biography →',
    updated: 'Information updated',
  },
} as const;