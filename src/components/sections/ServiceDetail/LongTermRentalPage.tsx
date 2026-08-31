import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/StructuredData/BreadcrumbJsonLd";
import { FleetCard } from "@/components/sections/Fleet/FleetCard";
import { Faq } from "@/components/sections/Contact/Faq";
import { PHONE_HREF } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";
import styles from "./LongTermRentalPage.module.css";

const PATH = "/services/long-term";

type FaqItem = { question: string; answer: string };

export async function LongTermRentalPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "longTermPage" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tFleet = await getTranslations({ locale, namespace: "fleet" });

  const whyLongTermItems = t.raw("seo.whyLongTerm.items") as string[];
  const whyVekaroItems = t.raw("seo.whyVekaro.items") as string[];
  const howItWorksSteps = t.raw("seo.howItWorks.steps") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <main>
      <BreadcrumbJsonLd locale={locale} path={PATH} title={t("hero.title")} />

      <section className={styles.hero}>
        <Container>
          <Breadcrumbs locale={locale} current={t("hero.title")} />
          <h1 className={styles.title}>{t("hero.title")}</h1>
          <p className={styles.description}>{t("hero.description")}</p>
          <Button href={PHONE_HREF}>{tHero("cta")}</Button>
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
            <p className={styles.seoText}>{t("seo.definition.text")}</p>
          </div>

          <div className={styles.pairedBlocks}>
            <div className={styles.pairedCard}>
              <h2 className={styles.seoTitle}>{t("seo.whyLongTerm.title")}</h2>
              <ul className={styles.list}>
                {whyLongTermItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.pairedCard}>
              <h2 className={styles.seoTitle}>{t("seo.whyVekaro.title")}</h2>
              <ul className={styles.list}>
                {whyVekaroItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className={styles.seoTitle}>{t("seo.howItWorks.title")}</h2>
            <ol className={styles.steps}>
              {howItWorksSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className={styles.faqSection}>
        <Container>
          <h2 className={styles.seoTitle}>{t("faq.title")}</h2>
          <Faq items={faqItems} />
        </Container>
      </section>
    </main>
  );
}
