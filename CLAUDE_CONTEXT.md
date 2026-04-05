# Контекст проєкту для Claude

## Проєкт
Сайт про петриківський розпис — інформаційно-освітній, українська мова.
Репозиторій: github.com/lsnhhhhh/petrykivka

## Технології
- Astro 6 (статичний сайт)
- Netlify (автодеплой з GitHub)
- Decap CMS з Netlify Identity (/admin/)
- Пошук: Pagefind
- Шрифт: Fixel (public/fonts/)
- Галерея: GLightbox

## Важливі технічні деталі Astro 6
- Конфіг: src/content.config.ts (НЕ всередині content/)
- Колекції через glob() loader
- Роутинг: master.id (не master.slug)
- Рендеринг: render(master) з astro:content
- Динамічні роути: [id].astro (не [slug].astro)
- Scoped CSS не працює з медіа-запитами — використовувати is:global

## Структура контенту
- src/content/masters/ — 48 файлів майстрів
- src/content/books/ — 28 файлів книг
- src/content/centers/ — осередки
- src/content/blog/ — блог
- src/content/materials/ — матеріали

## Колекції (content.config.ts)
masters: name, category, photo, born, died, period, center, school, teachers, influenced, technique, tags, gallery, galleryGroups
books: title, author, year, publisher, language, category, cover, masters, externalUrl, pdfUrl
centers: name, category, location, founded, photo, masters, website, address
materials: title, description, category, cover, videoUrl, pubDate, masters, tags, images

## Категорії майстрів
- Перше покоління
- Друге покоління
- Третє покоління
- Четверте покоління
- Пяте покоління
- Самоучки
- Дослідники петриківського розпису

## Категорії книг
- Альбоми
- Альбоми про майстрів
- Мистецтвознавчі дослідження
- Оздоблені розписом
- Наукові статті
- Інше

## Категорії осередків
- Школи
- Музеї
- Приватні колекції
- Організації та установи

## Категорії матеріалів
- Галереї
- Статті
- Майстер-класи
- Відео

## Меню
Майстри → Осередки → Книги → Матеріали → Блог → Про проект → 🔍

## Публікація
git add . && git commit -m "опис" && git push
Netlify автоматично оновлює сайт (2-3 хвилини)

## Режим роботи з Claude
- Описую що хочу змінити
- Claude генерує готовий код
- Вставляю через VS Code (⌘+A, вставляю новий код)
- Великі файли діляться на частину 1 (між ---) і частину 2 (HTML)
- Після змін: git add . && git commit -m "опис" && git push

## Підводні камені
- Файли через термінал не підтримують кирилицю в довгих командах — по одному
- Після змін content.config.ts: Ctrl+C && rm -rf .astro && npm run dev
- Шляхи до зображень у .md: ../../assets/masters/imya/photo.jpg
- Зображення з public/ — прямий шлях: /images/foto.jpg
- Тег <a часто зникає при копіюванні — додавати вручну
- allMasters не можна оголошувати двічі в одному файлі

## Шаблони

### Майстер (src/content/masters/imya-prizvische.md)
---
name: 'Імʼя Прізвище'
category: 'Перше покоління'
born: '1884'
died: '1976'
period: 'Перша половина XX ст.'
center: 'Петриківка'
school:
  - 'Петриківська школа декоративного малювання'
teachers:
  - 'Імʼя вчителя'
influenced:
  - 'Імʼя учня'
photo: '../../assets/masters/imya-prizvische/photo.jpg'
galleryGroups:
  - title: 'Твори'
    items:
      - image: '../../assets/masters/imya-prizvische/work-1.jpg'
        caption: 'Назва роботи, рік'
---
## Біографія
## Творчість
## Визнання

### Книга (src/content/books/nazva.md)
---
title: 'Назва'
author: 'Автор'
year: '1973'
publisher: 'Видавництво, Місто'
language: 'українська'
category: 'Альбоми про майстрів'
masters:
  - 'Імʼя Майстра'
cover: '../../assets/books/cover.jpg'
externalUrl: 'https://...'
pdfUrl: 'https://...'
---

### Осередок (src/content/centers/nazva.md)
---
name: 'Назва'
category: 'Школи'
location: 'Місто, Область'
founded: '1936'
address: 'вул. Назва, 1'
website: 'https://...'
photo: '../../assets/centers/nazva/photo.jpg'
masters:
  - 'Імʼя Майстра'
---

### Матеріал (src/content/materials/nazva.md)
---
title: 'Назва'
description: 'Опис'
category: 'Галереї'
pubDate: '2026-01-15'
masters:
  - 'Імʼя Майстра'
---
EOF