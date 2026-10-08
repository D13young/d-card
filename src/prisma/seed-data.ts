import { PrismaClient } from '@prisma/client';

interface SeedSkill {
  name: string;
  category: string;
  sortOrder: number;
}

interface SeedAchievement {
  text: string;
  sortOrder: number;
}

interface SeedExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  stack: string;
  sortOrder: number;
  achievements: SeedAchievement[];
}

interface SeedProject {
  name: string;
  url: string;
  repositoryUrl: string | null;
  description: string;
  stack: string;
  sortOrder: number;
}

const PROFILE_DATA = {
  name: 'Косиненко Сергей Александрович',
  title: 'Middle Fullstack Developer',
  description:
    'Fullstack-разработчик. Основной стек — C# / ASP.NET Core на бэкенде и React / Next.js + TypeScript на фронтенде. Дополнительно использую Node.js / Express для API-прослоек и BFF, Python — для интеграций и скриптов, PHP / Laravel — при работе с легаси. Уверенно работаю с хранением данных: реляционные БД — PostgreSQL и MS SQL Server (проектирование схем, оптимизация запросов, транзакции и миграции), NoSQL — MongoDB и Redis (документные модели, кеширование, высоконагруженные сценарии). Хранилище подбираю под задачу, а не по привычке. Пишу читаемый и тестируемый код, покрываю тестами критичные сценарии, привык к code review, CI/CD и работе по definition of done. Понимаю REST и GraphQL, принципы SOLID и DDD. Погружаюсь в предметную область и предлагаю решения, а не просто закрываю тикеты.',
  email: 'coolprints@mail.ru',
  githubUrl: 'https://github.com/D13young',
  linkedinUrl: null,
  websiteUrl: 'https://d13young.github.io/my-resume/',
  location: 'Барнаул, Россия',
};

const SKILLS: SeedSkill[] = [
  { name: 'React / Next.js', category: 'Frontend', sortOrder: 0 },
  { name: 'JavaScript / TypeScript', category: 'Frontend', sortOrder: 1 },
  { name: 'Vue.js', category: 'Frontend', sortOrder: 2 },
  { name: 'Node.js / Express', category: 'Backend', sortOrder: 0 },
  { name: 'Python', category: 'Backend', sortOrder: 1 },
  { name: 'Java', category: 'Backend', sortOrder: 2 },
  { name: 'C# / ASP.NET Core', category: 'Backend', sortOrder: 3 },
  { name: 'PHP / Laravel', category: 'Backend', sortOrder: 4 },
  { name: 'PostgreSQL / MS SQL Server', category: 'DB & DevOps', sortOrder: 0 },
  { name: 'MongoDB / Redis', category: 'DB & DevOps', sortOrder: 1 },
  { name: 'Docker / Docker Compose', category: 'DB & DevOps', sortOrder: 2 },
  { name: 'Git / GitLab CI/CD', category: 'DB & DevOps', sortOrder: 3 },
  { name: 'Figma', category: 'Инструменты', sortOrder: 0 },
  { name: 'Webpack', category: 'Инструменты', sortOrder: 1 },
  { name: 'Vite', category: 'Инструменты', sortOrder: 2 },
  { name: 'Nginx', category: 'Инструменты', sortOrder: 3 },
  { name: 'Linux', category: 'Инструменты', sortOrder: 4 },
  { name: 'Jest', category: 'Инструменты', sortOrder: 5 },
  { name: 'Русский — родной', category: 'Языки', sortOrder: 0 },
  { name: 'English B1 — Intermediate', category: 'Языки', sortOrder: 1 },
];

const EXPERIENCES: SeedExperience[] = [
  {
    company: 'Сеть магазинов «Корея — Центр», Барнаул',
    position: 'Middle Fullstack Developer',
    startDate: new Date('2017-01-01'),
    endDate: null,
    description: null,
    stack:
      'C# / ASP.NET Core, MS SQL Server, EF Core, React 18, Next.js, TypeScript, Node.js, Express, GitLab CI',
    sortOrder: 0,
    achievements: [
      {
        text: 'Участвую в разработке корпоративной системы документооборота на .NET 8 + React (Next.js). Работаю в команде из 8 человек, код-ревью, спринты по 2 недели.',
        sortOrder: 0,
      },
      {
        text: 'Миграция монолита: вместе с командой распил крупного монолита на модули (C# / ASP.NET Core + чистая архитектура) — релизы фич ускорились с 3 недель до 1 недели, конфликты при мерже сократились.',
        sortOrder: 1,
      },
      {
        text: 'Новый BFF-слой: спроектировал и реализовал API на Node.js + Express поверх основных сервисов — фронтенд получил удобное API и перестал зависеть от внутренних схем бэкенда.',
        sortOrder: 2,
      },
      {
        text: 'Снижение технического долга: перевёл ключевые разделы фронта с JavaScript на TypeScript, внедрил strict-режим — количество runtime-ошибок в этих модулях упало примерно на 40%.',
        sortOrder: 3,
      },
      {
        text: 'Тестирование: покрыл критичные бизнес-сценарии (расчёт налогов, согласования) модульными тестами на xUnit + Moq — покрытие основного API-слоя доведено до ~75%.',
        sortOrder: 4,
      },
    ],
  },
  {
    company: 'Магазин «Прайд — Авто»',
    position: 'Middle Frontend / Backend Developer',
    startDate: new Date('2014-01-01'),
    endDate: new Date('2017-01-01'),
    description:
      'Разработка заказных веб-приложений для малого и среднего бизнеса. Работа с заказчиками напрямую, от ТЗ до продакшена.',
    stack:
      'PHP / Laravel, C# / ASP.NET Core, React, Next.js, Python, PostgreSQL, MySQL, Docker',
    sortOrder: 1,
    achievements: [
      {
        text: 'B2B-портал: спроектировал и разработал клиентскую часть на Next.js + React Query с SSR для SEO, серверную часть на Laravel (PHP) — онлайн-каталог из 15 000+ позиций, личные кабинеты для оптовых клиентов.',
        sortOrder: 0,
      },
      {
        text: 'Админка для логистики: fullstack на C# ASP.NET Core Web API + React + Ant Design — диспетчеризация курьеров, трекинг заказов, экспорт в Excel.',
        sortOrder: 1,
      },
      {
        text: 'Интеграции на Python: написал небольшие скрипты для парсинга прайсов поставщиков и конвертации данных из 1С в JSON-формат основного API — сэкономили компании ~5 часов ручной работы в неделю.',
        sortOrder: 2,
      },
      {
        text: 'Производительность: внедрил ленивую загрузку тяжёлых компонентов и кеширование через React Query — LCP ключевых страниц улучшился с 3.2с до 1.4с.',
        sortOrder: 3,
      },
    ],
  },
  {
    company: 'ООО «Европринт», Барнаул',
    position: 'Junior → Middle Web Developer',
    startDate: new Date('2013-01-01'),
    endDate: new Date('2014-01-01'),
    description: null,
    stack: 'PHP, Laravel, JavaScript, jQuery, MySQL, HTML/CSS, Bootstrap',
    sortOrder: 2,
    achievements: [
      {
        text: 'Разрабатывал сайты и лендинги на PHP / Laravel с Blade-шаблонами и кастомными админками.',
        sortOrder: 0,
      },
      {
        text: 'Вёрстка и интеграция с бэкендом: адаптивность, кроссбраузерность, базовые SEO-задачи.',
        sortOrder: 1,
      },
      {
        text: 'За 8 месяцев дорос от вёрстки макетов до полноценных задач по разработке CRUD-модулей и API.',
        sortOrder: 2,
      },
    ],
  },
];

const PROJECTS: SeedProject[] = [
  {
    name: 'Flipper Asset Studio',
    url: 'https://github.com/D13young/flipper-asset-studio',
    repositoryUrl: null,
    description:
      "Кроссплатформенное приложение для создания, редактирования и валидации asset pack'ов (наборов графики) для Flipper Zero с прошивкой Momentum Firmware.",
    stack: 'Python, PyQt',
    sortOrder: 0,
  },
  {
    name: 'BrandStore',
    url: 'https://github.com/D13young/brandstore',
    repositoryUrl: null,
    description: 'Интернет-магазин одежды (MVP) на PHP / Laravel.',
    stack: 'PHP, Laravel, Laravel Sanctum',
    sortOrder: 1,
  },
  {
    name: 'SocialNetworkApp',
    url: 'https://github.com/D13young/social-network-app',
    repositoryUrl: null,
    description:
      'Социальная сеть с поддержкой различных ролей пользователей, постов и сообществ.',
    stack: 'C#, ASP.NET Core',
    sortOrder: 2,
  },
  {
    name: 'Tasker',
    url: 'https://github.com/D13young/tasker',
    repositoryUrl: null,
    description: 'Планировщик задач на Spring Boot.',
    stack: 'Java, Spring Boot',
    sortOrder: 3,
  },
];

export async function seedIfEmpty(prisma: PrismaClient): Promise<boolean> {
  const existing = await prisma.profile.count();
  if (existing > 0) {
    return false;
  }
  await prisma.profile.create({
    data: {
      ...PROFILE_DATA,
      skills: { create: SKILLS },
      experience: {
        create: EXPERIENCES.map((experience) => ({
          company: experience.company,
          position: experience.position,
          startDate: experience.startDate,
          endDate: experience.endDate,
          description: experience.description,
          stack: experience.stack,
          sortOrder: experience.sortOrder,
          achievements: { create: experience.achievements },
        })),
      },
      projects: { create: PROJECTS },
    },
  });
  return true;
}

