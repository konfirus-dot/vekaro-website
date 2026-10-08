import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShortTermRentalPage } from "@/components/sections/ServiceDetail/ShortTermRentalPage";
import { generateServicePageMetadata } from "@/lib/servicePageMetadata";
import type { Locale } from "@/i18n/routing";

const PATH = "/services/short-term";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "shortTermPage" });
  // SEO title/description are kept separate from the visible Hero copy.
  return generateServicePageMetadata(locale, PATH, t("metadata.title"), t("metadata.description"));
}

export default async function ShortTermServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <ShortTermRentalPage locale={locale as Locale} />;
}
