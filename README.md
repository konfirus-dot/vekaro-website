# Vekaro

Інформаційний сайт-візитка компанії з оренди авто у Варшаві. Next.js + TypeScript,
без онлайн-бронювання — мета сторінки: інформація + контакти (дзвінок/месенджер).

Повний бізнес- і технічний контекст — у [PROJECT.md](./PROJECT.md).

## Вимоги

- Node.js 20 LTS або новіше
- npm 10+

## Швидкий старт

```bash
npm install
cp .env.example .env.local   # за потреби заповнити реальними значеннями
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000) — редіректить на `/pl` (мова за замовчуванням).

## Скрипти

| Команда           | Що робить                                   |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Локальний dev-сервер з hot reload            |
| `npm run build`    | Продакшн-збірка                              |
| `npm run start`    | Запуск зібраного продакшн-білда              |
| `npm run lint`     | ESLint                                       |

## Мови

Сайт доступний у трьох мовних версіях: `/pl` (за замовчуванням), `/en`, `/uk`.

- Конфігурація локалей — `src/i18n/routing.ts`
- Тексти — `messages/pl.json`, `messages/en.json`, `messages/uk.json`
- Реалізація — [next-intl](https://next-intl.dev)

## Структура проєкту

```
src/
├── app/
│   ├── [locale]/         # локалізовані сторінки (layout, page, globals.css)
│   ├── sitemap.ts        # /sitemap.xml
│   └── robots.ts         # /robots.txt
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, SloganBanner, Advantages, RentalTypes, AboutFleet, Contact
│   ├── ui/                # Container, Button, CookieBanner
│   └── Analytics/         # заглушка під GA4 / Consent Mode v2
├── i18n/                  # routing, navigation, request config (next-intl)
├── lib/                   # константи (телефон, месенджери, SITE_URL тощо)
└── proxy.ts                # маршрутизація локалей (Next.js 16 middleware)
messages/                   # переклади pl/en/uk
```

## Деплой

Плановий хостинг — [SEOHOST.pl](https://seohost.pl), тариф SSD NVMe SH3 (Node.js через DirectAdmin).
Деталі деплою ще не налаштовані — буде додано окремим кроком.

## Статус проєкту

Поточний прогрес і TODO-список — у [PROJECT.md](./PROJECT.md#статус-проєкту).
