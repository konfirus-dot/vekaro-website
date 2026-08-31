import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BusinessRentalPage } from "@/components/sections/ServiceDetail/BusinessRentalPage";
import { generateServicePageMetadata } from "@/lib/servicePageMetadata";
import type { Locale } from "@/i18n/routing";

const PATH = "/services/business";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "businessPage" });
  return generateServicePageMetadata(locale, PATH, t("hero.title"), t("hero.description"));
}

export default async function BusinessServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <BusinessRentalPage locale={locale as Locale} />;
}
