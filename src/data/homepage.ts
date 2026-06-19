
export type Locale = 'uk' | 'en';
export type LocalizedText = { uk: string; en: string };

export interface TimelineEvent {
  year: string;            // string бо буває "1830-ті" або "1970-ті"
  yearSort: number;        // числове значення для сортування
  event: LocalizedText;
  highlight?: boolean;     // виділяти особливо важливі дати
}

export interface NavCard {
  key: 'masters' | 'artworks' | 'books' | 'materials';
  title: LocalizedText;
  description: LocalizedText;
  hrefUk: string;
  hrefEn: string;
}

// ============================================================
// HERO
// ============================================================

export const hero = {
  // image тепер імпортується в самому Hero.astro компоненті
  imageAlt: {
    uk: 'Петриківський розпис — фрагмент роботи з колекції Дніпропетровського художнього музею',
    en: 'Petrykivka painting — fragment from the Dnipropetrovsk Art Museum collection',
  } as LocalizedText,
  title: {
    uk: 'Досліджуйте світ петриківського розпису',
    en: 'Explore the world of Petrykivka painting',
  } as LocalizedText,
  subtitle: {
    uk: 'Колекція творів, біографії майстрів, книги та історичні матеріали',
    en: 'A collection of artworks, biographies of masters, books and historical materials',
  } as LocalizedText,
};

export const heroNavCards: NavCard[] = [
  {
    key: 'masters',
    title: { uk: 'Майстри', en: 'Masters' },
    description: { uk: 'Біографії та творчий шлях', en: 'Biographies and creative paths' },
    hrefUk: '/masters',
    hrefEn: '/en/masters',
  },
  {
    key: 'artworks',
    title: { uk: 'Твори', en: 'Artworks' },
    description: { uk: 'Галерея робіт з музейних колекцій', en: 'Gallery from museum collections' },
    hrefUk: '/gallery',
    hrefEn: '/en/gallery',
  },
  {
    key: 'books',
    title: { uk: 'Книги', en: 'Books' },
    description: { uk: 'Видання про петриківський розпис', en: 'Publications on Petrykivka painting' },
    hrefUk: '/books',
    hrefEn: '/en/books',
  },
  {
    key: 'materials',
    title: { uk: 'Матеріали та осередки', en: 'Materials & centers' },
    description: { uk: 'Статті, школи, музеї', en: 'Articles, schools, museums' },
    hrefUk: '/materials',
    hrefEn: '/en/materials',
  },
];

// ============================================================
// SEO-ТЕКСТ "ЩО ТАКЕ ПЕТРИКІВСЬКИЙ РОЗПИС"
// ============================================================

export const aboutText = {
  uk: `Петриківський розпис — українське декоративно-орнаментальне народне мистецтво, що сформувалося у XIX столітті в селі Петриківка на Дніпропетровщині. Це розпис рослинного характеру: квіти, ягоди, листя, птахи — виконані безпосередньо пензлем, без попереднього ескізу, у вільній імпровізаційній манері. У 2013 році петриківський розпис було внесено до Репрезентативного списку нематеріальної культурної спадщини людства ЮНЕСКО.`,
  en: `Petrykivka painting is a Ukrainian decorative and ornamental folk art that emerged in the 19th century in the village of Petrykivka in the Dnipropetrovsk region. It is characterized by floral motifs — flowers, berries, leaves, and birds — executed directly with a brush, without a preliminary sketch, in a free improvisational manner. In 2013, Petrykivka painting was inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.`,
} as LocalizedText;

export const aboutLink = {
  uk: { text: 'Цікаві факти про розпис', href: '/facts' },
  en: { text: 'Interesting facts about painting', href: '/en/facts' },
};

// ============================================================
// ПОЧНІТЬ ДОСЛІДЖЕННЯ — 3+3+3 slug-и
// ============================================================
// TODO: переглянь і скоригуй під свою редакторську логіку.
// Slug — назва файлу без префіксу uk/ і без .md

export const startExploring = {
  masters: {
    title: { uk: 'Якщо вас цікавлять майстри', en: 'If you are interested in masters' },
    slugs: ['tetyana-pata', 'fedir-panko', 'andriy-pikush'],
  },
  history: {
    title: { uk: 'Якщо вас цікавить історія', en: 'If you are interested in history' },
    slugs: [
      'petrykivka-klasychna-tradytsiya',
      'shestakova',
      'yaryna-pylypenko-galereya',
    ],
  },
  workshops: {
    title: { uk: 'Якщо хочете навчитися', en: 'If you want to learn' },
    slugs: ['petrykivka-osnovy-riven-1'],
  },
};

// ============================================================
// КЛЮЧОВІ ПОСТАТІ — 6 майстрів з коротким описом значення
// ============================================================
// TODO: відкоригуй описи (role) під свій тон. Це короткий рядок
// що пояснює "чому ця постать ключова" — 3-6 слів.

export interface KeyFigure {
  slug: string;
  role: LocalizedText;
}

export const keyFigures: KeyFigure[] = [
  {
    slug: 'tetyana-pata',
    role: {
      uk: 'Корифей та одна із засновниць класичного петриківського розпису',
      en: 'Corypheus and one of the founders of classical Petrykivka painting',
    },
  },
  {
    slug: 'nadiya-bilokin',
    role: {
      uk: 'Класик петриківського розпису та одна з перших самобутніх майстринь',
      en: 'A classic of Petrykivka painting and one of the first original masters',
    },
  },
  {
    slug: 'vasyl-sokolenko',
    role: {
      uk: 'Один із найважливіших майстрів-новаторів та патріархів петриківського розпису',
      en: 'One of the most important master innovators and patriarchs of Petrykivka painting',
    },
  },
  {
    slug: 'fedir-panko',
    role: {
      uk: 'Провідний класик, реформатор та педагогів петриківського розпису',
      en: 'Leading classicist, reformer and teacher of Petrykivka painting',
    },
  },
  {
    slug: 'andriy-pikush',
    role: {
      uk: 'Провідний сучасний майстер, реформатор та громадський діяч петриківського розпису',
      en: 'Leading modern master, reformer and public figure of Petrykivka painting',
    },
  },
  {
    slug: 'halyna-nazarenko',
    role: {
      uk: 'Найвідоміша, найактивніша та затребувана  сучасна майстриня петриківського розпису',
      en: 'The most famous, most active and sought-after modern master of Petrykivka painting',
    },
  },
];

// ============================================================
// ІСТОРИЧНА ХРОНОЛОГІЯ
// ============================================================

export const timeline: TimelineEvent[] = [
  {
    year: '1772',
    yearSort: 1772,
    event: {
      uk: 'Заснування села Петриківка кошовим отаманом Петром Калнишевським',
      en: 'Founding of the village of Petrykivka by Cossack Otaman Petro Kalnyshevsky',
    },
  },
  {
    year: '1913',
    yearSort: 1913,
    event: {
      uk: 'Перша наукова фіксація петриківського розпису Євгенією Берченко на замовлення Дмитра Яворницького',
      en: 'First academic documentation of Petrykivka painting by Yevheniia Berchenko, commissioned by Dmytro Yavornytsky',
    },
  },
  {
    year: '1936',
    yearSort: 1936,
    event: {
      uk: 'Відкриття Школи декоративного малювання у Петриківці',
      en: 'Opening of the Decorative Painting School in Petrykivka',
    },
  },
  {
    year: '1936',
    yearSort: 1936.5,
    event: {
      uk: 'Презентація петриківського розпису широкому загалу на виставці народного мистецтва у Києві, Москві та Ленінграді',
      en: 'Presentation of Petrykivka painting to the wider public at the folk art exhibition in Kyiv, Moscow and Leningrad',
    },
  },
  {
    year: '1958',
    yearSort: 1958,
    event: {
      uk: 'Створення фабрики художніх виробів «Дружба» — масове виробництво сувенірів з петриківським розписом',
      en: 'Establishment of the "Druzhba" art factory — mass production of souvenirs with Petrykivka painting',
    },
  },
  {
    year: '1970',
    yearSort: 1970,
    event: {
      uk: 'Відкриття експериментального центру «Петриківка» — відродження класичної традиції розпису',
      en: 'Opening of the experimental "Petrykivka" center — revival of the classical painting tradition',
    },
  },
  {
    year: '1990',
    yearSort: 1990,
    event: {
      uk: 'Становлення Центру народного мистецтва «Петриківка»',
      en: 'Formation of the "Petrykivka" Folk Art Center',
    },
  },
  {
    year: '2012',
    yearSort: 2012,
    event: {
      uk: 'Петриківський розпис внесено до культурної спадщини України',
      en: 'Petrykivka painting inscribed on the Cultural Heritage of Ukraine list',
    },
  },
  {
    year: '2013',
    yearSort: 2013,
    event: {
      uk: 'Внесення петриківського розпису до Репрезентативного списку нематеріальної культурної спадщини ЮНЕСКО',
      en: 'Inscription of Petrykivka painting on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity',
    },
  },
];

// ============================================================
// СУЧАСНІ МАЙСТРИ ДЛЯ СЕКЦІЇ "ПЕТРИКІВКА СЬОГОДНІ"
// ============================================================
// TODO: підкоригуй список — це майстри, що працюють зараз

export const modernMasters: string[] = [
  'andriy-pikush',
  'halyna-nazarenko',
  'mariya-pikush',
  'olena-skytsyuk',
  'volodymyr-hlushchenko',
];

// ============================================================
// СТАТИСТИКА — заголовки для секції
// ============================================================
// Самі цифри автоматично з getCollection() у компоненті

export const statsLabels = {
  uk: {
    masters: 'майстрів',
    artworks: 'творів',
    books: 'видань',
    materials: 'матеріалів',
    centers: 'осередків',
  },
  en: {
    masters: 'masters',
    artworks: 'artworks',
    books: 'publications',
    materials: 'materials',
    centers: 'centers',
  },
};

// ============================================================
// ЗАГОЛОВКИ СЕКЦІЙ
// ============================================================

export const sectionTitles = {
  about: { uk: 'Що таке петриківський розпис', en: 'What is Petrykivka painting' },
  stats: { uk: 'Енциклопедія в цифрах', en: 'The encyclopedia in numbers' },
  startExploring: { uk: 'Почніть дослідження', en: 'Start exploring' },
  keyFigures: { uk: 'Ключові постаті петриківського розпису', en: 'Key figures of Petrykivka painting' },
  masterpieces: { uk: 'Шедеври петриківського розпису', en: 'Masterpieces of Petrykivka painting' },
  timeline: { uk: 'Історична хронологія', en: 'Historical timeline' },
  sources: { uk: 'Джерела та книги', en: 'Sources and books' },
  today: { uk: 'Петриківка сьогодні', en: 'Petrykivka today' },
  facts: { uk: 'Цікаві факти', en: 'Did you know' },
  recent: { uk: 'Останні додані матеріали', en: 'Recently added' },
};