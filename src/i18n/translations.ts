export const translations = {
  uk: {
    'nav.masters': 'Майстри',
    'nav.centers': 'Осередки',
    'nav.books': 'Книги',
    'nav.materials': 'Матеріали',
    'nav.blog': 'Блог',
    'nav.about': 'Про проект',
    'nav.search': '🔍',
    'site.title': 'Петриківський розпис',
    'site.description': 'Енциклопедія петриківського розпису',
    'home.sections': 'Розділи сайту',
    'masters.generation': 'Покоління',
    'masters.born': 'Народилась',
    'masters.died': 'Померла',
    'masters.teachers': 'Вчителі',
    'masters.students': 'Учні',
    'masters.awards': 'Нагороди',
    'footer.copyright': '© Петриківський розпис',
    'lang.switch': 'English',
    'nav.gallery': 'Галерея',
    'gallery.title': 'Галерея робіт',
    'gallery.subtitle': 'Колекція робіт майстрів петриківського розпису',
    'gallery.all': 'Всі',
    'gallery.master': 'Майстер',
    'gallery.decade': 'Десятиліття',
    'gallery.subject': 'Сюжет',
    'gallery.loadMore': 'Завантажити ще',
    'gallery.materials': 'Матеріали',
    'gallery.dimensions': 'Розмір',
    'gallery.location': 'Де зберігається',
    'gallery.elements': 'Основні елементи',
    'gallery.noResults': 'Робіт за обраними фільтрами не знайдено',
    'gallery.backToGallery': '← Всі роботи',
  },
  en: {
    'nav.masters': 'Masters',
    'nav.centers': 'Centers',
    'nav.books': 'Books',
    'nav.materials': 'Materials',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.search': '🔍',
    'site.title': 'Petrykivka Painting',
    'site.description': 'Encyclopedia of Petrykivka decorative painting',
    'home.sections': 'Site Sections',
    'masters.generation': 'Generation',
    'masters.born': 'Born',
    'masters.died': 'Died',
    'masters.teachers': 'Teachers',
    'masters.students': 'Students',
    'masters.awards': 'Awards',
    'footer.copyright': '© Petrykivka Painting',
    'lang.switch': 'Українська',
    'nav.gallery': 'Gallery',
    'gallery.title': 'Gallery of Works',
    'gallery.subtitle': 'Collection of works by Petrykivka painting masters',
    'gallery.all': 'All',
    'gallery.master': 'Master',
    'gallery.decade': 'Decade',
    'gallery.subject': 'Subject',
    'gallery.loadMore': 'Load more',
    'gallery.materials': 'Materials',
    'gallery.dimensions': 'Dimensions',
    'gallery.location': 'Collection',
    'gallery.elements': 'Key elements',
    'gallery.noResults': 'No works found for selected filters',
    'gallery.backToGallery': '← All works',
  },
} as const;

export type Locale = keyof typeof translations;

export function t(lang: Locale, key: keyof typeof translations['uk']): string {
  return translations[lang][key] ?? translations['uk'][key] ?? key;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'uk';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Видаляємо можливий /en/ префікс
  const cleanPath = path.replace(/^\/en\//, '/').replace(/^\/$/, '/');
  if (locale === 'en') return `/en${cleanPath === '/' ? '' : cleanPath}`;
  return cleanPath;
}