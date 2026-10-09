import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container/Container";
import { BookMenu } from "@/components/layout/Header/BookMenu";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/StructuredData/BreadcrumbJsonLd";
import { Fleet } from "@/components/sections/Fleet/Fleet";
import { Faq } from "@/components/sections/Contact/Faq";
import { ServiceInfoCards, type ServiceInfoCardItem } from "./ServiceInfoCards";
import { ServiceSteps, type ServiceStep } from "./ServiceSteps";
import type { Locale } from "@/i18n/routing";
import styles from "./ShortTermRentalPage.module.css";

const PATH = "/services/short-term";

type FaqItem = { question: string; answer: string };

export async function ShortTermRentalPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "shortTermPage" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const definitionParagraphs = t.raw("seo.definition.text") as string[];
  const whenToRentItems = t.raw("seo.whenToRent.items") as ServiceInfoCardItem[];
  const whyVekaroItems = t.raw("seo.whyVekaro.items") as ServiceInfoCardItem[];
  const howItWorksSteps = t.raw("seo.howItWorks.steps") as ServiceStep[];
  // Shared FAQ (same on every page) followed by short-term-specific questions.
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
          <Fleet headingLevel={2} />
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
              { title: t("seo.whenToRent.title"), items: whenToRentItems },
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
