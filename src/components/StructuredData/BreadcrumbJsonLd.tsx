import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

export async function BreadcrumbJsonLd({
  locale,
  path,
  title,
}: {
  locale: Locale;
  path: string;
  title: string;
}) {
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tNav("home"),
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${SITE_URL}/${locale}${path}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
