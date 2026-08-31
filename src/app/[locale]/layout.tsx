import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Analytics } from "@/components/Analytics/Analytics";
import { LocalBusinessJsonLd } from "@/components/StructuredData/LocalBusinessJsonLd";
import { PageTransition } from "@/components/ui/PageTransition/PageTransition";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner/CookieBanner";
import { SITE_URL, IS_PREVIEW_ENV } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "metadata",
  });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  );

  const OG_LOCALES: Record<string, string> = {
    pl: "pl_PL",
    en: "en_US",
    uk: "uk_UA",
  };

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    // Mirrors robots.ts — while the site sits on a temporary/preview domain,
    // keep it out of search results at the per-page level too, not just via
    // robots.txt. See IS_PREVIEW_ENV in src/lib/constants.ts for how this
    // flips off automatically once the site is live on its final domain.
    robots: IS_PREVIEW_ENV
      ? { index: false, follow: false }
      : { index: true, follow: true },
    // The actual preview image comes from opengraph-image.tsx (file-based
    // convention — Next.js auto-generates og:image/twitter:image from it).
    // These fields fill in the rest of what link-preview crawlers look for.
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      siteName: "Vekaro",
      locale: OG_LOCALES[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LocalBusinessJsonLd locale={locale as Locale} />
        <NextIntlClientProvider>
          <PageTransition locale={locale}>
            <Header />
            {children}
            <Footer />
            <CookieBanner />
          </PageTransition>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
