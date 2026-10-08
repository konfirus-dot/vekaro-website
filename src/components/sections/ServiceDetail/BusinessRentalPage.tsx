import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container/Container";
import { BookMenu } from "@/components/layout/Header/BookMenu";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/StructuredData/BreadcrumbJsonLd";
import { FleetCard } from "@/components/sections/Fleet/FleetCard";
import { Faq } from "@/components/sections/Contact/Faq";
import { ServiceInfoCards, type ServiceInfoCardItem } from "./ServiceInfoCards";
import { ServiceSteps, type ServiceStep } from "./ServiceSteps";
import type { Locale } from "@/i18n/routing";
import styles from "./BusinessRentalPage.module.css";

const PATH = "/services/business";

type FaqItem = { question: string; answer: string };

export async function BusinessRentalPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "businessPage" });
  const tFleet = await getTranslations({ locale, namespace: "fleet" });
  // FAQ is shared by the homepage and all service pages.
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const definitionParagraphs = t.raw("seo.definition.text") as string[];
  const whoItsForItems = t.raw("seo.whoItsFor.items") as ServiceInfoCardItem[];
  const whyVekaroItems = t.raw("seo.whyVekaro.items") as ServiceInfoCardItem[];
  const howItWorksSteps = t.raw("seo.howItWorks.steps") as ServiceStep[];
  // Shared FAQ (same on every page) followed by business-specific questions.
  const faqItems = [
    ...(tFaq.raw("items") as FaqItem[]),
    ...(t.raw("extraFaq") as FaqItem[]),
  ];

  return (
    <main>
      <BreadcrumbJsonLd locale={locale} path={PATH} title={t("hero.title")} />

      <section className={styles.hero}>
        <Container>
          <Breadcrumbs locale={locale} current={t("hero.title")} />
          <h1 className={styles.title}>{t("hero.title")}</h1>
          <p className={styles.description}>{t("hero.description")}</p>
          {/* Same CTA as the homepage Hero: opens the contact options menu. */}
          <BookMenu size="large" align="left" />
        </Container>
      </section>

      <section className={styles.fleetSection}>
        <Container>
          <div className={styles.fleetGrid}>
            <FleetCard
              image="/images/hero-car-placeholder.png"
              name={tFleet("fiatTipo.name")}
              priceFrom={tFleet("fiatTipo.priceFrom")}
            />
            <FleetCard
              image="/images/hero-car-placeholder.png"
              name={tFleet("skodaCitigo.name")}
              priceFrom={tFleet("skodaCitigo.priceFrom")}
            />
          </div>
        </Container>
      </section>

      <section className={styles.seoSection}>
        <Container className={styles.seoInner}>
          <div>
            <h2 className={styles.seoTitle}>{t("seo.definition.title")}</h2>
            {definitionParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.seoText}>
                {paragraph}
              </p>
            ))}
          </div>

          <ServiceInfoCards
            cards={[
              { title: t("seo.whoItsFor.title"), items: whoItsForItems },
              { title: t("seo.whyVekaro.title"), items: whyVekaroItems },
            ]}
          />

          <div>
            <h2 className={styles.seoTitle}>{t("seo.howItWorks.title")}</h2>
            <ServiceSteps steps={howItWorksSteps} />
          </div>
        </Container>
      </section>

      <section className={styles.faqSection}>
        <Container>
          <h2 className={styles.seoTitle}>{tFaq("title")}</h2>
          <Faq items={faqItems} />
        </Container>
      </section>
    </main>
  );
}
