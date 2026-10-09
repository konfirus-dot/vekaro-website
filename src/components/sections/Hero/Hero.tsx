import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { BookMenu } from "@/components/layout/Header/BookMenu";
import styles from "./Hero.module.css";

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
          {/* The car and its ground shadow animate in together (see .car). The
              box has a fixed 2:1 aspect ratio matching the photo, so nothing
              shifts while the image loads. data-hero-entrance lets the
              slogan banner below wait for this animation (SloganStamp). */}
          <div className={styles.car} data-hero-entrance>
            <div className={styles.groundShadow} aria-hidden="true" />
            <Image
              src="/images/hero-car-fiat-tipo.png"
              alt={t("title")}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={styles.image}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
