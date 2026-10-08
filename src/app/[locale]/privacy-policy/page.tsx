import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PrivacyPolicyPage } from "@/components/sections/PrivacyPolicy/PrivacyPolicyPage";
import { generateServicePageMetadata } from "@/lib/servicePageMetadata";
import type { Locale } from "@/i18n/routing";

const PATH = "/privacy-policy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "privacyPage" });
  return generateServicePageMetadata(locale, PATH, t("metadata.title"), t("metadata.description"));
}

export default async function PrivacyPolicyRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <PrivacyPolicyPage locale={locale as Locale} />;
}
