import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { filterByLocale } from '../i18n/content';

export async function GET(context) {
  const allPosts = await getCollection('blog');
  const posts = filterByLocale(allPosts, 'uk');
  return rss({
    title: SITE_TITLE['uk'],
    description: SITE_DESCRIPTION['uk'],
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id.replace('uk/', '')}/`,
    })),
  });
}