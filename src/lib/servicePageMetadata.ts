import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export async function generateServicePageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
): Promise<Metadata> {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`]));

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
  };
}
