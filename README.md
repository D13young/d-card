# Digital Card — цифровая визитка

Backend-приложение, презентующее специалиста: профиль, навыки, опыт работы и проекты — через GraphQL API с Apollo Sandbox.

## Стек

| Слой | Технологии |
|---|---|
| Язык | TypeScript (strict) |
| Runtime | Node.js 24 |
| Фреймворк | NestJS 12 |
| API | GraphQL, Apollo Server 4, Apollo Sandbox |
| ORM | Prisma 6 |
| БД | SQLite (файл создаётся и заполняется автоматически) |
| Контейнеризация | Docker, Docker Compose |
| Контроль версий | Git |

## Быстрый старт

### Локально

```bash
git clone <ссылка-на-репозиторий>
cd digital-card
npm ci
cp .env.example .env
npm start
```

При старте приложение самостоятельно применяет миграции и заполняет БД данными визитки — дополнительные команды не нужны.

Apollo Sandbox: **http://localhost:3000/graphql**

### Docker

```bash
docker compose up --build
```

Файл БД сохраняется в `./data` (Docker volume), поэтому данные переживают пересоздание контейнера.

## npm-скрипты

| Команда | Назначение |
|---|---|
| `npm run start:dev` | дев-режим с горячей перезагрузкой |
| `npm start` | сборка и запуск |
| `npm run start:prod` | запуск из `dist/` |
| `npm run build` | сборка в `dist/` |
| `npm test` | e2e-тесты (`node:test`, реальный запрос к приложению) |
| `npm run db:seed` | заполнение БД (идемпотентно) |
| `npm run db:reset` | пересоздание БД + заполнение |

## GraphQL API

Запросы:

- `profile: Profile!` — профиль со связанными данными (вложенные `skills`, `experience` → `achievements`, `projects`)
- `skills(filter: SkillFilterArgs): [Skill!]!` — навыки с фильтром по категории
- `health: String!` — проверка доступности сервиса (для мониторинга/деплоя)

Пример запроса:

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
      duration
      achievements {
        text
      }
    }
    projects {
      name
      url
    }
  }
}
```

Полная схема API генерируется в `src/schema.gql`. Типы: `Profile`, `Skill`, `Experience` (включая вычисляемое поле `duration` — стаж с русскими склонениями), `Achievement`, `Project`.

## Структура проекта

```
digital-card/
├── src/
│   ├── main.ts                          # точка входа (PORT, CORS)
│   ├── app.module.ts                    # корневой модуль
│   ├── prisma/
│   │   ├── prisma.module.ts             # глобальный модуль
│   │   ├── prisma.service.ts            # обёртка над PrismaClient
│   │   ├── database-initializer.service.ts  # миграции + seed при старте
│   │   └── seed-data.ts                 # данные визитки
│   ├── profile/                         # модуль профиля
│   │   ├── profile.module.ts
│   │   ├── profile.resolver.ts          # GraphQL-резолверы
│   │   ├── experience.resolver.ts       # @ResolveField duration
│   │   ├── profile.service.ts           # бизнес-логика
│   │   ├── dto/                         # контракты уровня сервиса, @Args
│   │   └── entities/                    # GraphQL-схема (class → type)
│   ├── health/                          # health-запрос
│   └── common/utils/date.util.ts        # расчёт длительности
├── prisma/
│   ├── schema.prisma
│   ├── migrations/                      # история изменений БД
│   └── seed.ts                          # точка входа seed-скрипта
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── package.json
```

## Архитектура

- **Слои**: `Resolver` (GraphQL-транспорт) → `Service` (бизнес-логика: выборка, сортировки, фильтры) → `PrismaService` (доступ к данным).
- **Вложенные данные** загружаются одной инструкцией Prisma `include` — без N+1-запросов.
- **Инициализация БД**: при старте `prisma migrate deploy` (применяются закоммиченные миграции) → идемпотентный seed, если таблицы пусты.
- **DTO и сущности разделены**: `entities/*` реализуют интерфейсы из `dto/*` — компилятор гарантирует согласованность API и данных.
- **Вычисляемые поля** (`duration`) резолвятся в GraphQL-слое через `@ResolveField`, не хранятся в БД.

## Данные

Содержимое визитки (профиль, навыки, опыт, проекты) — в `src/prisma/seed-data.ts`. Меняете данные там → `npm run db:reset` → обновление в БД.

## Автор

Косиненко Сергей — [GitHub](https://github.com/D13young) · [Сайт-резюме](https://d13young.github.io/my-resume/)
