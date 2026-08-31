import { defineRouting } from "next-intl/routing";

export const locales = ["pl", "en", "uk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
