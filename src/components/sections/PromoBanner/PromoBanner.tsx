import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { PHONE_HREF } from "@/lib/constants";
import styles from "./PromoBanner.module.css";

type PromoBannerProps = {
  // TODO: not wired up yet — pass a short string (e.g. "-20%") once a real
  // discount/promo campaign exists and it will render as a badge over the photo.
  badge?: string;
};

// TODO: reuses the Hero-style placeholder photo — replace with a real
// Vekaro fleet photo before launch. See public/images/showcase-car-placeholder.png.
export function PromoBanner({ badge }: PromoBannerProps) {
  const t = useTranslations("promo");

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.text}>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.subtitle}>{t("subtitle")}</p>
            <Button href={PHONE_HREF}>{t("cta")}</Button>
          </div>

          <div className={styles.imageWrap}>
            {badge && <span className={styles.badge}>{badge}</span>}
            <div className={styles.glow} aria-hidden="true" />
            <Image
              src="/images/showcase-car-placeholder.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={styles.image}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
