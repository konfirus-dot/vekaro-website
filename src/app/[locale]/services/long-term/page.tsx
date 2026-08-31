import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LongTermRentalPage } from "@/components/sections/ServiceDetail/LongTermRentalPage";
import { generateServicePageMetadata } from "@/lib/servicePageMetadata";
import type { Locale } from "@/i18n/routing";

const PATH = "/services/long-term";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "longTermPage" });
  return generateServicePageMetadata(locale, PATH, t("hero.title"), t("hero.description"));
}

export default async function LongTermServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <LongTermRentalPage locale={locale as Locale} />;
}
