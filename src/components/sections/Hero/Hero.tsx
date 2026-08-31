import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { PHONE_HREF } from "@/lib/constants";
import styles from "./Hero.module.css";

// TODO: this is a temporary stand-in (not a Vekaro fleet car) — replace with a real
// Fiat Tipo / Skoda Citigo photo before launch. See public/images/hero-car-placeholder.png.
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className={`${styles.hero} theme-dark`}>
      <Container className={styles.inner}>
        <div className={styles.text}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <Button href={PHONE_HREF} block>
            {t("cta")}
          </Button>
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
