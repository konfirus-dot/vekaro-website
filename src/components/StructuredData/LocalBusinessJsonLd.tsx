import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import {
  PHONE_DISPLAY,
  WHATSAPP_HREF,
  WORKING_HOURS_OPENS,
  WORKING_HOURS_CLOSES,
  CITY,
  COUNTRY_CODE,
  CURRENCY,
  PRICE_FROM,
  SITE_URL,
} from "@/lib/constants";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export async function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  // Schema.org's AutoRental type is a LocalBusiness subtype (via AutomotiveBusiness)
  // dedicated to car rental agencies — more specific than the generic LocalBusiness.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Vekaro",
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    telephone: PHONE_DISPLAY,
    // TODO: confirm exact opening days with the client — currently assumes every day
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS_OF_WEEK,
      opens: WORKING_HOURS_OPENS,
      closes: WORKING_HOURS_CLOSES,
    },
    priceRange: `${PRICE_FROM}+`,
    currenciesAccepted: CURRENCY,
    areaServed: {
      "@type": "City",
      name: CITY,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressCountry: COUNTRY_CODE,
    },
    sameAs: [WHATSAPP_HREF],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
