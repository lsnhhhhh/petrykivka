// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://petrykivka.org',
  integrations: [
    mdx(),
    sitemap({
      // Виключаємо тег-сторінки і пошук — вони не мають цінності для пошукачів
      filter: (page) =>
        !page.includes('/tags/') &&
        !page.includes('/search') &&
        !page.includes('/admin'),
      // Атрибути i18n — щоб Google розумів зв'язок між UK і EN версіями
      i18n: {
        defaultLocale: 'uk',
        locales: {
          uk: 'uk-UA',
          en: 'en-US',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});