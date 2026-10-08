import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { BookMenu } from "@/components/layout/Header/BookMenu";
import styles from "./Hero.module.css";

// TODO: this is a temporary stand-in (not a Vekaro fleet car) — replace with a real
// Fiat Tipo / Skoda Citigo photo before launch. See public/images/hero-car-placeholder.png.
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className={`${styles.hero} theme-dark`}>
      <Container className={styles.inner}>
        <div className={styles.text}>
          {/* One <h1> for SEO; the second sentence is just tinted accent. */}
          <h1 className={styles.title}>
            {t("title")} <span className={styles.titleAccent}>{t("titleAccent")}</span>
          </h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <BookMenu size="large" align="left" />
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.glow} aria-hidden="true" />
          <Image
            src="/images/hero-car-placeholder.png"
            alt={t("title")}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={styles.image}
          />
        </div>
      </Container>
    </section>
  );
}
